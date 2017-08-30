import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import run from 'ember-runloop';
import wait from 'ember-test-helpers/wait';
import $ from 'jquery';

moduleForComponent('paper-autcomplete', 'Integration | Component | paper autocomplete', {
  integration: true
});

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

test('opens on click', function(assert) {
  assert.expect(1);
  this.appRoot = document.querySelector('#ember-testing');
  this.set('items', ['Ember', 'Paper', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']);
  this.render(hbs`{{#paper-autocomplete
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

  return wait().then(() => {
    $('md-autocomplete-wrap input')[0].focus();

    return wait().then(() => {
      let selectors = $('.md-autocomplete-suggestions');
      assert.ok(selectors.length, 'opened menu');
    });
  });
});

test('backdrop removed if select closed', function(assert) {
  assert.expect(2);
  this.appRoot = document.querySelector('#ember-testing');
  this.set('items', ['Ember', 'Paper', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']);
  this.render(hbs`
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

  return wait().then(() => {
    $('md-autocomplete-wrap input')[0].focus();

    return wait().then(() => {

      let selectors = $('.md-autocomplete-suggestions');
      assert.ok(selectors.length, 'opened menu');
      let event = new window.Event('mousedown', { bubbles: true, cancelable: true, view: window });
      this.$('#other-div')[0].dispatchEvent(event);
      return wait().then(() => {
        let selector = $('.md-autocomplete-suggestions');
        assert.ok(!selector.length, 'backdrop removed');
      });
    });
  });
});

test('should render only enough items to fill the menu + 3', function(assert) {
  assert.expect(2);
  this.appRoot = document.querySelector('#ember-testing');
  this.set('items', ['Ember', 'Paper', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']);
  this.render(hbs`{{#paper-autocomplete
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

  return wait().then(() => {
    $('md-autocomplete-wrap input')[0].focus();

    return wait().then(() => {
      let selectors = $('.md-autocomplete-suggestions');
      assert.ok(selectors.length, 'opened menu');
      assert.equal(selectors.children().length, 8, 'only rendered 8 items');
    });
  });
});

test('should filter list by search term', function(assert) {
  assert.expect(3);
  this.appRoot = document.querySelector('#ember-testing');
  this.set('items', ['Ember', 'Paper', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']);
  this.render(hbs`{{#paper-autocomplete
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
  return wait().then(() => {
    $('md-autocomplete-wrap input')[0].focus();

    return wait().then(() => {

      let selectors = $('.md-autocomplete-suggestions');
      assert.ok(selectors.length, 'opened menu');
      assert.ok(selectors.children().length === 8, 'only rendered 8 list items');
      $('md-autocomplete-wrap input').val('four');
      $('md-autocomplete-wrap input').change();
      return wait().then(() => {
        assert.ok(selectors.children().length === 1, 'only render searched item');
      });
    });
  });
});

test('when has selection and gets focused, the dropdown is not shown', function(assert) {
  assert.expect(1);

  this.set('items', ['Ember', 'Paper', 'One', 'Two']);
  this.set('selectedItem', 'Paper');
  this.render(hbs`{{#paper-autocomplete
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

test('when has selection and searchText changed, the dropdown is shown with w/o selection', function(assert) {
  assert.expect(3);

  this.set('items', ['Ember', 'Paper', 'One', 'Two']);
  this.set('selectedItem', 'Paper');
  this.render(hbs`{{#paper-autocomplete
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

  return wait().then(() => {
    suggestions = $('.md-autocomplete-suggestions');
    assert.ok(suggestions.length, 'autocomplete-suggestions list is opened');
    assert.equal(this.get('selectedItem'), undefined, 'selectedItem is undefined');
  });
});

test('we can highlight search results for properties that aren\'t text', function(assert) {
  assert.expect(2);

  this.set('items', ['1', '2', '3', '4']);
  this.set('selectedItem', 1);
  this.render(hbs`{{#paper-autocomplete
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

  return wait().then(() => {
    suggestions = $('.md-autocomplete-suggestions');
    assert.ok(suggestions.length, 'autocomplete-suggestions list is opened');
    assert.equal(this.get('selectedItem'), undefined, 'selectedItem is undefined');
  });
});
