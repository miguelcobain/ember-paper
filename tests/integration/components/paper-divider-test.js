import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper divider', function(hooks) {
  setupRenderingTest(hooks);

  test('has required classes by default', async function(assert) {
    assert.expect(2);
    await render(hbs`
      {{#paper-divider}}
      {{/paper-divider}}
    `);

    assert.dom('md-divider').hasClass('paper-divider');
    assert.dom('md-divider').hasClass('md-default-theme');
  });

  test('uses md-inset attribute when passed inset=true', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#paper-divider inset=true}}
      {{/paper-divider}}
    `);

    assert.ok(find('md-divider').getAttribute('md-inset'));
  });

  test('no md-inset attribute when passed inset=false', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#paper-divider inset=false}}
      {{/paper-divider}}
    `);

    assert.notOk(find('md-divider').getAttribute('md-inset'));
  });

  test('md-inset attribute is not present when inset is not passed', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#paper-divider}}
      {{/paper-divider}}
    `);
    // Attribute should NOT be present in md-divider
    assert.notOk(find('md-divider').getAttribute('md-inset'));
  });
});
