import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

let originalMatchMedia;

module('Integration | Component | paper sidenav', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    originalMatchMedia = window.matchMedia;
  });

  hooks.afterEach(function() {
    window.matchMedia = originalMatchMedia;
  });

  test('renders a container with flex and layout-row classes', async function(assert) {
    assert.expect(2);

    await render(hbs`{{paper-sidenav-container class="sidenav-container"}}`);

    assert.dom('.sidenav-container').hasClass('flex');
    assert.dom('.sidenav-container').hasClass('layout-row');
  });

  test('sidenav uses md-sidenav-left by default', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-sidenav}}`);

    assert.dom('md-sidenav').hasClass('md-sidenav-left');
  });

  test('sidenav uses md-sidenav-right with position="right"', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-sidenav position="right"}}`);

    assert.dom('md-sidenav').hasClass('md-sidenav-right');
  });

  test('sidenav starts open when `open=true`', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-sidenav open=true lockedOpen=false}}`);

    assert.dom('md-sidenav').doesNotHaveClass('md-closed');
  });

  test('sidenav starts closed when `open=true`', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-sidenav open=false lockedOpen=false}}`);

    assert.dom('md-sidenav').hasClass('md-closed');

  });

  test('should trigger an action when clicking on backdrop', async function(assert) {
    assert.expect(1);

    this.set('sidenavToggle', (value) => {
      assert.notOk(value);
    });

    await render(hbs`
      {{#paper-sidenav open=true onToggle=(action sidenavToggle) lockedOpen=false}}
        Hi!
      {{/paper-sidenav}}
    `);

    await click('md-backdrop');
  });

  test('sidenav opens when `open` is changed to `true`', async function(assert) {
    assert.expect(2);

    this.set('isOpen', false);

    await render(hbs`{{paper-sidenav open=isOpen lockedOpen=false}}`);

    assert.dom('md-sidenav').hasClass('md-closed');

    this.set('isOpen', true);

    await settled();
    assert.dom('md-sidenav').doesNotHaveClass('md-closed');

  });

  test('sidenav closes when `open` is changed to `false`', async function(assert) {
    assert.expect(2);

    this.set('isOpen', true);

    await render(hbs`{{paper-sidenav open=isOpen lockedOpen=false}}`);

    assert.dom('md-sidenav').doesNotHaveClass('md-closed');

    this.set('isOpen', false);

    await settled();
    assert.dom('md-sidenav').hasClass('md-closed');

  });

  test('should trigger an action when clicking inside sidenav with `closeOnClick=true` (default)', async function(assert) {
    assert.expect(1);

    this.set('sidenavToggle', (value) => {
      assert.notOk(value);
    });

    await render(hbs`
      {{#paper-sidenav open=true onToggle=(action sidenavToggle) lockedOpen=false}}
        Hi!
      {{/paper-sidenav}}
    `);

    await click('md-sidenav');
  });

  test('should trigger an action when clicking inside sidenav with `closeOnClick=true` (default)', async function(assert) {
    assert.expect(0);

    this.set('sidenavToggle', (value) => {
      assert.notOk(value);
    });

    await render(hbs`
      {{#paper-sidenav open=true onToggle=(action sidenavToggle) closeOnClick=false lockedOpen=false}}
        Hi!
      {{/paper-sidenav}}
    `);

    await click('md-sidenav');
  });

  test('sidenav "locks open" when specified matchMedia test passes', async function(assert) {
    assert.expect(1);

    window.matchMedia = function() {
      return { matches: true };
    };

    await render(hbs`{{paper-sidenav}}`);

    assert.dom('md-sidenav').hasClass('md-locked-open');
  });

  test('sidenav does not "lock open" when specified matchMedia test does not pass', async function(assert) {
    assert.expect(1);

    window.matchMedia = function() {
      return { matches: false };
    };

    await render(hbs`{{paper-sidenav}}`);

    assert.dom('md-sidenav').doesNotHaveClass('md-locked-open');
  });

  test('sidenav "locks open" if a resize happens and the test passes', async function(assert) {
    assert.expect(2);

    window.matchMedia = function() {
      return { matches: false };
    };

    await render(hbs`{{paper-sidenav}}`);

    assert.dom('md-sidenav').doesNotHaveClass('md-locked-open');

    window.matchMedia = function() {
      return { matches: true };
    };

    window.dispatchEvent(new window.Event('resize'));

    await settled();

    assert.dom('md-sidenav').hasClass('md-locked-open');
  });

  test('sidenav ceases to "lock open" if a resize happens and the test does not pass', async function(assert) {
    assert.expect(2);

    window.matchMedia = function() {
      return { matches: true };
    };

    await render(hbs`{{paper-sidenav}}`);

    assert.dom('md-sidenav').hasClass('md-locked-open');

    window.matchMedia = function() {
      return { matches: false };
    };
    window.dispatchEvent(new window.Event('resize'));

    await settled();
    assert.dom('md-sidenav').doesNotHaveClass('md-locked-open');

  });

  test('should trigger an action when clicking sidenav-toggle ("default" name)', async function(assert) {
    assert.expect(1);

    this.set('sidenavToggle', (value) => {
      assert.notOk(value);
    });

    await render(hbs`
      {{#paper-sidenav open=true onToggle=(action sidenavToggle) lockedOpen=false}}
        Hi!
      {{/paper-sidenav}}
      {{#paper-sidenav-toggle as |toggleAction|}}
        {{#paper-button id="toggle-button" onClick=(action toggleAction)}}
          Toggle sidenav
        {{/paper-button}}
      {{/paper-sidenav-toggle}}
    `);

    await click('#toggle-button');
  });

  test('should trigger an action when clicking sidenav-toggle (custom name)', async function(assert) {
    assert.expect(1);

    this.set('sidenavToggle', (value) => {
      assert.notOk(value);
    });

    await render(hbs`
      {{#paper-sidenav name="balele" open=true onToggle=(action sidenavToggle) lockedOpen=false}}
        Hi!
      {{/paper-sidenav}}
      {{#paper-sidenav name="balili" open=true onToggle=(action sidenavToggle) lockedOpen=false}}
        Hi!
      {{/paper-sidenav}}
      {{#paper-sidenav-toggle name="balele" as |toggleAction|}}
        {{#paper-button id="toggle-button" onClick=(action toggleAction)}}
          Toggle sidenav
        {{/paper-button}}
      {{/paper-sidenav-toggle}}
    `);

    await click('#toggle-button');
  });

  test('should trigger an action on all named sidenavs when clicking sidenav-toggle', async function(assert) {
    assert.expect(2);

    this.set('sidenavToggle', (value) => {
      assert.notOk(value);
    });

    await render(hbs`
      {{#paper-sidenav name="balele" open=true onToggle=(action sidenavToggle) lockedOpen=false}}
        Hi!
      {{/paper-sidenav}}
      {{#paper-sidenav name="balele" open=true onToggle=(action sidenavToggle) lockedOpen=false}}
        Hi!
      {{/paper-sidenav}}
      {{#paper-sidenav-toggle name="balele" as |toggleAction|}}
        {{#paper-button id="toggle-button" onClick=(action toggleAction)}}
          Toggle sidenav
        {{/paper-button}}
      {{/paper-sidenav-toggle}}
    `);

    await click('#toggle-button');
  });

  /*
  test('clicking sidenav-toggle for unregistered sidenav should throw', async function(assert) {
    assert.expect(1);

    this.set('sidenavToggle', (value) => {
      assert.notOk(value);
    });

    await render(hbs`
      {{#paper-sidenav name="balele" open=true onToggle=(action sidenavToggle) lockedOpen=false}}
        Hi!
      {{/paper-sidenav}}
      {{#paper-sidenav-toggle name="çup" as |toggleAction|}}
        {{#paper-button id="toggle-button" onClick=(action toggleAction)}}
          Toggle sidenav
        {{/paper-button}}
      {{/paper-sidenav-toggle}}
    `);

    assert.throws(async () => {
      await click('#toggle-button');
    }, /You tried to toggle a sidenav named 'çup' but no such sidenav is registered/);
  });
*/

});
