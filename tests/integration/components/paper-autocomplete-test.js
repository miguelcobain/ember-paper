import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { run } from '@ember/runloop';
import $ from 'jquery';

module('Integration | Component | paper autocomplete', function(hooks) {
  setupRenderingTest(hooks);

  /* test('either `onSearchTextChange` or `onSelectionChange` functions are provided provided', function(assert) {
    assert.expect(4);

    assert.throws(() => {
      this.render(hbs`
        {{#paper-autocomplete options=countries selected=selected as |opt|}}
          {{opt}}
        {{/paper-autocomplete}}
        `);
    }, 'requires at least one of the `onSelectionChange` or `onSearchTextChange` functions to be provided.');

    assert.ok(() => {
      this.render(hbs`
        {{#paper-autocomplete
            options=countries
            selected=selected
            onSelectionChange=(action (mut selected)) as |opt|}}
          {{opt}}
        {{/paper-autocomplete}}
        `);
    }, 'does not throw when on `onSelectionChange` is provided');

    assert.ok(() => {
      this.render(hbs`
        {{#paper-autocomplete
            options=countries
            searchText=searchText
            onSearchTextChange=(action (mut searchText)) as |opt|}}
          {{opt}}
        {{/paper-autocomplete}}
        `);
    }, 'does not throw when on `onSearchTextChange` is provided');

    assert.ok(() => {
      this.render(hbs`
        {{#paper-autocomplete
            options=countries
            searchText=searchText
            onSearchTextChange=(action (mut searchText))
            selected=selected
            onSelectionChange=(action (mut selected)) as |opt|}}
          {{opt}}
        {{/paper-autocomplete}}
        `);
    }, 'does not throw when both `onSearchTextChange` and `onSelectionChange` are provided');
  });*/

  test('opens on click', async function(assert) {
    assert.expect(1);
    this.set('items', ['Ember', 'Paper', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']);
    await render(hbs`{{#paper-autocomplete
      placeholder="Item"
      options=items
      searchText=searchText
      onSearchTextChange=(action (mut searchText))
      selected=selectedItem
      onSelectionChange=(action (mut selectedItem))
      as |item|
    }}
      {{item}}
    {{/paper-autocomplete}}`);

    return settled().then(() => {
      $('md-autocomplete-wrap input')[0].focus();

      return settled().then(() => {
        let selectors = $('.md-autocomplete-suggestions');
        assert.ok(selectors.length, 'opened menu');
      });
    });
  });

  test('backdrop removed if select closed', async function(assert) {
    assert.expect(2);
    this.set('items', ['Ember', 'Paper', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']);
    await render(hbs`
      <div id="other-div"></div>
      {{#paper-autocomplete
      placeholder="Item"
      options=items
      searchText=searchText
      onSearchTextChange=(action (mut searchText))
      selected=selectedItem
      onSelectionChange=(action (mut selectedItem))
      as |item|
    }}
      {{item}}
    {{/paper-autocomplete}}`);

    return settled().then(() => {
      $('md-autocomplete-wrap input')[0].focus();

      return settled().then(() => {

        let selectors = $('.md-autocomplete-suggestions');
        assert.ok(selectors.length, 'opened menu');
        let event = new window.Event('mousedown', { bubbles: true, cancelable: true, view: window });
        this.$('#other-div')[0].dispatchEvent(event);
        return settled().then(() => {
          let selector = $('.md-autocomplete-suggestions');
          assert.ok(!selector.length, 'backdrop removed');
        });
      });
    });
  });

  test('should render only enough items to fill the menu + 3', async function(assert) {
    assert.expect(2);
    this.set('items', ['Ember', 'Paper', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']);
    await render(hbs`{{#paper-autocomplete
      placeholder="Item"
      options=items
      searchText=searchText
      onSearchTextChange=(action (mut searchText))
      selected=selectedItem
      onSelectionChange=(action (mut selectedItem))
      as |item|
    }}
      {{item}}
    {{/paper-autocomplete}}`);

    return settled().then(() => {
      $('md-autocomplete-wrap input')[0].focus();

      return settled().then(() => {
        let selectors = $('.md-autocomplete-suggestions');
        assert.ok(selectors.length, 'opened menu');
        assert.equal(selectors.children().length, 8, 'only rendered 8 items');
      });
    });
  });

  test('should filter list by search term', async function(assert) {
    assert.expect(3);
    this.set('items', ['Ember', 'Paper', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']);
    await render(hbs`{{#paper-autocomplete
      placeholder="Item"
      options=items
      searchText=searchText
      onSearchTextChange=(action (mut searchText))
      selected=selectedItem
      onSelectionChange=(action (mut selectedItem))
      as |item|
    }}
      {{item}}
    {{/paper-autocomplete}}`);
    return settled().then(() => {
      $('md-autocomplete-wrap input')[0].focus();

      return settled().then(() => {

        let selectors = $('.md-autocomplete-suggestions');
        assert.ok(selectors.length, 'opened menu');
        assert.ok(selectors.children().length === 8, 'only rendered 8 list items');
        $('md-autocomplete-wrap input').val('four');
        $('md-autocomplete-wrap input').change();
        return settled().then(() => {
          assert.ok(selectors.children().length === 1, 'only render searched item');
        });
      });
    });
  });

  test('when has selection and gets focused, the dropdown is not shown', async function(assert) {
    assert.expect(1);

    this.set('items', ['Ember', 'Paper', 'One', 'Two']);
    this.set('selectedItem', 'Paper');
    await render(hbs`{{#paper-autocomplete
      placeholder="Item"
      options=items
      searchText=searchText
      onSearchTextChange=(action (mut searchText))
      selected=selectedItem
      onSelectionChange=(action (mut selectedItem))
      as |item|
    }}
      {{item}}
    {{/paper-autocomplete}}`);

    $('md-autocomplete-wrap input')[0].focus();
    let suggestions = $('.md-autocomplete-suggestions');
    assert.ok(!suggestions.length, 'autocomplete-suggestions list must be closed when selected & focused in');
  });

  test('when has selection and searchText changed, the dropdown is shown with w/o selection', async function(assert) {
    assert.expect(3);

    this.set('items', ['Ember', 'Paper', 'One', 'Two']);
    this.set('selectedItem', 'Paper');
    await render(hbs`{{#paper-autocomplete
      placeholder="Item"
      options=items
      searchText=searchText
      onSearchTextChange=(action (mut searchText))
      selected=selectedItem
      onSelectionChange=(action (mut selectedItem))
      as |item|
    }}
      {{item}}
    {{/paper-autocomplete}}`);

    $('md-autocomplete-wrap input')[0].focus();
    let suggestions = $('.md-autocomplete-suggestions');
    assert.ok(!suggestions.length, 'dropdown must be closed when selected & focused in');

    // TODO: refactor this into helper; like e-p-s

    run(() => {
      let $selector = $($('md-autocomplete-wrap input').get(0)); // Only interact with the first result
      $selector.val('Pape');
      let event = document.createEvent('Events');
      event.initEvent('input', true, true);
      $selector[0].dispatchEvent(event);
    });

    return settled().then(() => {
      suggestions = $('.md-autocomplete-suggestions');
      assert.ok(suggestions.length, 'autocomplete-suggestions list is opened');
      assert.equal(this.get('selectedItem'), undefined, 'selectedItem is undefined');
    });
  });

  test('we can highlight search results for properties that aren\'t text', async function(assert) {
    assert.expect(2);

    this.items = ['1', '2', '3', '4'];
    this.selectedItem = 1;
    await render(hbs`{{#paper-autocomplete
      placeholder="Item"
      options=items
      searchText=searchText
      onSearchTextChange=(action (mut searchText))
      selected=selectedItem
      onSelectionChange=(action (mut selectedItem))
      as |item autocomplete|
    }}
      {{paper-autocomplete-highlight
          label=item
          searchText=autocomplete.searchText
          flags="i"}}
    {{/paper-autocomplete}}`);

    let suggestions = $('.md-autocomplete-suggestions');

    run(() => {
      let $selector = $($('md-autocomplete-wrap input').get(0)); // Only interact with the first result
      $selector.val('1');
      let event = document.createEvent('Events');
      event.initEvent('input', true, true);
      $selector[0].dispatchEvent(event);
    });

    return settled().then(() => {
      suggestions = $('.md-autocomplete-suggestions');
      assert.ok(suggestions.length, 'autocomplete-suggestions list is opened');
      assert.equal(this.get('selectedItem'), undefined, 'selectedItem is undefined');
    });
  });

  test('dropdown can be customized using dropdownClass', async function(assert) {
    assert.expect(1);
    this.items = ['1', '2', '3'];
    await render(hbs`{{#paper-autocomplete
      dropdownClass="custom-dropdown-class"
      placeholder="Item"
      options=items
      selected=selectedItem
      onSelectionChange=(action (mut selectedItem))
      as |item|
    }}
      {{item}}
    {{/paper-autocomplete}}`);

    return settled().then(() => {
      $('md-autocomplete-wrap input')[0].focus();
      return settled().then(() => {
        let ddContainer = $('.md-autocomplete-suggestions-container.custom-dropdown-class');
        assert.ok(ddContainer.length, 'contains custom dropdownClass');
      });
    });
  });
});
