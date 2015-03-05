import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('paper-sidenav-toggle', 'PaperSidenavToggleComponent', {
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
  assert.equal(component.get('element').tagName, 'md-sidenav-toggle'.toUpperCase(), 'matches `md-sidenav-toggle`');
});

test('when clicked triggers `toggleSidenav` event by default', function(assert) {
  assert.expect(1);
  var component = this.subject();
  var didFire = false;

  var $component = this.$();
  Ember.run(function() {
    $component.on('toggleSidenav', function() {
      didFire = true;
    });
    $component.trigger('click');
  });

  assert.ok(didFire, 'toggleSidenav event fired');
});

test('when clicked triggers `expandSidenav` event if toggle is false', function(assert) {
  assert.expect(1);
  var component = this.subject({toggle: false});
  var didFire = false;

  var $component = this.$();
  Ember.run(function() {
    $component.on('expandSidenav', function() {
      didFire = true;
    });
    $component.trigger('click');
  });

  assert.ok(didFire, 'expandSidenav event fired');
});
