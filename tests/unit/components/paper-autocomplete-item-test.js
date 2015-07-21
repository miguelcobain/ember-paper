import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('paper-autocomplete-item', 'Unit | Component | paper autocomplete highlight', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('it sets correct label when lookupKey is defined', function(assert) {
  assert.expect(1);

  // Creates the component instance
  var component = this.subject({
    lookupKey: 'name',
    item: {id: 2, name: 'Blah Test'},
  });

  assert.equal(component.get('label'), 'Blah Test');

});

test('it sets correct label when lookupKey is NOT defined', function(assert) {
  assert.expect(1);

  // Creates the component instance
  var component = this.subject({
    item: 'Blah Test'
  });

  assert.equal(component.get('label'), 'Blah Test');

});

test('it sets isSelected when index is equal to selectedIndex', function(assert) {
  assert.expect(1);

  // Creates the component instance
  var component = this.subject({
    index: 23,
    selectedIndex: 23
  });

  assert.equal(component.get('isSelected'), true);

});
