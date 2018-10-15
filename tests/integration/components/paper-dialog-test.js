import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, find, findAll, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';ç

module('Integration | Component | paper dialog', function(hooks) {
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

    let dialogContent = find('md-dialog').innerHTML.trim();

    assert.equal(dialogContent, 'Lorem ipsum.', 'yielded dialog content');
  });

  test('should render in ember-testing if no parent is defined', async function(assert) {
    await render(hbs`
      {{paper-dialog}}
    `);

    assert.ok(find('#ember-testing md-dialog'), 'rendered in default');
  });

  test('should render in specific wormhole if parent is defined', async function(assert) {
    await render(hbs`
      <div id="paper-wormhole"></div>
      <div id="sagittarius-a"></div>
      {{#paper-dialog parent="#sagittarius-a"}}
        So this is singularity, eh?
      {{/paper-dialog}}
    `);

    assert.ok(!find('#paper-wormhole md-dialog'), 'did not render in default');
    assert.ok(find('#sagittarius-a md-dialog'), 'rendered in parent');
    assert.ok(find('#ember-testing md-dialog'), 'still rendered in ember-testing');
  });

  test('should only prevent scrolling behind scoped modal', async function(assert) {
    await render(hbs`
      <div id="sagittarius-a"></div>
      {{paper-dialog parent="#sagittarius-a"}}
    `);

    assert.equal(find('md-backdrop').style.position, 'absolute', 'backdrop is absolute');
  });

  test('backdrop is opaque by default', async function(assert) {
    await render(hbs`
      <div id="paper-wormhole"></div>
      {{paper-dialog}}
    `);

    assert.ok(find('md-backdrop').classList.contains('md-opaque'), 'backdrop is opaque');
  });

  test('backdrop opaqueness can be disabled ', async function(assert) {
    await render(hbs`
      <div id="paper-wormhole"></div>
      {{paper-dialog opaque=false}}
    `);

    assert.notOk(find('md-backdrop').classList.contains('md-opaque'), 'backdrop is not opaque');
  });

  test('should prevent scrolling entirely behind fixed modal', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{paper-dialog}}
    `);

    assert.equal(
      find('md-backdrop').style.position, 'fixed', 'backdrop is fixed'
    );
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
      return dialog && (dialog.style.webkitTransform || dialog.style.transform);
    };

    let dialogTransform = getDialogTransform();
    assert.ok(dialogTransform.indexOf('translate3d') !== -1, 'open translate was added');

    return settled().then(() => {
      let dialogTransform = getDialogTransform();
      assert.ok(!dialogTransform, 'open translate was removed');
      this.set('dialogOpen', false);

      return settled();
    }).then(() => {
      // TODO test that close translate is applied
      // let dialogTransform = getDialogTransform();
      // assert.ok(dialogTransform.indexOf('translate3d') !== -1, 'close translate was added');
    });
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

    assert.ok(find('md-dialog'), 'dialog is showing');

    click(find('.md-dialog-container'));
  });

  test('click outside should not close dialog by default', async function(assert) {
    assert.expect(2);
    await render(hbs`
      {{paper-dialog}}
    `);

    assert.ok(find('md-dialog'), 'dialog is showing');

    click(find('.md-dialog-container'));
    assert.ok(find('md-dialog'), 'dialog is still showing');
  });

  test('dialog shouldn\'t swallow click events', async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{#paper-dialog clickOutsideToClose=true}}
        <button id="the-button">Go somewhere</button>
      {{/paper-dialog}}
    `);

    assert.ok(find('md-dialog'), 'dialog is showing');

    click(find('#the-button'));
    assert.ok(find('md-dialog'), 'dialog is still showing');
  });

  test('has opt-in support for fullscreen at responsive breakpoint', async function(assert) {
    await render(hbs`
      {{paper-dialog fullscreen=true}}
    `);

    assert.ok(find('md-dialog').classList.contains('md-dialog-fullscreen'), 'has class for fullscreen');
  });

  test('pressing escape triggers close action', async function(assert) {
    assert.expect(2);
    let done = assert.async();

    this.set('showDialog', true);
    this.set('closeDialog', () => {
      assert.ok(true, 'dialog closing handler fired');
      done();
    });

    await render(hbs`
      {{#if showDialog}}
        {{paper-dialog onClose=closeDialog}}
      {{/if}}
    `);

    assert.ok(find('md-dialog'), 'dialog is showing');

    let event = new Event("keydown");
    event.keyCode = 27;
    
    find('md-dialog').dispatchEvent(event);

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

    focus('#theorigin')
    assert.equal(document.activeElement, find('#theorigin'));
    click('#theorigin')

    let done = assert.async();

    return settled().then(() => {
      assert.equal(document.activeElement, find('#thedialogbutton'));
      this.set('showDialog', false);

      return settled();
    }).then(() => {
      assert.equal(document.activeElement, find('#theorigin'));
      done();
    });

  });

  test('can specify dialog container classes', async function(assert) {
    await render(hbs`
      {{paper-dialog dialogContainerClass="flex-50 my-dialog-container"}}
    `);

    assert.ok(find('.md-dialog-container').classList.contains('flex-50'), 'has flex-50 css class');
    assert.ok(find('.md-dialog-container').classList.contains('my-dialog-container'), 'has my-dialog-container css class');
  });

  test('can specify dialog css classes', async function(assert) {
    await render(hbs`
      {{paper-dialog class="flex-50 my-dialog-inner"}}
    `);

    assert.ok(find('md-dialog').classList.contains('flex-50'), 'has flex-50 css class');
    assert.ok(find('md-dialog').classList.contains('my-dialog-inner'), 'has my-dialog-inner css class');
  });
});
