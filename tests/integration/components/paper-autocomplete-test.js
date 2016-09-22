import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('paper-autcomplete', 'Integration | Component | paper autocomplete', {
  integration: true
});

test('opens on click', function(assert) {
  assert.expect(1);
  this.appRoot = document.querySelector('#ember-testing');
  this.set('items', ['Ember', 'Paper', 'One', 'Two', 'Three','Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']);
  this.render(hbs`{{#paper-autocomplete
    placeholder="Item"
    options=items
    selected=selectedItem
    onChange=(action (mut selectedItem))
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
  this.set('items', ['Ember', 'Paper', 'One', 'Two', 'Three','Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']);
  this.render(hbs`
    <div id="other-div"></div>
    {{#paper-autocomplete
    placeholder="Item"
    options=items
    selected=selectedItem
    onChange=(action (mut selectedItem))
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
  this.set('items', ['Ember', 'Paper', 'One', 'Two', 'Three','Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']);
  this.render(hbs`{{#paper-autocomplete
    placeholder="Item"
    options=items
    selected=selectedItem
    onChange=(action (mut selectedItem))
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
//
// test('should filter list by search term', function(assert) {
//   assert.expect(3);
//   this.appRoot = document.querySelector('#ember-testing');
//   this.set('items', ['Ember', 'Paper', 'One', 'Two', 'Three','Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']);
//   this.render(hbs`{{#paper-autocomplete
//     placeholder="Item"
//     options=items
//     selected=selectedItem
//     onChange=(action (mut selectedItem))
//     as |item|
//   }}
//     {{item}}
//   {{/paper-autocomplete}}`);
//   return wait().then(() => {
//     $('md-autocomplete-wrap input')[0].focus();
//
//     return wait().then(() => {
//
//       let selectors = $('.md-autocomplete-suggestions');
//       assert.ok(selectors.length, 'opened menu');
//       assert.ok(selectors.children().length === 8, 'only rendered 8 list items');
//       $('md-autocomplete-wrap input').val('four');
//       $('md-autocomplete-wrap input').change();
//       return wait().then(() => {
//         assert.ok(selectors.children().length === 1, 'only render searched item');
//       });
//     });
//   });
// });
