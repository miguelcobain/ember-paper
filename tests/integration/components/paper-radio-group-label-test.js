import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper-radio-group-label', function(hooks) {
  setupRenderingTest(hooks);

  test('it calls `setAriaLabelledby` with self elementId when the component lands in the DOM`', async function(assert) {
    assert.expect(1);

    let setAriaLabelledby = (id) => {
      assert.equal(this.element.querySelector('md-label').id, id, 'Calls `setAriaLabelledby` with correct param');
    };

    this.set('setAriaLabelledby', setAriaLabelledby);

    await render(hbs`{{paper-radio-group-label setAriaLabelledby=setAriaLabelledby}}`);
  });

  test('it sets label content based on text property', async function(assert) {
    await render(hbs`{{paper-radio-group-label text="hello"}}`);

    assert.dom('md-label').hasText('hello');
  });

  test('it shows label passed as a block', async function(assert) {
    await render(hbs`
      {{#paper-radio-group-label}}
        hello block
      {{/paper-radio-group-label}}
    `);

    assert.dom('md-label').hasText('hello block');
  });
});
