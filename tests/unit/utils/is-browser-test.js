import isBrowser from 'dummy/utils/is-browser';
import { module, test } from 'qunit';

module('Unit | Utility | is browser');

test('should remain true until we add fastboot tests', function(assert) {
  assert.strictEqual(isBrowser(), true);
});
