import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, find, waitUntil } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper progress circular', function(hooks) {
  setupRenderingTest(hooks);

  test('should auto-set the md-mode to "indeterminate" if not specified', async function(assert) {
    assert.expect(1);
    await render(hbs`{{paper-progress-circular}}`);
    assert.dom('md-progress-circular').hasAttribute('md-mode', 'indeterminate');
  });

  test('should auto-set the md-mode to "determinate" if a value is specified', async function(assert) {
    assert.expect(1);
    await render(hbs`{{paper-progress-circular value=12}}`);

    assert.dom('md-progress-circular').hasAttribute('md-mode', 'determinate');
  });

  test('should set correct size based on diameter', async function(assert) {
    assert.expect(2);
    await render(hbs`{{paper-progress-circular diameter=25}}`);

    assert.dom('md-progress-circular').hasAttribute('style', /height:.*25px/);
    assert.dom('md-progress-circular').hasAttribute('style', /width:.*25px/);

  });

  test('renders correctly with explicit value and diameter', async function(assert) {
    assert.expect(5);

    await render(hbs`{{paper-progress-circular value=50 diameter=25}}`);

    await settled();

    assert.dom('md-progress-circular').hasAttribute('style', /height:.*25px/);
    assert.dom('md-progress-circular').hasAttribute('style', /width:.*25px/);

    await waitUntil(() => find('md-progress-circular > svg > path[transform]'));
    let path = find('md-progress-circular > svg > path');

    await settled();

    assert.dom(path).hasAttribute('transform', 'rotate(0 12.5 12.5)', 'rotated halfway');

    let strokeOffset = path.getAttribute('stroke-dashoffset');
    let strokeDashArray = path.getAttribute('stroke-dasharray');

    assert.ok(parseFloat(strokeOffset), 'stroke-dashoffset has a number');
    assert.ok(parseFloat(strokeDashArray), 'stroke-dasharray has a number');
  });
});
