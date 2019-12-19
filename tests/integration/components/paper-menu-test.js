import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, click, findAll, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper-menu', function(hooks) {
  setupRenderingTest(hooks);

  test('opens on click', async function(assert) {
    assert.expect(1);
    await render(hbs`
      {{#paper-menu as |menu|}}
        {{#menu.trigger}}
          {{#paper-button iconButton=true}}
            {{paper-icon "local_phone"}}
          {{/paper-button}}
        {{/menu.trigger}}
        {{#menu.content width=4 as |content|}}
          {{#content.menu-item}}
            <span id="menu-item">Test</span>
          {{/content.menu-item}}
        {{/menu.content}}
      {{/paper-menu}}
    `);

    await settled();
    await click('.ember-basic-dropdown-trigger');
    await settled();
    assert.dom('.md-open-menu-container').exists({ count: 1 });
    await settled();

  });

  test('backdrop removed if menu closed', async function(assert) {
    assert.expect(2);
    await render(hbs`
      {{#paper-menu as |menu|}}
        {{#menu.trigger}}
          {{#paper-button iconButton=true}}
            {{paper-icon "local_phone"}}
          {{/paper-button}}
        {{/menu.trigger}}
        {{#menu.content width=4 as |content|}}
            {{#content.menu-item}}
              <span id="menu-item">Test</span>
            {{/content.menu-item}}
        {{/menu.content}}
      {{/paper-menu}}
    `);

    await settled();
    await click('.ember-basic-dropdown-trigger');
    await settled();
    assert.dom('.md-open-menu-container').exists({ count: 1 });
    await click('.ember-basic-dropdown-trigger');
    await settled();
    assert.dom('.md-backdrop').doesNotExist();

  });

  test('backdrop removed if backdrop clicked', async function(assert) {
    assert.expect(2);
    await render(hbs`
      {{#paper-menu as |menu|}}
        {{#menu.trigger}}
          {{#paper-button iconButton=true}}
            {{paper-icon "local_phone"}}
          {{/paper-button}}
        {{/menu.trigger}}
        {{#menu.content width=4 as |content|}}
          {{#content.menu-item}}
            <span id="menu-item">Test</span>
          {{/content.menu-item}}
        {{/menu.content}}
      {{/paper-menu}}
    `);

    await settled();
    await click('.ember-basic-dropdown-trigger');
    await settled();
    assert.dom('.md-open-menu-container').exists({ count: 1 });
    await click('md-backdrop');
    await settled();
    assert.dom('.md-backdrop').doesNotExist();

  });

  test('keydown changes focused element', async function(assert) {
    assert.expect(3);

    this.openSomething = () => {};

    await render(hbs`
      {{#paper-menu as |menu|}}
        {{#menu.trigger}}
          {{#paper-button iconButton=true}}
            {{paper-icon "local_phone"}}
          {{/paper-button}}
        {{/menu.trigger}}
        {{#menu.content width=4 as |content|}}
            {{#content.menu-item onClick=(action this.openSomething)}}
              <span id="menu-item">Test</span>
            {{/content.menu-item}}
            {{#content.menu-item onClick=(action this.openSomething)}}
              <span id="menu-item2">Test 2</span>
            {{/content.menu-item}}
        {{/menu.content}}
      {{/paper-menu}}
    `);

    await settled();
    await click('.ember-basic-dropdown-trigger');
    await settled();

    let selectors = findAll('md-menu-item');
    assert.dom(selectors[0].firstElementChild).hasClass('md-focused');

    let menu = findAll('md-menu-content');
    await triggerKeyEvent(menu[0].firstElementChild, 'keydown', 40);

    await settled();

    let first = selectors[0].firstElementChild;
    let second = selectors[1].firstElementChild;

    assert.ok(second.classList.contains('md-focused') && !first.classList.contains('md-focused'), 'focus has changed to second item');

    await triggerKeyEvent(selectors[1].firstElementChild, 'keydown', 38);

    await settled();

    first = selectors[0].firstElementChild;
    second = selectors[1].firstElementChild;

    assert.ok(!second.classList.contains('md-focused') && first.classList.contains('md-focused'), 'focus has changed to first item');
  });

  test('md-menu doesn\'t have a tabindex attribute', async function(assert) {
    await render(hbs`
      {{#paper-menu as |menu|}}
        {{#menu.trigger}}
          {{#paper-button iconButton=true}}
            {{paper-icon "local_phone"}}
          {{/paper-button}}
        {{/menu.trigger}}
        {{#menu.content width=4 as |content|}}
            {{#content.menu-item onClick=(action this.openSomething)}}
              <span id="menu-item">Test</span>
            {{/content.menu-item}}
            {{#content.menu-item onClick=(action this.openSomething)}}
              <span id="menu-item2">Test 2</span>
            {{/content.menu-item}}
        {{/menu.content}}
      {{/paper-menu}}
    `);
    assert.dom('md-menu').hasAttribute('tabindex', '-1');
  });
});
