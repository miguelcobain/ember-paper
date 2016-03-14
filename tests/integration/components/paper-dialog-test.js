import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-dialog', 'Integration | Component | paper dialog', {
  integration: true
});

test('should render proper dialog wrapping selectors', function(assert) {
  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{paper-dialog}}
  `);

  let selectors = this.$()
    .find('#paper-wormhole')
    .find('.md-dialog-container')
    .find('md-dialog');

  assert.ok(selectors.length, 'has proper selector nesting');
});

test('should render empty dialog when blockless', function(assert) {
  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{paper-dialog}}
  `);

  let dialogContent = this.$().find('md-dialog').html().trim();

  assert.equal(dialogContent, '<!---->', 'has an empty dialog container');
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

  assert.ok(this.$().find('#paper-wormhole').find('md-dialog'), 'rendered in default');
});

test('should render in specific wormhole if parent is defined', function(assert) {
  this.render(hbs`
    <div id="paper-wormhole"></div>
    <div id="sagittarius-a"></div>
    {{#paper-dialog parent="sagittarius-a"}}
      So this is singularity, eh?
    {{/paper-dialog}}
  `);

  assert.ok(!this.$().find('#paper-wormhole').find('md-dialog').length, 'did not render in default');
  assert.ok(this.$().find('#sagittarius-a').find('md-dialog').length, 'rendered in parent');
});

test('should only prevent scrolling behind scoped modal', function(assert) {
  this.render(hbs`
    <div id="sagittarius-a"></div>
    {{paper-dialog parent="sagittarius-a"}}
  `);

  let backdrop = this.$().find('#sagittarius-a').find('md-backdrop');

  assert.equal(backdrop.css('position'), 'absolute', 'backdrop is absolute');
});

test('should prevent scrolling entirely behind fixed modal', function(assert) {
  assert.expect(1);

  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{paper-dialog}}
  `);

  let backdrop = this.$().find('#paper-wormhole').find('md-backdrop');

  assert.equal(
    backdrop.css('position'), 'fixed', 'backdrop is fixed'
  );
});

test('should render transition when openFrom is defined', function(assert) {
  /* to test */
  assert.ok(1);
});

test('click outside should close dialog if clickOutsideToClose', function(assert) {
  assert.expect(2);

  this.set('showDialog', true);
  this.set('closeDialog', function() {
    assert.ok(!this.$().find('md-dialog').length, 'dialog closing handler');
  });

  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{#if showDialog}}
      {{paper-dialog clickOutsideToClose=true onClose=closeDialog}}
    {{/if}}
  `);

  assert.ok(this.$().find('md-dialog').length, 'dialog is showing');

  this.$().find('.md-dialog-container').click();
});

test('click outside should not close dialog if not clickOutsideToClose', function(assert) {
  assert.expect(2);
  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{paper-dialog}}
  `);

  assert.ok(this.$().find('md-dialog').length, 'dialog is showing');

  this.$().find('.md-dialog-container').click();
  assert.ok(this.$().find('md-dialog').length, 'dialog is still showing');
});

test('has opt-in support for fullscreen at responsive breakpoint', function(assert) {
  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{paper-dialog fullscreen=true}}
  `);

  let dialog = this.$().find('#paper-wormhole').find('md-dialog');

  assert.ok(dialog.hasClass('md-dialog-fullscreen'), 'has class for fullscreen');
});

test('pressing escape closes the dialog', function(assert) {
  assert.expect(2);
  let done = assert.async();

  this.set('showDialog', true);
  this.set('closeDialog', function() {
    assert.ok(!this.$().find('md-dialog').length, 'dialog closing handler');
    done();
  });

  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{#if showDialog}}
      {{paper-dialog onClose=closeDialog}}
    {{/if}}
  `);

  assert.ok(this.$().find('md-dialog'), 'dialog is showing');

  let event = new Ember.$.Event('keyup');
  event.keyCode = 27;
  this.$(window).trigger(event);
});
