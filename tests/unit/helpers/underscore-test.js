import { underscore } from 'dummy/helpers/-ep-underscore';
import { module, test } from 'qunit';

module('Unit | Helper | underscore');

test('Replaces dashes by underscores', function(assert) {
  let result = underscore(['my-icon']);
  assert.equal(result, 'my_icon');
});

test('Leaves underscores alone', function(assert) {
  let result = underscore(['my_icon']);
  assert.equal(result, 'my_icon');
});
