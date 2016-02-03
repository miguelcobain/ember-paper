import Ember from 'ember';
import CheckboxRippleMixin from '../../../mixins/checkbox-ripple';
import { module, test } from 'qunit';

module('Unit | Mixin | checkbox ripple');

// Replace this with your real tests.
test('it works', function(assert) {
  let CheckboxRippleObject = Ember.Object.extend(CheckboxRippleMixin);
  let subject = CheckboxRippleObject.create();
  assert.ok(subject);
});
