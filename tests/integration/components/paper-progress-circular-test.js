import { moduleForComponent, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-progress-circular', 'Integration | Component | paper progress circular', {
  integration: true
});

test('should auto-set the md-mode to "indeterminate" if not specified', function(assert) {
  assert.expect(1);
  this.render(hbs`{{paper-progress-circular}}`);
  assert.equal(this.$('md-progress-circular').attr('md-mode').trim(), 'indeterminate');
});

test('should auto-set the md-mode to "determinate" if a value is specified', function(assert) {
  assert.expect(1);
  this.render(hbs`{{paper-progress-circular value=12}}`);
  assert.equal(this.$('md-progress-circular').attr('md-mode').trim(), 'determinate');
});

test('should set correct size based on diameter', function(assert) {
  assert.expect(2);
  this.render(hbs`{{paper-progress-circular diameter=25}}`);

  let $el = this.$('md-progress-circular');
  assert.ok(/height:.*25px/.test($el.attr('style')));
  assert.ok(/width:.*25px/.test($el.attr('style')));
});

test('renders correctly with explicit value and diameter', async function(assert) {
  assert.expect(5);

  this.render(hbs`{{paper-progress-circular value=50 diameter=25}}`);

  await wait();

  let $el = this.$('md-progress-circular');
  assert.ok(/height:.*25px/.test($el.attr('style')));
  assert.ok(/width:.*25px/.test($el.attr('style')));

  let $svgPath = $el.find('path');
  assert.equal('rotate(0 12.5 12.5)', $svgPath.attr('transform'), 'rotated halfway');
  assert.ok(parseFloat($svgPath.attr('stroke-dashoffset')), 'stroke-dashoffset has a number');
  assert.ok(parseFloat($svgPath.attr('stroke-dasharray')), 'stroke-dasharray has a number');
});
