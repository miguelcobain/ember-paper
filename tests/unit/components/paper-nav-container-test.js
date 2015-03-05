import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('paper-nav-container', 'PaperNavContainerComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function(assert) {
  assert.expect(3);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // appends the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
  assert.equal(component.get('element').tagName, 'md-nav-container'.toUpperCase(), 'matches `md-nav-container`');
});

test('expandSidenav event sets open property to true', function(assert) {
  assert.expect(2);
  var component = this.subject();
  assert.equal(component.get('open'), false, 'default value for open prop is false');

  Ember.run(component, 'expandSidenav');
  assert.equal(component.get('open'), true, 'expandSidenav event sets open prop to true');
});

test('toggleSidenav event sets open property from false to true', function(assert) {
  assert.expect(3);
  var component = this.subject();
  assert.equal(component.get('open'), false, 'default value for open prop is false');

  Ember.run(component, 'toggleSidenav');
  assert.equal(component.get('open'), true, 'toggleSidenav event sets open prop to true');

  Ember.run(component, 'toggleSidenav');
  assert.equal(component.get('open'), false, 'toggleSidenav event sets open prop to false');
});

test('collapseSidenav event sets open property to false', function(assert) {
  assert.expect(1);
  var component = this.subject();

  component.set('open', true);

  Ember.run(component, 'collapseSidenav');
  assert.equal(component.get('open'), false, 'collapseSidenav event sets open prop to false');
});
