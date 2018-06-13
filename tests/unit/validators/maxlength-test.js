import { maxlength } from 'ember-paper/validators/maxlength';
import { module, test } from 'qunit';

module('Unit | Validator | maxlength', function() {
  test('numbers', function(assert) {
    assert.ok(maxlength(0, 1), 'zero equal length');
    assert.notOk(maxlength(123, 2), 'zero greater');
    assert.ok(maxlength(123, 5), 'number lesser');
  });

  test('strings', function(assert) {
    assert.ok(maxlength('', 1), 'empty string');
    assert.notOk(maxlength('123', 1), 'string greater');
    assert.ok(maxlength('0', 2), 'string lesser');
    assert.ok(maxlength('1', 1), 'string equal');
    assert.notOk(maxlength('   ', 1), 'spaces');
  });

  test('falsy values', function(assert) {
    assert.ok(maxlength(null, 1), 'null');
    assert.ok(maxlength(undefined, 1), 'undefined');
  });
});
