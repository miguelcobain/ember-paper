import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-select', 'Integration | Component | paper select', {
  integration: true
});

test('the `onChange` action is mandatory', function(assert) {
  assert.expect(1);

  assert.throws(() => {
    this.render(hbs`{{paper-select}}`);
  }, /`onChange` action/);
});
