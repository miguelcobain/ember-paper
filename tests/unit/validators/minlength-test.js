import { minlength } from 'ember-paper/validators/minlength';
import { module, test } from 'qunit';

module('Unit | Validator | minlength', function() {
  test('numbers', function(assert) {
    assert.ok(minlength(0, 1), 'zero equal length');
    assert.ok(minlength(123, 2), 'zero greater');
    assert.notOk(minlength(123, 5), 'number lesser');
  });

  test('strings', function(assert) {
    assert.notOk(minlength('', 1), 'empty string');
    assert.ok(minlength('123', 1), 'string greater');
    assert.notOk(minlength('0', 2), 'string lesser');
    assert.ok(minlength('1', 1), 'string equal');
    assert.ok(minlength('   ', 1), 'spaces');
  });

  test('falsy values', function(assert) {
    assert.ok(minlength(null, 1), 'null');
    assert.ok(minlength(undefined, 1), 'undefined');
  });
});
