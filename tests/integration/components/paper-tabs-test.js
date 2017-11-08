import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, click, findAll } from 'ember-native-dom-helpers';

moduleForComponent('paper-tabs', 'Integration | Component | paper tabs', {
  integration: true
});

test('default active tab is the first', function(assert) {
  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{tabs.tab}}
      {{tabs.tab}}
      {{tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.ok(find('.md-tab:nth-child(1)').classList.contains('md-active'));
});

test('can set default selected tab', function(assert) {
  this.render(hbs`
    {{#paper-tabs selected=1 as |tabs|}}
      {{tabs.tab}}
      {{tabs.tab}}
      {{tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.ok(find('.md-tab:nth-child(2)').classList.contains('md-active'));
});

test('block nav bar items renders block', function(assert) {
  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab}}
        one
      {{/tabs.tab}}
      {{#tabs.tab}}
        two
      {{/tabs.tab}}
      {{#tabs.tab}}
        three
      {{/tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.ok(find('.md-tab:nth-child(1)').textContent, 'one');
  assert.ok(find('.md-tab:nth-child(2)').textContent, 'two');
  assert.ok(find('.md-tab:nth-child(3)').textContent, 'three');
});

test('can change selected tab using property', function(assert) {
  this.selected = 1;

  this.render(hbs`
    {{#paper-tabs selected=selected as |tabs|}}
      {{tabs.tab}}
      {{tabs.tab}}
      {{tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.ok(find('.md-tab:nth-child(2)').classList.contains('md-active'));

  this.set('selected', 2);

  assert.ok(find('.md-tab:nth-child(3)').classList.contains('md-active'));

});

test('clicking on a tab sets it to active', async function(assert) {
  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{tabs.tab}}
      {{tabs.tab}}
      {{tabs.tab}}
    {{/paper-tabs}}
  `);

  await click('.md-tab:nth-child(3)');

  assert.ok(find('.md-tab:nth-child(3)').classList.contains('md-active'));
});

test('clicking on multiple tabs works', async function(assert) {
  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{tabs.tab}}
      {{tabs.tab}}
      {{tabs.tab}}
    {{/paper-tabs}}
  `);

  await click('.md-tab:nth-child(2)');
  await click('.md-tab:nth-child(3)');
  await click('.md-tab:nth-child(1)');

  assert.ok(find('.md-tab:nth-child(1)').classList.contains('md-active'));
});

test('onChange is triggered', async function(assert) {
  assert.expect(1);

  this.onChange = (index) => {
    assert.equal(index, 1);
  };

  this.render(hbs`
    {{#paper-tabs onChange=onChange as |tabs|}}
      {{tabs.tab}}
      {{tabs.tab}}
      {{tabs.tab}}
    {{/paper-tabs}}
  `);

  await click('.md-tab:nth-child(2)');
});

test('item onClick is triggered', async function(assert) {
  assert.expect(1);

  this.onClick = () => {
    assert.ok(true);
  };

  this.render(hbs`
    {{#paper-tabs onChange=onChange as |tabs|}}
      {{tabs.tab}}
      {{tabs.tab}}
      {{tabs.tab onClick=onClick}}
    {{/paper-tabs}}
  `);

  await click('.md-tab:nth-child(3)');
});

test('has ink bar by default', function(assert) {
  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{tabs.tab}}
      {{tabs.tab}}
      {{tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.ok(find('md-ink-bar'));
});

test('noInkBar disables ink bar', function(assert) {

  this.render(hbs`
    {{#paper-tabs noInkBar=true as |tabs|}}
      {{tabs.tab}}
      {{tabs.tab}}
      {{tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.notOk(find('md-ink-bar'));
});

test('borderBottom true adds border', function(assert) {
  this.render(hbs`
    {{#paper-tabs borderBottom=true as |tabs|}}
      {{tabs.tab}}
      {{tabs.tab}}
      {{tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.ok(find('md-tabs').hasAttribute('md-border-bottom'));
});

test('stretch true adds correct class', function(assert) {
  this.render(hbs`
    {{#paper-tabs stretch=true as |tabs|}}
      {{tabs.tab}}
      {{tabs.tab}}
      {{tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.ok(find('md-tabs-wrapper').classList.contains('md-stretch-tabs'));
});

test('using href renders anchor tags', function(assert) {
  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{tabs.tab href="a"}}
      {{tabs.tab href="b"}}
      {{tabs.tab href="c"}}
    {{/paper-tabs}}
  `);

  let tabs = findAll('a.md-tab');
  assert.equal(tabs.length, 3);
  tabs.forEach((t) => {
    assert.ok(t.hasAttribute('href'));
  });
});

test('using href renders anchor tags', function(assert) {
  this.render(hbs`
    {{#paper-tabs center=true as |tabs|}}
      {{tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.ok(find('md-tabs-canvas').classList.contains('md-center-tabs'));
  assert.ok(find('md-pagination-wrapper').classList.contains('md-center-tabs'));
});
