import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper divider', function(hooks) {
  setupRenderingTest(hooks);

  test('uses md-inset attribute when passed inset=true', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#paper-divider inset=true}}
      {{/paper-divider}}
    `);

    assert.dom('md-divider').hasAttribute('md-inset');
  });

  test('no md-inset attribute when passed inset=false', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#paper-divider inset=false}}
      {{/paper-divider}}
    `);

    assert.dom('md-divider').doesNotHaveAttribute('md-inset');
  });

  test('md-inset attribute is not present when inset is not passed', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#paper-divider}}
      {{/paper-divider}}
    `);
    // Attribute should NOT be present in md-divider
    assert.dom('md-divider').doesNotHaveAttribute('md-inset');
  });
});
