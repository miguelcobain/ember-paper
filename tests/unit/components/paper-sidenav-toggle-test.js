import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('paper-sidenav-toggle', 'PaperSidenavToggleComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  unit: true
});

test('it renders', function(assert) {
  assert.expect(3);

  // creates the component instance
  let component = this.subject();
  assert.equal(component._state, 'preRender');

  // appends the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
  assert.equal(component.get('element').tagName, 'div'.toUpperCase(), 'matches `div`');
});
