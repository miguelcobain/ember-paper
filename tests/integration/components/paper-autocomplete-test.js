import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, settled, focus, triggerEvent, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper-autocomplete', function(hooks) {
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

    await settled();

    await focus('md-autocomplete-wrap input');

    assert.dom('.md-autocomplete-suggestions').exists('opened menu');
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

    await settled();

    await focus('md-autocomplete-wrap input');

    assert.dom('.md-autocomplete-suggestions').exists('opened menu');

    await triggerEvent('#other-div', 'mousedown');

    assert.dom('.md-autocomplete-suggestions').doesNotExist('backdrop removed');
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

    await settled();

    await focus('md-autocomplete-wrap input');

    assert.dom('.md-autocomplete-suggestions').exists('opened menu');

    assert.dom('.md-autocomplete-suggestions li').exists({ count: 8 }, 'only rendered 8 items');
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

    await settled();

    await focus('md-autocomplete-wrap input');

    assert.dom('.md-autocomplete-suggestions').exists('opened menu');

    assert.dom('.md-autocomplete-suggestions li').exists({ count: 8 }, 'only rendered 8 items');

    await fillIn('md-autocomplete-wrap input', 'four');

    assert.dom('.md-autocomplete-suggestions li').exists({ count: 1 }, 'only render searched item');
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

    await settled();

    await focus('md-autocomplete-wrap input');

    assert.dom('.md-autocomplete-suggestions').doesNotExist('autocomplete-suggestions list must be closed when selected & focused in');
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

    await settled();

    await focus('md-autocomplete-wrap input');

    assert.dom('.md-autocomplete-suggestions').doesNotExist('dropdown must be closed when selected & focused in');

    await fillIn('md-autocomplete-wrap input', 'Pape');

    assert.dom('.md-autocomplete-suggestions').exists('autocomplete-suggestions list is opened');

    assert.equal(this.get('selectedItem'), undefined, 'selectedItem is undefined');
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

    await settled();

    await focus('md-autocomplete-wrap input');

    await fillIn('md-autocomplete-wrap input', '1');

    assert.dom('.md-autocomplete-suggestions').exists('autocomplete-suggestions list is opened');

    assert.equal(this.get('selectedItem'), undefined, 'selectedItem is undefined');
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

    await settled();

    await focus('md-autocomplete-wrap input');

    assert.dom('.md-autocomplete-suggestions-container').hasClass('custom-dropdown-class', 'contains custom dropdownClass');
  });

  test('shows validation errors after being touched', async function(assert) {
    assert.expect(3);
    this.items = ['1', '2', '3', '4'];

    class DummyValidation {
      get errors() {
        return ['validation error!'];
      }
    }
    this.v = new DummyValidation();
    await render(hbs`{{#paper-autocomplete
      label="Fooo"
      options=items
      selected=selectedItem
      errors=v.errors
      onSelectionChange=(action (mut selectedItem))
      as |item|}}
      {{item}}
    {{/paper-autocomplete}}`);

    await settled();

    assert.dom('md-input-container').hasNoClass('md-input-invalid');

    await click('md-autocomplete input');
    await triggerEvent('md-autocomplete input', 'blur');

    assert.dom('md-input-container').hasClass('md-input-invalid');
    assert.dom('md-autocomplete .paper-input-error').hasText('validation error!');
  });

  test('it does not submit a form when clear is clicked', async function(assert) {
    assert.expect(3);

    this.set('selectedItem', '1');
    this.set('items', ['1', '2']);
    this.set('submitForm', () => {
      this.set('formSubmitted', true);
    });

    await render(hbs`
      {{#paper-form onSubmit=(action submitForm) as |form|}}
        {{form.autocomplete
          allowClear=true
          options=items
          selected=selectedItem
          onSelectionChange=(action (mut selectedItem))
        }}
      {{/paper-form}}
    `);

    assert.dom('form md-autocomplete button').hasAttribute('type', 'button', 'Clear has type="button"');
    await click('form md-autocomplete button');
    assert.notOk(this.get('selectedItem'), 'The selected item is cleared');
    assert.notOk(this.get('formSubmitted'), 'The outer form should not be submitted when the clear button is clicked');
  });
});
