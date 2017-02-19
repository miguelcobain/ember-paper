import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import $ from 'jquery';

moduleForComponent('paper-dialog', 'Integration | Component | paper dialog', {
  integration: true
});

test('should render proper dialog wrapping selectors', function(assert) {
  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{paper-dialog}}
  `);

  let selectors = this.$('#paper-wormhole .md-dialog-container md-dialog');

  assert.ok(selectors.length, 'has proper selector nesting');

});

test('should render empty dialog when blockless', function(assert) {
  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{paper-dialog}}
  `);

  let dialogContent = this.$().find('md-dialog').html()
    .replace('<!--', '').replace('-->', '').trim();

  assert.equal(dialogContent, '', 'has an empty dialog container');
});

test('should yield content as a block component', function(assert) {
  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{#paper-dialog}}
      Lorem ipsum.
    {{/paper-dialog}}
  `);

  let dialogContent = this.$().find('md-dialog').html().trim();

  assert.equal(dialogContent, 'Lorem ipsum.', 'yielded dialog content');
});

test('should render in default wormhole if no parent is defined', function(assert) {
  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{paper-dialog}}
  `);

  assert.ok(this.$().find('#paper-wormhole md-dialog'), 'rendered in default');
});

test('should render in specific wormhole if parent is defined', function(assert) {
  this.render(hbs`
    <div id="paper-wormhole"></div>
    <div id="sagittarius-a"></div>
    {{#paper-dialog parent="#sagittarius-a"}}
      So this is singularity, eh?
    {{/paper-dialog}}
  `);

  assert.ok(!this.$('#paper-wormhole md-dialog').length, 'did not render in default');
  assert.ok(this.$('#sagittarius-a md-dialog').length, 'rendered in parent');
});

test('should only prevent scrolling behind scoped modal', function(assert) {
  this.render(hbs`
    <div id="sagittarius-a"></div>
    {{paper-dialog parent="#sagittarius-a"}}
  `);

  assert.equal(this.$('md-backdrop').css('position'), 'absolute', 'backdrop is absolute');
});

test('should prevent scrolling entirely behind fixed modal', function(assert) {
  assert.expect(1);

  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{paper-dialog}}
  `);

  assert.equal(
    this.$('md-backdrop').css('position'), 'fixed', 'backdrop is fixed'
  );
});

test('applies transitions when opening and closing', function(assert) {
  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{#if dialogOpen}}
      {{paper-dialog}}
    {{/if}}
  `);
  this.set('dialogOpen', true);

  let getDialogTransform = () => {
    let dialog = this.$('md-dialog').get(0);
    assert.ok(dialog, 'dialog found');
    return dialog && (dialog.style.webkitTransform || dialog.style.transform);
  };

  let dialogTransform = getDialogTransform();
  assert.ok(dialogTransform.indexOf('translate3d') !== -1, 'open translate was added');

  return wait().then(() => {
    let dialogTransform = getDialogTransform();
    assert.ok(!dialogTransform, 'open translate was removed');
    this.set('dialogOpen', false);

    return wait();
  }).then(() => {
    // TODO test that close translate is applied
    // let dialogTransform = getDialogTransform();
    // assert.ok(dialogTransform.indexOf('translate3d') !== -1, 'close translate was added');
  });
});

test('click outside should close dialog if clickOutsideToClose', function(assert) {
  assert.expect(2);

  this.set('dialogOpen', true);
  this.set('closeDialog', () => {
    assert.ok(true, 'dialog closing handler fired');
  });

  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{#if dialogOpen}}
      {{paper-dialog clickOutsideToClose=true onClose=closeDialog}}
    {{/if}}
  `);

  assert.ok(this.$('md-dialog').length, 'dialog is showing');

  this.$('.md-dialog-container').mousedown().mouseup().click();
});

test('click outside should not close dialog by default', function(assert) {
  assert.expect(2);
  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{paper-dialog}}
  `);

  assert.ok(this.$('md-dialog').length, 'dialog is showing');

  this.$('.md-dialog-container').mousedown().mouseup().click();
  assert.ok(this.$('md-dialog').length, 'dialog is still showing');
});

test('dialog shouldn\'t swallow click events', function(assert) {
  assert.expect(3);

  this.$().click(() => {
    assert.ok(true, 'click event bubbled up');
  });

  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{#paper-dialog clickOutsideToClose=true}}
      <button id="the-button">Go somewhere</button>
    {{/paper-dialog}}
  `);

  assert.ok(this.$('md-dialog').length, 'dialog is showing');

  this.$('#the-button').mousedown().mouseup().click();
  assert.ok(this.$('md-dialog').length, 'dialog is still showing');
});

test('has opt-in support for fullscreen at responsive breakpoint', function(assert) {
  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{paper-dialog fullscreen=true}}
  `);

  assert.ok(this.$('md-dialog').hasClass('md-dialog-fullscreen'), 'has class for fullscreen');
});

test('pressing escape triggers close action', function(assert) {
  assert.expect(2);
  let done = assert.async();

  this.set('showDialog', true);
  this.set('closeDialog', () => {
    assert.ok(true, 'dialog closing handler fired');
    done();
  });

  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{#if showDialog}}
      {{paper-dialog onClose=closeDialog}}
    {{/if}}
  `);

  assert.ok(this.$('md-dialog'), 'dialog is showing');

  let event = new $.Event('keydown');
  event.keyCode = 27;
  this.$('md-dialog').trigger(event);

});

test('opening gives focus', function(assert) {
  assert.expect(3);

  this.set('openDialog', () => {
    this.set('showDialog', true);
  });

  this.render(hbs`
    <div id="paper-wormhole"></div>
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

  this.$('#theorigin').focus();
  assert.equal(document.activeElement, this.$('#theorigin').get(0));
  this.$('#theorigin').click();

  let done = assert.async();

  return wait().then(() => {
    assert.equal(document.activeElement, this.$('#thedialogbutton').get(0));
    this.set('showDialog', false);

    return wait();
  }).then(() => {
    assert.equal(document.activeElement, this.$('#theorigin').get(0));
    done();
  });

});

test('can specify dialog container classes', function(assert) {
  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{paper-dialog dialogContainerClass="flex-50 my-dialog-container"}}
  `);

  assert.ok(this.$('.md-dialog-container').hasClass('flex-50'), 'has flex-50 css class');
  assert.ok(this.$('.md-dialog-container').hasClass('my-dialog-container'), 'has my-dialog-container css class');
});

test('can specify dialog css classes', function(assert) {
  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{paper-dialog class="flex-50 my-dialog-inner"}}
  `);

  assert.ok(this.$('md-dialog').hasClass('flex-50'), 'has flex-50 css class');
  assert.ok(this.$('md-dialog').hasClass('my-dialog-inner'), 'has my-dialog-inner css class');
});
