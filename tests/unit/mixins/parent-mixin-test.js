import Ember from 'ember';
import ParentMixinMixin from 'ember-paper/mixins/parent-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | parent mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let ParentMixinObject = Ember.Object.extend(ParentMixinMixin);
  let subject = ParentMixinObject.create();
  assert.ok(subject);
});
