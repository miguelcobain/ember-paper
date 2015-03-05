import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('paper-sidenav', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function(assert) {
  assert.expect(3);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
  assert.equal(component.get('element').tagName, 'md-sidenav'.toUpperCase(), 'matches `md-sidenav`');
});
