import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper radio', function(hooks) {
  setupRenderingTest(hooks);

  test('should set and remove checked css class', async function(assert) {
    assert.expect(2);

    this.set('groupValue', '1');
    await render(hbs`
      {{#paper-radio value="1" groupValue=groupValue onChange=(action (mut groupValue))}}
        Radio button 1
      {{/paper-radio}}
      {{#paper-radio value="2" groupValue=groupValue onChange=(action (mut groupValue))}}
        Radio button 2
      {{/paper-radio}}
    `);
    assert.dom('md-radio-button').hasClass('md-checked');

    this.set('groupValue', null);
    assert.dom('md-radio-button').doesNotHaveClass('md-checked');
  });

  test('should trigger an action when checking', async function(assert) {
    assert.expect(1);

    this.set('handleChange', (value) => {
      assert.equal(value, '1');
    });

    await render(hbs`
      {{#paper-radio value="1" groupValue=groupValue onChange=handleChange}}
        Radio button 1
      {{/paper-radio}}
      {{#paper-radio value="2" groupValue=groupValue onChange=handleChange}}
        Radio button 2
      {{/paper-radio}}
    `);

    await click('md-radio-button:first-child');

  });

  test('should trigger an action when unchecking (toggle is true)', async function(assert) {
    assert.expect(1);

    this.set('groupValue', '1');
    this.set('handleChange', (value) => {
      assert.equal(value, null);
    });

    await render(hbs`
      {{#paper-radio toggle=true value="1" groupValue=groupValue onChange=handleChange}}
        Radio button 1
      {{/paper-radio}}
    `);

    await click('md-radio-button');
  });

  test('shouldn\'t trigger an action when disabled', async function(assert) {
    assert.expect(0);

    this.set('handleChange', (checked) => {
      assert.equal(checked, '1');
    });

    await render(hbs`
      {{#paper-radio disabled=true value="1" groupValue=groupValue onChange=handleChange}}
        Radio button 1
      {{/paper-radio}}
    `);

    await click('md-radio-button');
  });

  test('blockless version should set label inside', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-radio value="1" onChange=(action (mut value)) label="çup?"}}`);

    assert.dom('.md-label > span').hasText('çup?');
  });

  test('block version should set label inside', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#paper-radio value="1" onChange=(action (mut value))}}
        çup?
      {{/paper-radio}}
    `);

    assert.dom('.md-label > span').hasText('çup?');
  });

  /* test('the `onChange` action is mandatory for paper-radio', function(assert) {
    assert.expect(1);

    assert.throws(() => {
      this.render(hbs`{{paper-radio value="1"}}`);
    }, /requires an `onChange` action/);
  });*/

  test('it has role attribute', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{paper-radio onChange=null}}
    `);

    assert.dom('md-radio-button').hasAttribute('role');
  });

  test('it correctly sets aria-checked attribute', async function(assert) {
    assert.expect(2);

    this.set('groupValue', null);

    await render(hbs`{{paper-radio value="1" groupValue=groupValue onChange=null}}`);

    assert.dom('md-radio-button').hasAttribute('aria-checked', 'false');

    this.set('groupValue', '1');

    assert.dom('md-radio-button').hasAttribute('aria-checked', 'true');
  });

  test('it sets aria-label when ariaLabel is passed', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-radio onChange=null ariaLabel="first radio button"}}`);

    assert.dom('md-radio-button').hasAttribute('aria-label', 'first radio button');
  });
});
