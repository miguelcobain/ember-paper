import clamp from 'dummy/utils/clamp';
import { module, test } from 'qunit';

module('Unit | Utility | clamp', function() {
  test('it clamps a number to minimum value', function(assert) {
    let result = clamp(-10, 10, 20);
    assert.equal(result, 10);
  });

  test('it clamps a number to maximum value', function(assert) {
    let result = clamp(999999, 10, 20);
    assert.equal(result, 20);
  });
});
