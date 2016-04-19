import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('paper-autocomplete-item', 'Unit | Component | paper autocomplete item', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  let component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('it sets correct label when lookupKey is defined', function(assert) {
  assert.expect(1);

  // Creates the component instance
  let component = this.subject({
    lookupKey: 'name',
    item: { id: 2, name: 'Blah Test' }
  });

  assert.equal(component.get('label'), 'Blah Test');

});

test('it sets correct label when lookupKey is NOT defined', function(assert) {
  assert.expect(1);

  // Creates the component instance
  let component = this.subject({
    item: 'Blah Test'
  });

  assert.equal(component.get('label'), 'Blah Test');

});

test('it sets isSelected when index is equal to selectedIndex', function(assert) {
  assert.expect(1);

  // Creates the component instance
  let component = this.subject({
    index: 23,
    selectedIndex: 23
  });

  assert.equal(component.get('isSelected'), true);

});

test('trigger external action when item is clicked', function(assert) {
  assert.expect(1);

  let item = { name: 'test' };

  let component = this.subject({
    item,
    lookupKey: 'name'
  });
  this.$();

  let targetObject = {
    externalAction(item2) {
      // we have the assertion here which will be
      // called when the action is triggered
      assert.equal(item, item2, 'external Action was called and item received was correct.');
    }
  };
  component.set('pick', 'externalAction');
  component.set('targetObject', targetObject);
  this.$().click();
});
