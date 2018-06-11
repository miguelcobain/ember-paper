import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerKeyEvent, click, focus } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper switch', function(hooks) {
  setupRenderingTest(hooks);

  test('should set selected class correctly', async function(assert) {
    this.set('foo', () => { });
    this.set('switchValue', true);

    await render(hbs`
      {{#paper-switch value=switchValue onChange=foo}}
        Radio button 1
      {{/paper-switch}}
    `);

    assert.dom('md-switch').hasClass('md-checked');

    this.set('switchValue', false);

    assert.dom('md-switch').doesNotHaveClass('md-checked');
  });

  test('should not set focused class', async function(assert) {
    await render(hbs`
      {{#paper-switch value=switchValue onChange=(action (mut switchValue))}}
        Radio button 1
      {{/paper-switch}}
    `);

    await click('md-switch');

    assert.dom('md-switch').doesNotHaveClass('md-focused');
  });

  test('should set focused class', async function(assert) {
    await render(hbs`
      {{#paper-switch value=switchValue onChange=(action (mut switchValue))}}
        Radio button 1
      {{/paper-switch}}
    `);

    await focus('md-switch');

    assert.dom('md-switch').hasClass('md-focused');
  });

  test('should render block content as label', async function(assert) {
    this.set('foo', () => { });
    this.set('switchValue', true);

    await render(hbs`
      {{#paper-switch value=switchValue onChange=foo}}
        A block label
      {{/paper-switch}}
    `);

    assert.dom('md-switch .md-label').hasText('A block label');
  });

  test('blockless mode should render label', async function(assert) {
    this.set('foo', () => { });
    this.set('switchValue', true);

    await render(hbs`
      {{paper-switch value=switchValue onChange=foo label="An inline label"}}
    `);

    assert.dom('md-switch .md-label').hasText('An inline label');
  });

  // space and enter key codes
  [32, 13].forEach((keyCode) => {
    test(`should be possible to switch on with key code ${keyCode}`, async function(assert) {
      assert.expect(2);

      this.set('switchValue', false);
      await render(hbs`{{paper-switch value=switchValue onChange=(action (mut switchValue))}}`);
      assert.equal(this.get('switchValue'), false);

      await triggerKeyEvent('md-switch', 'keypress', keyCode);

      assert.equal(this.get('switchValue'), true);
    });

    test(`should be possible to switch off with key code ${keyCode}`, async function(assert) {
      assert.expect(2);

      this.set('switchValue', true);
      await render(hbs`{{paper-switch value=switchValue onChange=(action (mut switchValue))}}`);
      assert.equal(this.get('switchValue'), true);

      await triggerKeyEvent('md-switch', 'keypress', keyCode);

      assert.equal(this.get('switchValue'), false);
    });
  });

  /* test('the `onChange` action is mandatory for paper-switch', function(assert) {
    assert.expect(1);

    assert.throws(() => {
      this.render(hbs`{{paper-switch value=true}}`);
    }, /requires an `onChange` action/);
  });*/
});
