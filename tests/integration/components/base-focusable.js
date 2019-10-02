import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | base focusable', function(hooks) {
  setupRenderingTest(hooks);

  test('should set and remove disabled attribute', async function(assert) {

    this.set('value', true);
    await render(hbs`{{base-focusable id="base-focusable" disabled=value}}`);
    assert.equal(find('#base-focusable').getAttribute('disabled').trim(), 'disabled');

    this.set('value', false);
    assert.ok(!find('md-checkbox').getAttribute('disabled'));
  });
});