import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, waitUntil } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { run } from '@ember/runloop';
import { A } from '@ember/array';

function getStyle(selector, property) {
  let el = find(selector);
  let style = getComputedStyle(el);
  return style.getPropertyValue(property);
}

function tilePosition(selector) {
  let left = getStyle(selector, 'left');

  switch (left) {
    case '0px':
      return 1;
    case '50px':
      return 2;
    case '100px':
      return 3;
    case '150px':
      return 4;
    default:
      return 'grid sizing wrong: grid not ready yet?';
  }
}

function tileRow(selector) {
  let marginTop = getStyle(selector, 'margin-top');

  switch (marginTop) {
    case '0px':
      return 1;
    case '150.25px':
      return 2;
    case '300.5px':
      return 3;
    default:
      return 'grid sizing wrong: grid not ready yet?';
  }
}

function createTiles() {
  return A(['ONE', 'TWO', 'THREE']);
}

module('Integration | Component | paper-grid-list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders tiles with tag name', async function(assert) {
    assert.expect(1);
    await render(hbs`
      {{#paper-grid-list cols="1" rowHeight="4:3" as |grid|}}
        {{#grid.tile}}
        {{/grid.tile}}
      {{/paper-grid-list}}
    `);

    assert.dom('md-grid-tile').exists({ count: 1 });
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

    assert.dom('md-grid-tile-footer').exists({ count: 1 });
  });

  test('it applies a gutter', async function(assert) {
    assert.expect(1);
    this.set('tiles', createTiles());

    await render(hbs`
      <div style="width:199px;">
        {{#paper-grid-list gutter="20px" cols="3" rowHeight="4:3" as |grid|}}
          {{#each tiles as |item|}}
            {{#grid.tile class=item as |tile|}}
              {{item}}
            {{/grid.tile}}
          {{/each}}
        {{/paper-grid-list}}
      </div>
    `);

    assert.equal(getStyle('.TWO', 'left'), '72.9844px');
  });

  test('it applies a fixed row height', async function(assert) {
    assert.expect(1);
    this.set('tiles', createTiles());

    await render(hbs`
      <div style="width:199px;">
        {{#paper-grid-list cols="3" rowHeight="75px" as |grid|}}
          {{#each tiles as |item|}}
            {{#grid.tile class=item as |tile|}}
              {{item}}
            {{/grid.tile}}
          {{/each}}
        {{/paper-grid-list}}
      </div>
    `);

    assert.equal(getStyle('.TWO', 'height'), '75px');
  });

  test('it applies a row height ratio', async function(assert) {
    assert.expect(2);
    this.set('tiles', createTiles());

    await render(hbs`
      <div style="width:200px;">
        {{#paper-grid-list cols="2" rowHeight="2:1" as |grid|}}
          {{#each tiles as |item|}}
            {{#grid.tile class=item as |tile|}}
              {{item}}
            {{/grid.tile}}
          {{/each}}
        {{/paper-grid-list}}
      </div>
    `);

    assert.equal(getStyle('.TWO', 'height'), '49.5px');
    assert.equal(getStyle('.TWO', 'width'), '99.5px');
  });

  test('it applies a row height fit', async function(assert) {
    assert.expect(1);
    this.set('tiles', createTiles());

    await render(hbs`
      <div style="width:200px;height:120px;">
        {{#paper-grid-list cols="1" rowHeight="fit" as |grid|}}
          {{#each tiles as |item|}}
            {{#grid.tile class=item as |tile|}}
              {{item}}
            {{/grid.tile}}
          {{/each}}
        {{/paper-grid-list}}
      </div>
    `);

    assert.equal(getStyle('.TWO', 'height').substr(0, 2), '39');
  });

  test('it applies tile colspan', async function(assert) {
    assert.expect(1);
    this.set('tiles', createTiles());

    await render(hbs`
      <div style="width:199px;">
        {{#paper-grid-list cols="3" rowHeight="4:3" as |grid|}}
          {{#grid.tile colspan="3" class="COLSPAN" as |tile|}}
            COLSPAN
          {{/grid.tile}}
          {{#each tiles as |item|}}
            {{#grid.tile class=item as |tile|}}
              {{item}}
            {{/grid.tile}}
          {{/each}}
        {{/paper-grid-list}}
      </div>
    `);

    assert.equal(getStyle('.COLSPAN', 'width'), '199px');
  });

  test('it applies tile rowspan', async function(assert) {
    assert.expect(2);
    this.set('tiles', createTiles());

    await render(hbs`
      <div style="width:199px;">
        {{#paper-grid-list cols="1" rowHeight="4:3" as |grid|}}
          {{#grid.tile rowspan="2" class="ROWSPAN" as |tile|}}
            ROWSPAN
          {{/grid.tile}}
          {{#each tiles as |item|}}
            {{#grid.tile class=item as |tile|}}
              {{item}}
            {{/grid.tile}}
          {{/each}}
        {{/paper-grid-list}}
      </div>
    `);

    assert.equal(getStyle('.ONE', 'height'), '149.25px');
    assert.equal(getStyle('.ROWSPAN', 'height'), '299.5px');
  });

  test('it recalculates when cols changes', async function(assert) {
    assert.expect(6);
    this.set('tiles', createTiles());
    this.set('cols', 1);

    await render(hbs`
      <div style="width:199px;">
        {{#paper-grid-list cols=cols rowHeight="4:3" as |grid|}}
          {{#each tiles as |item|}}
            {{#grid.tile class=item as |tile|}}
              {{item}}
            {{/grid.tile}}
          {{/each}}
        {{/paper-grid-list}}
      </div>
    `);

    assert.equal(tileRow('.ONE'), 1);
    assert.equal(tileRow('.TWO'), 2);
    assert.equal(tileRow('.THREE'), 3);

    this.set('cols', 3);
    await waitUntil(() => find('.THREE'));

    assert.equal(tileRow('.ONE'), 1, 'ONE');
    assert.equal(tileRow('.TWO'), 1, 'TWO');
    assert.equal(tileRow('.THREE'), 1, 'THREE');
  });

  test('it recalculates when tile is added', async function(assert) {
    assert.expect(7);
    this.set('tiles', createTiles());

    await render(hbs`
      <div style="width:199px;">
        {{#paper-grid-list cols="4" rowHeight="4:3" as |grid|}}
          {{#each tiles as |item|}}
            {{#grid.tile class=item as |tile|}}
              {{item}}
            {{/grid.tile}}
          {{/each}}
        {{/paper-grid-list}}
      </div>
    `);

    assert.equal(tilePosition('.ONE'), 1);
    assert.equal(tilePosition('.TWO'), 2);
    assert.equal(tilePosition('.THREE'), 3);

    run(() => this.get('tiles').insertAt(2, 'FOUR'));
    await waitUntil(() => find('.FOUR'));

    assert.equal(tilePosition('.ONE'), 1, 'ONE');
    assert.equal(tilePosition('.TWO'), 2, 'TWO');
    assert.equal(tilePosition('.FOUR'), 3, 'FOUR');
    assert.equal(tilePosition('.THREE'), 4, 'THREE');
  });

  test('it recalculates when tile is removed', async function(assert) {
    assert.expect(6);
    this.set('tiles', createTiles());

    await render(hbs`
      <div style="width:199px;">
        {{#paper-grid-list cols="4" rowHeight="4:3" as |grid|}}
          {{#each tiles as |item|}}
            {{#grid.tile class=item as |tile|}}
              {{item}}
            {{/grid.tile}}
          {{/each}}
        {{/paper-grid-list}}
      </div>
    `);

    assert.equal(tilePosition('.ONE'), 1);
    assert.equal(tilePosition('.TWO'), 2);
    assert.equal(tilePosition('.THREE'), 3);

    run(() => this.get('tiles').removeAt(1));
    await waitUntil(() => !find('.TWO'));

    assert.equal(find('.TWO'), null);
    assert.equal(tilePosition('.ONE'), 1);
    assert.equal(tilePosition('.THREE'), 2);
  });

  test('it reorders tiles when dom order changes', async function(assert) {
    assert.expect(6);
    this.set('tiles', createTiles());

    await render(hbs`
      <div style="width:199px;">
        {{#paper-grid-list cols="4" rowHeight="4:3" as |grid|}}
          {{#each tiles as |item|}}
            {{#grid.tile class=item as |tile|}}
              {{item}}
            {{/grid.tile}}
          {{/each}}
        {{/paper-grid-list}}
      </div>
    `);

    assert.equal(tilePosition('.ONE'), 1);
    assert.equal(tilePosition('.TWO'), 2);
    assert.equal(tilePosition('.THREE'), 3);

    run(() => this.get('tiles').reverseObjects());
    await waitUntil(() => find('.TWO'));

    assert.equal(tilePosition('.ONE'), 3);
    assert.equal(tilePosition('.TWO'), 2);
    assert.equal(tilePosition('.THREE'), 1);
  });
});
