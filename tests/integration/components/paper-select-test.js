import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import { clickTrigger, selectChoose } from '../../../tests/helpers/ember-power-select';

moduleForComponent('paper-select', 'Integration | Component | paper select', {
  integration: true,
  beforeEach() {
    this.set('sizes', ['small (12-inch)', 'medium (14-inch)', 'large (16-inch)', 'insane (42-inch)']);
  }
});

test('opens on click', async function(assert) {
  this.render(hbs`{{#paper-select
    disabled=disableSelect
    placeholder="Size"
    options=sizes
    selected=selectedSize
    onChange=(action (mut selectedSize))
    as |size|
  }}
    {{size}}
  {{/paper-select}}`);

  await wait();

  await clickTrigger('md-input-container');

  assert.equal(document.querySelectorAll('.ember-power-select-option').length, 4, 'opened menu');
});

test('backdrop removed if select closed', async function(assert) {
  this.render(hbs`{{#paper-select
    disabled=disableSelect
    placeholder="Size"
    options=sizes
    selected=selectedSize
    onChange=(action (mut selectedSize))
    as |size|
  }}
    {{size}}
  {{/paper-select}}`);

  await wait();

  await clickTrigger('md-input-container');

  assert.equal(document.querySelectorAll('md-backdrop').length, 1, 'backdrop visible');

  await clickTrigger('md-input-container');

  assert.equal(document.querySelectorAll('md-backdrop').length, 0, 'backdrop removed');
});

test('can select an option', async function(assert) {
  assert.expect(1);

  this.set('onChange', (v) => assert.equal(v, 'medium (14-inch)', 'onChange called'));

  this.render(hbs`{{#paper-select
    disabled=disableSelect
    placeholder="Size"
    options=sizes
    selected=selectedSize
    onChange=onChange
    as |size|
  }}
    {{size}}
  {{/paper-select}}`);

  await wait();

  await clickTrigger('md-input-container');

  await selectChoose('md-input-container', 'medium (14-inch)');
});
