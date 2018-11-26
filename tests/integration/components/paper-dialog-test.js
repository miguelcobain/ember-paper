import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, find, findAll, click, focus, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper-dialog', function(hooks) {
  setupRenderingTest(hooks);

  test('should render proper dialog wrapping selectors', async function(assert) {
    await render(hbs`
      {{paper-dialog}}
    `);

    let selectors = findAll('#ember-testing > .md-dialog-container md-dialog');

    assert.ok(selectors.length, 'has proper selector nesting');

  });

  test('should render empty dialog when blockless', async function(assert) {
    await render(hbs`
      {{paper-dialog}}
    `);

    let dialogContent = find('md-dialog').innerHTML
      .replace('<!--', '').replace('-->', '').trim();

    assert.equal(dialogContent, '', 'has an empty dialog container');
  });

  test('should yield content as a block component', async function(assert) {
    await render(hbs`
      {{#paper-dialog}}
        Lorem ipsum.
      {{/paper-dialog}}
    `);
    assert.dom('md-dialog').hasText('Lorem ipsum.');
  });

  test('should render in ember-testing if no parent is defined', async function(assert) {
    await render(hbs`
      {{paper-dialog}}
    `);
    assert.dom('#ember-testing md-dialog').exists({ count: 1 });
  });

  test('should render in specific wormhole if parent is defined', async function(assert) {
    await render(hbs`
      <div id="paper-wormhole"></div>
      <div id="sagittarius-a"></div>
      {{#paper-dialog parent="#sagittarius-a"}}
        So this is singularity, eh?
      {{/paper-dialog}}
    `);

    assert.dom('#paper-wormhole md-dialog').doesNotExist();
    assert.dom('#sagittarius-a md-dialog').exists();
    assert.dom('#ember-testing md-dialog').exists();

  });

  test('should only prevent scrolling behind scoped modal', async function(assert) {
    await render(hbs`
      <div id="sagittarius-a"></div>
      {{paper-dialog parent="#sagittarius-a"}}
    `);

    assert.equal(window.getComputedStyle(find('md-backdrop')).getPropertyValue('position'), 'absolute', 'backdrop is absolute');
  });

  test('backdrop is opaque by default', async function(assert) {
    await render(hbs`
      <div id="paper-wormhole"></div>
      {{paper-dialog}}
    `);
    assert.dom('md-backdrop').hasClass('md-opaque');
  });

  test('backdrop opaqueness can be disabled ', async function(assert) {
    await render(hbs`
      <div id="paper-wormhole"></div>
      {{paper-dialog opaque=false}}
    `);
    assert.dom('md-backdrop').doesNotHaveClass('md-opaque');
  });

  test('should prevent scrolling entirely behind fixed modal', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{paper-dialog}}
    `);

    assert.equal(find('md-backdrop').style.position, 'fixed', 'backdrop is fixed');
  });

  test('applies transitions when opening and closing', async function(assert) {
    await render(hbs`
      {{#if dialogOpen}}
        {{paper-dialog}}
      {{/if}}
    `);
    this.set('dialogOpen', true);

    let getDialogTransform = () => {
      let dialog = find('md-dialog');
      assert.ok(dialog, 'dialog found');
      return dialog && dialog.style.transform;
    };

    let dialogTransform = getDialogTransform();
    assert.ok(dialogTransform.includes('translate3d'), 'open translate was added');

    await settled();
    dialogTransform = getDialogTransform();
    assert.ok(!dialogTransform, 'open translate was removed');
    this.set('dialogOpen', false);

    await settled();
  });

  test('click outside should close dialog if clickOutsideToClose', async function(assert) {
    assert.expect(2);

    this.set('dialogOpen', true);
    this.set('closeDialog', () => {
      assert.ok(true, 'dialog closing handler fired');
    });

    await render(hbs`
      {{#if dialogOpen}}
        {{paper-dialog clickOutsideToClose=true onClose=closeDialog}}
      {{/if}}
    `);

    assert.dom('md-dialog').exists({ count: 1 });

    await click('.md-dialog-container');
  });

  test('click outside should not close dialog by default', async function(assert) {
    assert.expect(2);
    await render(hbs`
      {{paper-dialog}}
    `);

    assert.dom('md-dialog').exists();

    await click('.md-dialog-container');
    assert.dom('md-dialog').exists({ count: 1 });
  });

  test('dialog shouldn\'t swallow click events', async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{#paper-dialog clickOutsideToClose=true}}
        <button id="the-button">Go somewhere</button>
      {{/paper-dialog}}
    `);

    assert.dom('md-dialog').exists({ count: 1 });

    await click('#the-button');
    assert.dom('md-dialog').exists({ count: 1 });
  });

  test('has opt-in support for fullscreen at responsive breakpoint', async function(assert) {
    await render(hbs`
      {{paper-dialog fullscreen=true}}
    `);
    assert.dom('md-dialog').hasClass('md-dialog-fullscreen');
  });

  test('pressing escape triggers close action', async function(assert) {
    assert.expect(2);

    this.set('showDialog', true);
    this.set('closeDialog', () => {
      assert.ok(true, 'dialog closing handler fired');
    });

    await render(hbs`
      {{#if showDialog}}
        {{paper-dialog onClose=closeDialog}}
      {{/if}}
    `);

    assert.dom('md-dialog').exists({ count: 1 });

    await triggerKeyEvent('md-dialog', 'keydown', 27);
  });

  test('opening gives focus', async function(assert) {

    assert.expect(3);

    this.set('openDialog', () => {
      this.set('showDialog', true);
    });

    await render(hbs`
      {{#if showDialog}}
        {{#paper-dialog onClose=closeDialog origin="#theorigin"}}
          {{#paper-dialog-actions}}
            <button id="thedialogbutton">çup?</button>
          {{/paper-dialog-actions}}
        {{/paper-dialog}}
      {{/if}}
      <button id="theorigin" onclick={{action openDialog}}>
        The origin
      </button>
    `);

    await focus('#theorigin');
    assert.dom('#theorigin').isFocused();
    await click('#theorigin');

    await settled();
    assert.dom('#thedialogbutton').isFocused();
    this.set('showDialog', false);

    await settled();
    assert.dom('#theorigin').isFocused();
  });

  test('can specify dialog container classes', async function(assert) {
    await render(hbs`
      {{paper-dialog dialogContainerClass="flex-50 my-dialog-container"}}
    `);

    assert.dom('.md-dialog-container').hasClass('flex-50');
    assert.dom('.md-dialog-container').hasClass('my-dialog-container');
  });

  test('can specify dialog css classes', async function(assert) {
    await render(hbs`
      {{paper-dialog class="flex-50 my-dialog-inner"}}
    `);

    assert.dom('md-dialog').hasClass('flex-50');
    assert.dom('md-dialog').hasClass('my-dialog-inner');
  });
});
