import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper reset button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{paper-reset-button}}`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      {{#paper-reset-button}}
        template block text
      {{/paper-reset-button}}
    `);

    assert.dom(this.element).hasText('template block text');
  });

  test('it does not submit a form on click', async function(assert) {
    assert.expect(3);

    this.set('submitForm', () => {
      this.set('formSubmitted', true);
    });

    this.set('onReset', () => {
      this.set('resetClicked', true);
    });

    await render(hbs`
      <form {{action "submitForm" on="submit"}}>
        {{paper-reset-button class="reset-btn" onReset=(action onReset)}}
      </form>
    `);

    assert.dom('form .reset-btn').hasAttribute('type', 'button', 'reset-button has type="button"');
    await click('form .reset-btn');
    assert.ok(this.get('resetClicked'), 'The reset button was clicked');
    assert.notOk(this.get('formSubmitted'), 'The outer form should not be submitted when the reset button is clicked');
  });
});
