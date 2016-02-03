import Ember from 'ember';
import ButtonRippleMixinMixin from '../../../mixins/button-ripple-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | button ripple mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let ButtonRippleMixinObject = Ember.Object.extend(ButtonRippleMixinMixin);
  let subject = ButtonRippleMixinObject.create();
  assert.ok(subject);
});
