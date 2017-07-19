import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('paper-grid-list', 'Integration | Component | paper grid list', {
  integration: true
});

test('it renders tiles with tag name', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#paper-grid-list cols="1" rowHeight="4:3" as |grid|}}
      {{#grid.tile}}
      {{/grid.tile}}
    {{/paper-grid-list}}
  `);
  return wait().then(() => {
    assert.equal(this.$('md-grid-tile').length, 1);
  });
});

test('it renders tiles with footer', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#paper-grid-list cols="1" rowHeight="4:3" as |grid|}}
      {{#grid.tile as |tile|}}
        {{#tile.footer}}
        {{/tile.footer}}
      {{/grid.tile}}
    {{/paper-grid-list}}
  `);
  return wait().then(() => {
    assert.equal(this.$('md-grid-tile-footer').length, 1);
  });
});
