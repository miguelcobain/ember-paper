import { max } from 'ember-paper/validators/max';
import { module, test } from 'qunit';

module('Unit | Validator | max', function() {
  // - valid when `''`, `null` or `undefined`
  // - valid when it is a number (`123` or `'123'`) and ` <= max`

  test('numbers', function(assert) {
    assert.ok(max(0, 1), 'zero lesser');
    assert.notOk(max(0, -1), 'zero greater');
    assert.notOk(max(123, 1), 'number greater');
    assert.ok(max(-123, 1), 'number lesser');
    assert.notOk(max(1.6, 1.5), 'float number greater');
    assert.ok(max(1.4, 1.5), 'float number lesser');
  });

  test('strings', function(assert) {
    assert.ok(max('', 1), 'empty string');
    assert.notOk(max('123', 1), 'numeric string greater');
    assert.ok(max('0', 1), 'numeric string lesser');
    assert.ok(max('1', 1), 'numeric string equal');
    assert.notOk(max('1.6', '1.5'), 'numeric float string greater');
    assert.ok(max('1.4', '1.5'), 'numeric float string lesser');
    assert.notOk(max('aaa', 1), 'invalid string');
    assert.notOk(max('   ', 1), 'invalid string (spaces)');
  });

  test('falsy values', function(assert) {
    assert.ok(max(null, 1), 'null');
    assert.ok(max(undefined, 1), 'undefined');
    assert.notOk(max(false, 1), 'false');
  });
});
