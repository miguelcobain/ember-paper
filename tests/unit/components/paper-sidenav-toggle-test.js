import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('paper-sidenav-toggle', 'PaperSidenavToggleComponent', {
  // specify the other units that are required for this test
  needs: ['service:paper-eventbus']
});

test('it renders', function(assert) {
  assert.expect(3);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // appends the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
  assert.equal(component.get('element').tagName, 'md-sidenav-toggle'.toUpperCase(), 'matches `md-sidenav-toggle`');
});

test('when clicked triggers `toggleSidenav` on navContainer', function(assert) {
  assert.expect(1);
  var component = this.subject();

  var didFire = false;
  component.get('paperEventBus').subscribe('paper:toggle-sidenav', function () {
    didFire = true;
  });

  var $component = this.$();
  Ember.run(function() {
    $component.trigger('click');
  });

  assert.ok(didFire, 'toggleSidenav called');
});

test('when clicked triggers `expandSidenav` if toggle is false on navContainer', function(assert) {
  assert.expect(1);
  var component = this.subject({toggle: false});
  var didFire = false;

  component.get('paperEventBus').subscribe('paper:expand-sidenav', function () {
    didFire = true;
  });

  var $component = this.$();
  Ember.run(function() {
    $component.trigger('click');
  });

  assert.ok(didFire, 'expandSidenav called');
});
