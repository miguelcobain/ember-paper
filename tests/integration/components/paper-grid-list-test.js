import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper grid list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders tiles with tag name', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#paper-grid-list cols="1" rowHeight="4:3" as |grid|}}
        {{#grid.tile}}
        {{/grid.tile}}
      {{/paper-grid-list}}
    `);
    return settled().then(() => {
      assert.dom('md-grid-tile').exists({ count: 1 });
    });
  });

  test('it renders tiles with footer', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#paper-grid-list cols="1" rowHeight="4:3" as |grid|}}
        {{#grid.tile as |tile|}}
          {{#tile.footer}}
          {{/tile.footer}}
        {{/grid.tile}}
      {{/paper-grid-list}}
    `);
    return settled().then(() => {
      assert.dom('md-grid-tile-footer').exists({ count: 1 });
    });
  });
});
