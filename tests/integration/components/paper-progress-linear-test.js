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

test('should auto-set the md-mode to "buffer" if a value and bufferValue is specified', function(assert) {
  this.render(hbs`{{paper-progress-linear  value=50  bufferValue=100}}`);
  assert.equal(this.$('md-progress-linear').attr('md-mode'), 'buffer');
});

test('it sets transform based on value', function(assert) {
  this.render(hbs`{{paper-progress-linear value=50}}`);

  let bar2 = this.$('._md-bar2').get(0);
  let bar2style = bar2.style.transform || bar2.style['-webkit-transform'];

  assert.equal(bar2style, 'translateX(-25%) scale(0.5, 1)', 'Transition set correctly');
});

test('it sets transform based on buffer value', function(assert) {
  this.render(hbs`{{paper-progress-linear value=50 bufferValue=75}}`);

  let bar1 = this.$('._md-bar1').get(0);
  let bar1style = bar1.style.transform || bar1.style['-webkit-transform'];

  assert.equal(bar1style, 'translateX(-12.5%) scale(0.75, 1)', 'Buffer bar transition set correctly');
});

test('it should not set transition in query mode', function(assert) {
  this.render(hbs`{{paper-progress-linear value=80 mode="query"}}`);

  let bar2 = this.$('._md-bar2').get(0);
  let bar2style = bar2.style.transform || bar2.style['-webkit-transform'];

  assert.ok(!bar2style, 'Buffer bar not set');
});