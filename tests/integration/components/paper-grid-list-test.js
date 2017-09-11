import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll, waitUntil } from 'ember-native-dom-helpers';

const { A } = Ember;

function tilePosition(selector) {
  let el = find(selector);
  let style = getComputedStyle(el);
  let left = style.getPropertyValue('left');

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

  assert.equal(this.$('md-grid-tile').length, 1);
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

  assert.equal(findAll('md-grid-tile-footer').length, 1);
});

test('it recalculates when tile is added', async function(assert) {
  assert.expect(7);

  this.set('tiles', A(['ONE', 'TWO', 'THREE']));

  this.render(hbs`
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

  await waitUntil(() => find('.THREE'));
  assert.equal(tilePosition('.ONE'), 1);
  assert.equal(tilePosition('.TWO'), 2);
  assert.equal(tilePosition('.THREE'), 3);

  this.get('tiles').insertAt(2, 'FOUR');

  await waitUntil(() => find('.FOUR'));

  assert.equal(tilePosition('.ONE'), 1, 'ONE');
  assert.equal(tilePosition('.TWO'), 2, 'TWO');
  assert.equal(tilePosition('.FOUR'), 3, 'FOUR');
  assert.equal(tilePosition('.THREE'), 4, 'THREE');
});

test('it recalculates when tile is removed', async function(assert) {
  assert.expect(6);

  this.set('tiles', A(['ONE', 'TWO', 'THREE']));

  this.render(hbs`
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

  await waitUntil(() => find('.THREE'));
  assert.equal(tilePosition('.ONE'), 1);
  assert.equal(tilePosition('.TWO'), 2);
  assert.equal(tilePosition('.THREE'), 3);

  this.get('tiles').removeAt(1);

  await waitUntil(() => !find('.TWO'));
  assert.equal(find('.TWO'), null);
  assert.equal(tilePosition('.ONE'), 1);
  assert.equal(tilePosition('.THREE'), 2);
});

test('it reorders tiles when dom order changes', async function(assert) {
  assert.expect(6);

  this.set('tiles', A(['ONE', 'TWO', 'THREE']));

  this.render(hbs`
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

  await waitUntil(() => find('.THREE'));
  assert.equal(tilePosition('.ONE'), 1);
  assert.equal(tilePosition('.TWO'), 2);
  assert.equal(tilePosition('.THREE'), 3);

  this.get('tiles').reverseObjects();

  assert.equal(tilePosition('.ONE'), 3);
  assert.equal(tilePosition('.TWO'), 2);
  assert.equal(tilePosition('.THREE'), 1);
});
