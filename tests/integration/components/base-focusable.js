import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | base focusable', function(hooks) {
  setupRenderingTest(hooks);

  test('should set and remove disabled attribute', async function(assert) {

    this.set('value', true);
    await render(hbs`{{base-focusable id="base-focusable" disabled=value}}`);
    
    assert.dom('#base-focusable').isDisabled();

    this.set('value', false);
    
    assert.dom('md-checkbox').isNotDisabled();
  });
});