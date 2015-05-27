import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('paper-checkbox', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
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


test('should set checked css class', function(assert) {
  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.set('checked', true);
  });

  assert.ok(this.$().hasClass('md-checked'));
});

test('element should be focusable if not disabled', function(assert) {
  var component = this.subject();

  assert.equal(this.$().attr('tabindex'), '0');
});

test('it updates when clicked, and triggers the `changed` action', function(assert) {
  var changedActionCallCount = 0;
  var component = this.subject({
    checked: false,
    changed: 'changed',
    targetObject: Ember.Controller.createWithMixins({
      actions: {
        changed: function() {
          changedActionCallCount++;
        }
      }
    })
  });
  this.append();

  assert.equal(changedActionCallCount, 0);
  assert.equal(component.$().hasClass('md-checked'), false);

  Ember.run(function() {
    component.$().trigger('click');
  });

  assert.equal(component.$().hasClass('md-checked'), true, 'updates element property');
  assert.equal(component.get('checked'), true, 'updates component property');

  assert.equal(changedActionCallCount, 1);
});

test('element should not be focusable if disabled', function(assert) {
  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.set('disabled', true);
  });

  assert.equal(this.$().attr('tabindex'), '-1');
});

test('it is possible to check and set checked to true', function(assert) {
  var component = this.subject();

  this.$().trigger('click');

  assert.ok(component.get('checked'));
});

test('it is possible to uncheck and set checked to false', function(assert) {
  var component = this.subject();

  Ember.run(function() {
    component.set('checked', true);
  });

  this.$().trigger('click');

  assert.ok(!component.get('checked'));
});

test('it is possible to check using spacebar', function(assert) {
  var component = this.subject();

  var e = $.Event('keypress');
  e.which = 32; // # Some key code value
  this.$().trigger(e);

  assert.ok(component.get('checked'));
});

test('it is possible to uncheck using spacebar', function(assert) {
  var component = this.subject();

  Ember.run(function() {
    component.set('checked', true);
  });

  var e = $.Event('keypress');
  e.which = 32; // # Some key code value
  this.$().trigger(e);

  assert.ok(!component.get('checked'));
});

test('blockless version should set label inside', function(assert) {
  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.set('label', 'Button');
  });

  assert.equal(this.$('.md-label').html().trim(), 'Button');
});
