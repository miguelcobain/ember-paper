import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

module('Integration | Component | paper checkbox', function(hooks) {
  setupRenderingTest(hooks);

  test('should set and remove checked css class', async function(assert) {
    assert.expect(2);

    this.set('value', true);
    await render(hbs`{{paper-checkbox value=value label="Blue" onChange=(action (mut value))}}`);
    assert.ok(find('md-checkbox').classList.contains('md-checked'));

    this.set('value', false);
    assert.ok(!find('md-checkbox').classList.contains('md-checked'));
  });

  test('should trigger an action when unchecking', async function(assert) {
    assert.expect(1);

    this.set('value', true);
    this.set('handleChange', (value) => {
      assert.equal(value, false);
    });

    await render(hbs`{{paper-checkbox value=value onChange=handleChange}}`);

    await click('md-checkbox');
  });

  test('should trigger an action when checking', async function(assert) {
    assert.expect(1);

    this.set('value', false);
    this.set('handleChange', (value) => {
      assert.equal(value, true);
    });

    await render(hbs`{{paper-checkbox value=value onChange=handleChange}}`);

    await click('md-checkbox');
  });

  test('shouldn\'t trigger an action when disabled', async function(assert) {
    assert.expect(0);

    this.set('value', false);
    this.set('handleChange', (value) => {
      assert.equal(value, true);
    });

    await render(hbs`{{paper-checkbox disabled=true value=value onChange=handleChange}}`);

    await click('md-checkbox');
  });

  // space and enter key codes
  [32, 13].forEach((keyCode) => {
    test(`should be possible to check with key code ${keyCode}`, async function(assert) {
      assert.expect(2);

      this.set('value', false);
      await render(hbs`{{paper-checkbox value=value onChange=(action (mut value))}}`);
      assert.equal(this.get('value'), false);

      let e = new $.Event('keypress');
      e.which = keyCode; // # Some key code value
      this.$('md-checkbox').trigger(e);

      assert.equal(this.get('value'), true);
    });

    test(`should be possible to uncheck with key code ${keyCode}`, async function(assert) {
      assert.expect(2);

      this.set('value', true);
      await render(hbs`{{paper-checkbox value=value onChange=(action (mut value))}}`);
      assert.equal(this.get('value'), true);

      let e = new $.Event('keypress');
      e.which = keyCode; // # Some key code value
      this.$('md-checkbox').trigger(e);

      assert.equal(this.get('value'), false);
    });
  });

  test('blockless version should set label inside', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-checkbox value=value onChange=(action (mut value)) label="çup?"}}`);

    assert.equal(find('.md-label > span').textContent.trim(), 'çup?');
  });

  test('block version should set label inside', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#paper-checkbox value=value onChange=(action (mut value))}}
        çup?
      {{/paper-checkbox}}
    `);

    assert.equal(find('.md-label > span').textContent.trim(), 'çup?');
  });

  /* test('the `onChange` action is mandatory', function(assert) {
    assert.expect(1);

    assert.throws(() => {
      this.render(hbs`{{paper-checkbox value=true}}`);
    }, /requires an `onChange` action/);
  });*/

  test('if `indeterminate` is true, set md-indeterminate class', async function(assert) {
    assert.expect(3);

    this.set('value', true);
    await render(hbs`
      {{paper-checkbox value=value indeterminate=indeterminate
        label="Blue" onChange=(action (mut value))}}
    `);
    assert.ok(find('md-checkbox').classList.contains('md-checked'));

    this.set('indeterminate', true);
    assert.ok(!find('md-checkbox').classList.contains('md-checked'));
    assert.ok(find('md-checkbox').classList.contains('md-indeterminate'));
  });
});
