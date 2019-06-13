import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper tabs', function(hooks) {
  setupRenderingTest(hooks);

  test('default active tab is the first', async function(assert) {
    await render(hbs`
      {{#paper-tabs as |tabs|}}
        {{tabs.tab}}
        {{tabs.tab}}
        {{tabs.tab}}
      {{/paper-tabs}}
    `);

    assert.dom('.md-tab:nth-child(1)').hasClass('md-active');
  });

  test('can set default selected tab', async function(assert) {
    await render(hbs`
      {{#paper-tabs selected=1 as |tabs|}}
        {{tabs.tab}}
        {{tabs.tab}}
        {{tabs.tab}}
      {{/paper-tabs}}
    `);

    assert.dom('.md-tab:nth-child(2)').hasClass('md-active');
  });

  test('block nav bar items renders block', async function(assert) {
    await render(hbs`
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

  test('can change selected tab using property', async function(assert) {
    this.selected = 1;

    await render(hbs`
      {{#paper-tabs selected=selected as |tabs|}}
        {{tabs.tab}}
        {{tabs.tab}}
        {{tabs.tab}}
      {{/paper-tabs}}
    `);

    assert.dom('.md-tab:nth-child(2)').hasClass('md-active');

    this.set('selected', 2);

    assert.dom('.md-tab:nth-child(3)').hasClass('md-active');

  });

  test('clicking on a tab sets it to active', async function(assert) {
    await render(hbs`
      {{#paper-tabs as |tabs|}}
        {{tabs.tab}}
        {{tabs.tab}}
        {{tabs.tab}}
      {{/paper-tabs}}
    `);

    await click('.md-tab:nth-child(3)');

    assert.dom('.md-tab:nth-child(3)').hasClass('md-active');
  });

  test('clicking on multiple tabs works', async function(assert) {
    await render(hbs`
      {{#paper-tabs as |tabs|}}
        {{tabs.tab}}
        {{tabs.tab}}
        {{tabs.tab}}
      {{/paper-tabs}}
    `);

    await click('.md-tab:nth-child(2)');
    await click('.md-tab:nth-child(3)');
    await click('.md-tab:nth-child(1)');

    assert.dom('.md-tab:nth-child(1)').hasClass('md-active');
  });

  test('onChange is triggered', async function(assert) {
    assert.expect(1);

    this.onChange = (index) => {
      assert.equal(index, 1);
    };

    await render(hbs`
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

    await render(hbs`
      {{#paper-tabs onChange=onChange as |tabs|}}
        {{tabs.tab}}
        {{tabs.tab}}
        {{tabs.tab onClick=onClick}}
      {{/paper-tabs}}
    `);

    await click('.md-tab:nth-child(3)');
  });

  test('has ink bar by default', async function(assert) {
    await render(hbs`
      {{#paper-tabs as |tabs|}}
        {{tabs.tab}}
        {{tabs.tab}}
        {{tabs.tab}}
      {{/paper-tabs}}
    `);

    assert.dom('md-ink-bar').exists();
  });

  test('noInkBar disables ink bar', async function(assert) {

    await render(hbs`
      {{#paper-tabs noInkBar=true as |tabs|}}
        {{tabs.tab}}
        {{tabs.tab}}
        {{tabs.tab}}
      {{/paper-tabs}}
    `);

    assert.dom('md-ink-bar').doesNotExist();
  });

  test('ink bar has md-left or md-right class', async function(assert) {
    await render(hbs`
        {{#paper-tabs as |tabs|}}
          {{tabs.tab name="Tab one"}}
          {{tabs.tab name="Tab two"}}
          {{tabs.tab name="Tab three"}}
        {{/paper-tabs}}
      `);

    assert.dom('md-ink-bar').hasClass('md-right');

    await click('.md-tab:nth-child(2)');

    assert.dom('md-ink-bar').hasClass('md-right');

    await click('.md-tab:nth-child(1)');

    assert.dom('md-ink-bar').hasClass('md-left');

  });

  test('borderBottom true adds border', async function(assert) {
    await render(hbs`
      {{#paper-tabs borderBottom=true as |tabs|}}
        {{tabs.tab}}
        {{tabs.tab}}
        {{tabs.tab}}
      {{/paper-tabs}}
    `);

    assert.ok(find('md-tabs').hasAttribute('md-border-bottom'));
  });

  test('stretch true adds correct class', async function(assert) {
    await render(hbs`
      {{#paper-tabs stretch=true as |tabs|}}
        {{tabs.tab}}
        {{tabs.tab}}
        {{tabs.tab}}
      {{/paper-tabs}}
    `);

    assert.dom('md-tabs-wrapper').hasClass('md-stretch-tabs');
  });

  test('using href renders anchor tags', async function(assert) {
    await render(hbs`
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

  test('using href renders anchor tags', async function(assert) {
    await render(hbs`
      {{#paper-tabs center=true as |tabs|}}
        {{tabs.tab}}
      {{/paper-tabs}}
    `);

    assert.dom('md-tabs-canvas').hasClass('md-center-tabs');
    assert.dom('md-pagination-wrapper').hasClass('md-center-tabs');
  });

  test('disabled tab cannot be accessed', async function(assert) {
    await render(hbs`
      {{#paper-tabs as |tabs|}}
        {{#tabs.tab}}
          one
        {{/tabs.tab}}
        {{#tabs.tab disabled=true}}
          two
        {{/tabs.tab}}
        {{#tabs.tab}}
          three
        {{/tabs.tab}}
      {{/paper-tabs}}
    `);

    await click('.md-tab:nth-child(2)');

    assert.dom('.md-tab:nth-child(1)').hasClass('md-active');
  });

  test('using href and disabled does not render anchor tags', async function(assert) {
    await render(hbs`
      {{#paper-tabs as |tabs|}}
        {{tabs.tab href="a"}}
        {{tabs.tab href="b" disabled=true}}
        {{tabs.tab href="c"}}
      {{/paper-tabs}}
    `);

    assert.notOk(find('.md-tab:nth-child(2)').hasAttribute('href'));
  });
});
