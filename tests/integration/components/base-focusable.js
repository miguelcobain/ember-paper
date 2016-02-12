import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('base-focusable', 'Integration | Component | base focusable', {
  integration: true
});

test('should set and remove disabled attribute', function(assert) {

  this.set('value', true);
  this.render(hbs`{{base-focusable id="base-focusable" disabled=value}}`);
  assert.equal(this.$('#base-focusable').attr('disabled').trim(), 'disabled');

  this.set('value', false);
  assert.ok(!this.$('md-checkbox').attr('disabled'));
});