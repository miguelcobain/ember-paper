import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-progress-linear', 'Integration | Component | paper progress linear', {
  integration: true
});

test('should auto-set the md-mode to "indeterminate" if not specified', function(assert) {
  this.render(hbs`{{paper-progress-linear}}`);
  assert.equal(this.$('md-progress-linear').attr('md-mode').trim(), 'indeterminate');
});

test('should auto-set the md-mode to "determinate" if a value is specified', function(assert) {
  this.render(hbs`{{paper-progress-linear value=12}}`);
  assert.equal(this.$('md-progress-linear').attr('md-mode').trim(), 'determinate');
});
