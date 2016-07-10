import Ember from 'ember';
import ChildMixinMixin from 'ember-paper/mixins/child-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | child mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let ChildMixinObject = Ember.Object.extend(ChildMixinMixin);
  let subject = ChildMixinObject.create();
  assert.ok(subject);
});
