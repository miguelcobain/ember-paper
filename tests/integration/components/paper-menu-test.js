import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import run from 'ember-runloop';
import $ from 'jquery';

moduleForComponent('paper-menu', 'Integration | Component | paper menu', {
  integration: true
});

function focus(el) {
  if (!el) {
    return;
  }
  let $el = $(el);
  if ($el.is(':input, [contenteditable=true]')) {
    let type = $el.prop('type');
    if (type !== 'checkbox' && type !== 'radio' && type !== 'hidden') {
      run(null, function() {
        // Firefox does not trigger the `focusin` event if the window
        // does not have focus. If the document doesn't have focus just
        // use trigger('focusin') instead.

        if (!document.hasFocus || document.hasFocus()) {
          el.focus();
        } else {
          $el.trigger('focusin');
        }
      });
    }
  }
}

function nativeClick(selector, options = {}) {
  let mousedown = new window.Event('mousedown', { bubbles: true, cancelable: true, view: window });
  let mouseup = new window.Event('mouseup', { bubbles: true, cancelable: true, view: window });
  let click = new window.Event('click', { bubbles: true, cancelable: true, view: window });
  Object.keys(options).forEach((key) => {
    mousedown[key] = options[key];
    mouseup[key] = options[key];
    click[key] = options[key];
  });
  let element = document.querySelector(selector);
  run(() => element.dispatchEvent(mousedown));
  focus(element);
  run(() => element.dispatchEvent(mouseup));
  run(() => element.dispatchEvent(click));
}

function clickTrigger(scope, options = {}) {
  let selector = '.ember-basic-dropdown-trigger';
  nativeClick(selector, options);
}

test('opens on click', function(assert) {
  assert.expect(1);
  this.appRoot = document.querySelector('#ember-testing');
  this.render(hbs`{{#paper-menu as |menu|}}
    {{#menu.trigger}}
      {{#paper-button iconButton=true}}
        {{paper-icon "local_phone"}}
      {{/paper-button}}
    {{/menu.trigger}}
    {{#menu.content width=4 as |content|}}
        {{#content.menu-item onClick="openSomething"}}
          <span id="menu-item">Test</span>
        {{/content.menu-item}}
    {{/menu.content}}
  {{/paper-menu}}`);

  return wait().then(() => {
    clickTrigger();

    return wait().then(() => {
      let selectors = $('.md-open-menu-container');
      assert.ok(selectors.length, 'opened menu');
      return wait().then(() => {

      });
    });
  });
});

test('backdrop removed if menu closed', function(assert) {
  assert.expect(2);
  this.appRoot = document.querySelector('#ember-testing');
  this.render(hbs`{{#paper-menu as |menu|}}
    {{#menu.trigger}}
      {{#paper-button iconButton=true}}
        {{paper-icon "local_phone"}}
      {{/paper-button}}
    {{/menu.trigger}}
    {{#menu.content width=4 as |content|}}
        {{#content.menu-item onClick="openSomething"}}
          <span id="menu-item">Test</span>
        {{/content.menu-item}}
    {{/menu.content}}
  {{/paper-menu}}`);

  return wait().then(() => {
    clickTrigger();

    return wait().then(() => {

      let selectors = $('.md-open-menu-container');
      assert.ok(selectors.length, 'opened menu');
      clickTrigger();
      return wait().then(() => {
        let selector = $('.md-backdrop');
        assert.ok(!selector.length, 'backdrop removed');
      });
    });
  });
});

test('backdrop removed if backdrop clicked', function(assert) {
  assert.expect(2);
  this.appRoot = document.querySelector('#ember-testing');
  this.render(hbs`{{#paper-menu as |menu|}}
    {{#menu.trigger}}
      {{#paper-button iconButton=true}}
        {{paper-icon "local_phone"}}
      {{/paper-button}}
    {{/menu.trigger}}
    {{#menu.content width=4 as |content|}}
        {{#content.menu-item onClick="openSomething"}}
          <span id="menu-item">Test</span>
        {{/content.menu-item}}
    {{/menu.content}}
  {{/paper-menu}}`);

  return wait().then(() => {
    clickTrigger();

    return wait().then(() => {

      let selectors = $('.md-open-menu-container');
      assert.ok(selectors.length, 'opened menu');
      $('md-backdrop').click();
      return wait().then(() => {
        let selector = $('.md-backdrop');
        assert.ok(!selector.length, 'backdrop removed');
      });
    });
  });
});

test('keydown changes focused element', function(assert) {
  assert.expect(3);
  this.appRoot = document.querySelector('#ember-testing');
  this.render(hbs`{{#paper-menu as |menu|}}
    {{#menu.trigger}}
      {{#paper-button iconButton=true}}
        {{paper-icon "local_phone"}}
      {{/paper-button}}
    {{/menu.trigger}}
    {{#menu.content width=4 as |content|}}
        {{#content.menu-item onClick="openSomething"}}
          <span id="menu-item">Test</span>
        {{/content.menu-item}}
        {{#content.menu-item onClick="openSomething"}}
          <span id="menu-item2">Test 2</span>
        {{/content.menu-item}}
    {{/menu.content}}
  {{/paper-menu}}`);

  return wait().then(() => {
    clickTrigger();

    return wait().then(() => {

      let selectors = $('md-menu-item');
      assert.ok($(selectors[0].firstElementChild).hasClass('md-focused'), 'first menu item given focus');
      let e = new $.Event('keydown');
      let menu = $('md-menu-content');
      e.which = 40;
      e.target = menu[0].firstElementChild;

      $(menu[0].firstElementChild).trigger(e);

      return wait().then(() => {
        let first = $(selectors[0].firstElementChild);
        let second = $(selectors[1].firstElementChild);
        assert.ok(second.hasClass('md-focused') && !first.hasClass('md-focused'), 'focus has changed to second item');
        let e = new $.Event('keydown');
        e.which = 38;
        e.target = selectors[1];
        $(selectors[1]).trigger(e);
        return wait().then(() => {
          let first = $(selectors[0].firstElementChild);
          let second = $(selectors[1].firstElementChild);
          assert.ok(!second.hasClass('md-focused') && first.hasClass('md-focused'), 'focus has changed to first item');

        });
      });
    });
  });
});

test('md-menu doesn\'t have a tabindex attribute', function(assert) {
  this.render(hbs`
    {{#paper-menu as |menu|}}
      {{#menu.trigger}}
        {{#paper-button iconButton=true}}
          {{paper-icon "local_phone"}}
        {{/paper-button}}
      {{/menu.trigger}}
      {{#menu.content width=4 as |content|}}
          {{#content.menu-item onClick="openSomething"}}
            <span id="menu-item">Test</span>
          {{/content.menu-item}}
          {{#content.menu-item onClick="openSomething"}}
            <span id="menu-item2">Test 2</span>
          {{/content.menu-item}}
      {{/menu.content}}
    {{/paper-menu}}
  `);

  assert.equal(this.$('md-menu').attr('tabindex'), '-1', 'no tabindex present');
});