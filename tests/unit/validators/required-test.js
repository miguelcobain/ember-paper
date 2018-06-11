import { required } from 'ember-paper/validators/required';
import { module, test } from 'qunit';

module('Unit | Validator | required', function() {
  // - valid when `''`, `null` or `undefined`
  // - valid when it is a number (`123` or `'123'`) and ` >= required`

  test('strings', function(assert) {
    assert.notOk(required('', true), 'empty string');
    assert.ok(required('aaa', true), 'invalid string');
    assert.ok(required('   ', true), 'invalid string (spaces)');

    assert.ok(required('', false), 'empty string (not required)');
    assert.ok(required('aaa', false), 'invalid string (not required)');
    assert.ok(required('   ', false), 'invalid string (spaces) (not required)');
  });

  test('falsy values', function(assert) {
    assert.ok(required(0, true), 'zero');
    assert.notOk(required(null, true), 'null');
    assert.notOk(required(undefined, true), 'undefined');
    assert.ok(required(false, true), 'false');

    assert.ok(required(0, false), 'zero (not required)');
    assert.ok(required(null, false), 'null (not required)');
    assert.ok(required(undefined, false), 'undefined (not required)');
    assert.ok(required(false, false), 'false (not required)');
  });
});
