import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger, selectChoose } from 'ember-power-select/test-support/helpers';

module('Integration | Component | paper-select', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('sizes', ['small (12-inch)', 'medium (14-inch)', 'large (16-inch)', 'insane (42-inch)']);
  });

  test('opens on click', async function(assert) {
    await render(hbs`{{#paper-select
      disabled=disableSelect
      placeholder="Size"
      options=sizes
      selected=selectedSize
      onChange=(action (mut selectedSize))
      as |size|
    }}
      {{size}}
    {{/paper-select}}`);

    await clickTrigger('md-input-container');

    assert.dom('md-select-menu').exists();
  });

  test('backdrop removed if select closed', async function(assert) {
    await render(hbs`{{#paper-select
      disabled=disableSelect
      placeholder="Size"
      options=sizes
      selected=selectedSize
      onChange=(action (mut selectedSize))
      as |size|
    }}
      {{size}}
    {{/paper-select}}`);

    await clickTrigger('md-input-container');

    assert.dom('md-backdrop').exists();

    await clickTrigger('md-input-container');

    assert.dom('md-backdrop').doesNotExist();
  });

  test('it can select an option', async function(assert) {
    await render(hbs`{{#paper-select
      disabled=disableSelect
      placeholder="Size"
      options=sizes
      selected=selectedSize
      onChange=(action (mut selectedSize))
      as |size|
    }}
      {{size}}
    {{/paper-select}}`);

    await clickTrigger('md-input-container');

    await selectChoose('md-input-container', 'large (16-inch)');

    assert.equal(this.get('selectedSize'), 'large (16-inch)');
  });

  test('header is rendered above content', async function(assert) {
    await render(hbs`{{#paper-select
      disabled=disableSelect
      placeholder="Size"
      options=sizes
      searchEnabled=true
      selected=selectedSize
      onChange=(action (mut selectedSize))
      as |size|
    }}
      {{size}}
    {{/paper-select}}`);

    await clickTrigger('md-input-container');

    assert.dom('md-select-menu > md-select-header').exists();
    assert.dom('md-select-menu > md-content').exists();
  });

  test('it can search a value', async function(assert) {
    await render(hbs`{{#paper-select
      disabled=disableSelect
      placeholder="Size"
      options=sizes
      searchEnabled=true
      selected=selectedSize
      onChange=(action (mut selectedSize))
      as |size|
    }}
      {{size}}
    {{/paper-select}}`);

    await clickTrigger('md-input-container');

    assert.dom('md-select-menu md-option').exists({ count: 4 });

    await fillIn('md-select-header input', 'small');

    assert.dom('md-select-menu md-option').exists({ count: 1 });

    assert.dom('md-select-menu md-option').hasText('small (12-inch)');
  });

  test('it shows search message before entering search string', async function(assert) {
    this.search = (value) => this.sizes.filter((size) => size.includes(value));

    await render(hbs`{{#paper-select
      search=search
      searchEnabled=true
      selected=selectedSize
      onChange=(action (mut selectedSize))
      as |size|
    }}
      {{size}}
    {{/paper-select}}`);

    await clickTrigger('md-input-container');
    assert.dom('md-select-menu > md-content').exists();
    assert.dom('md-select-menu > md-content').hasText('Type to search');
  });
});
