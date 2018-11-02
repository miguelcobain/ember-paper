import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper progress linear', function(hooks) {
  setupRenderingTest(hooks);

  test('should auto-set the md-mode to "indeterminate" if not specified', async function(assert) {
    await render(hbs`{{paper-progress-linear}}`);
    assert.dom('md-progress-linear').hasAttribute('md-mode', 'indeterminate');
  });

  test('should auto-set the md-mode to "determinate" if a value is specified', async function(assert) {
    await render(hbs`{{paper-progress-linear value=12}}`);
    assert.dom('md-progress-linear').hasAttribute('md-mode', 'determinate');
  });

  test('should auto-set the md-mode to "buffer" if a value and bufferValue is specified', async function(assert) {
    await render(hbs`{{paper-progress-linear  value=50  bufferValue=100}}`);
    assert.dom('md-progress-linear').hasAttribute('md-mode', 'buffer');
  });

  test('it sets transform based on value', async function(assert) {
    await render(hbs`{{paper-progress-linear value=50}}`);

    let bar2 = find('.md-bar2');
    let bar2style = bar2.style.transform || bar2.style['-webkit-transform'];

    assert.equal(bar2style, 'translateX(-25%) scale(0.5, 1)', 'Transition set correctly');
  });

  test('it sets transform based on buffer value', async function(assert) {
    await render(hbs`{{paper-progress-linear value=50 bufferValue=75}}`);

    let bar1 = find('.md-bar1');
    let bar1style = bar1.style.transform || bar1.style['-webkit-transform'];

    assert.equal(bar1style, 'translateX(-12.5%) scale(0.75, 1)', 'Buffer bar transition set correctly');
  });

  test('it should not set transition in query mode', async function(assert) {
    await render(hbs`{{paper-progress-linear value=80 mode="query"}}`);

    let bar2 = find('.md-bar2');
    let bar2style = bar2.style.transform || bar2.style['-webkit-transform'];

    assert.ok(!bar2style, 'Buffer bar not set');
  });
});