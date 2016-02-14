import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-progress-circular', 'Integration | Component | paper progress circular', {
  integration: true
});

test('should auto-set the md-mode to "indeterminate" if not specified', function(assert) {
  this.render(hbs`{{paper-progress-circular}}`);
  assert.equal(this.$('md-progress-circular').attr('md-mode').trim(), 'indeterminate');
});

test('should auto-set the md-mode to "determinate" if a value is specified', function(assert) {
  this.render(hbs`{{paper-progress-circular value=12}}`);
  assert.equal(this.$('md-progress-circular').attr('md-mode').trim(), 'determinate');
});

function getScale(el) {
  let transform = el.style.transform || el.style['-webkit-transform'];
  let matches = /scale\(([0-9\.]+)\)/.exec(transform);
  let scale = parseFloat(matches[1]);

  return Math.round(scale * 100) / 100;
}

test('it sets transform scale 0.5 by default', function(assert) {
  this.render(hbs`{{paper-progress-circular}}`);
  assert.equal(getScale(this.$('md-progress-circular').children()[0]), 0.5);
});

test('should set scaling using percentage values', function(assert) {
  this.render(hbs`{{paper-progress-circular diameter="25%"}}`);

  let $el = this.$('md-progress-circular');
  assert.equal(getScale($el.children()[0]), 0.25);
  assert.equal($el.css('width'), '25px');
  assert.equal($el.css('height'), '25px');
});

test('should set scaling using pixel values', function(assert) {
  this.render(hbs`{{paper-progress-circular diameter="37px"}}`);

  let $el = this.$('md-progress-circular');
  assert.equal(getScale($el.children()[0]), 0.37);
  assert.equal($el.css('width'), '37px');
  assert.equal($el.css('height'), '37px');
});