import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper toolbar', function(hooks) {
  setupRenderingTest(hooks);

  test('uses md-tall class tall=true', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#paper-toolbar tall=true}}
      {{/paper-toolbar}}
    `);

    assert.ok(find('md-toolbar').classList.contains('md-tall'));
  });

  test('paper-toolbar-tools uses .md-toolbar-tools class', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#paper-toolbar tall=true}}
        {{#paper-toolbar-tools}}
        {{/paper-toolbar-tools}}
      {{/paper-toolbar}}
    `);

    assert.equal(findAll('.md-toolbar-tools').length, 1);
  });
});
