import { min } from 'ember-paper/validators/min';
import { module, test } from 'qunit';

module('Unit | Validator | min', function() {
  // - valid when `''`, `null` or `undefined`
  // - valid when it is a number (`123` or `'123'`) and ` >= min`

  test('numbers', function(assert) {
    assert.notOk(min(0, 1), 'zero lesser');
    assert.ok(min(0, -1), 'zero greater');
    assert.ok(min(123, 1), 'number greater');
    assert.notOk(min(-123, 1), 'number lesser');
    assert.ok(min(1.6, 1.5), 'float number greater');
    assert.notOk(min(1.4, 1.5), 'float number lesser');
  });

  test('strings', function(assert) {
    assert.ok(min('', 1), 'empty string');
    assert.ok(min('123', 1), 'numeric string greater');
    assert.notOk(min('0', 1), 'numeric string lesser');
    assert.ok(min('1', 1), 'numeric string equal');
    assert.ok(min('1.6', '1.5'), 'numeric float string greater');
    assert.notOk(min('1.4', '1.5'), 'numeric float string lesser');
    assert.notOk(min('aaa', 1), 'invalid string');
    assert.notOk(min('   ', -1), 'invalid string (spaces)');
  });

  test('falsy values', function(assert) {
    assert.ok(min(null, 1), 'null');
    assert.ok(min(undefined, 1), 'undefined');
    assert.notOk(min(false, 1), 'false');
  });
});
