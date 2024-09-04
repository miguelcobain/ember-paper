import { underscore } from 'dummy/helpers/-paper-underscore';
import { module, test } from 'qunit';

module('Unit | Helper | underscore', function() {
  test('Replaces dashes by underscores', function(assert) {
    let result = underscore(['my-icon']);
    assert.strictEqual(result, 'my_icon');
  });

  test('Leaves underscores alone', function(assert) {
    let result = underscore(['my_icon']);
    assert.strictEqual(result, 'my_icon');
  });
});
