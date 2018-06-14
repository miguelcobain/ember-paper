import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper speed dial', function(hooks) {
  setupRenderingTest(hooks);

  ['fling', 'scale'].forEach((animation) => {
    test(`adds the correct class for ${animation} animation`, async function(assert) {
      this.animation = animation;
      await render(hbs`{{paper-speed-dial animation=animation}}`);

      assert.dom('md-fab-speed-dial').hasClass(`md-${animation}`);
    });
  });

  ['up', 'down', 'left', 'right'].forEach((direction) => {
    test(`adds the correct class for ${direction} direction`, async function(assert) {
      this.direction = direction;
      await render(hbs`{{paper-speed-dial direction=direction}}`);

      assert.dom('md-fab-speed-dial').hasClass(`md-${direction}`);
    });
  });

  test('hoverFull=true adds the correct md-hover-full class', async function(assert) {
    await render(hbs`{{paper-speed-dial hoverFull=true}}`);

    assert.dom('md-fab-speed-dial').hasClass('md-hover-full');
  });

  test('clicking the trigger opens the speed dial', async function(assert) {
    await render(hbs`
      {{#paper-speed-dial as |dial|}}
        {{dial.trigger}}
      {{/paper-speed-dial}}
    `);

    assert.dom('md-fab-speed-dial').hasNoClass('md-is-open');

    await click('md-fab-trigger');

    assert.dom('md-fab-speed-dial').hasClass('md-is-open');
  });

  test('focusing out the speed dial trigger closes it', async function(assert) {
    await render(hbs`
      {{#paper-speed-dial open=true as |dial|}}
        {{dial.trigger}}
      {{/paper-speed-dial}}
    `);

    assert.dom('md-fab-speed-dial').hasClass('md-is-open');

    await triggerEvent('md-fab-trigger', 'blur');

    assert.dom('md-fab-speed-dial').hasNoClass('md-is-open');
  });

  test('toggling `open` opens/closes the speed dial', async function(assert) {
    this.open = false;

    await render(hbs`
      {{#paper-speed-dial open=open as |dial|}}
        {{dial.trigger}}
      {{/paper-speed-dial}}
    `);

    assert.dom('md-fab-speed-dial').hasNoClass('md-is-open');

    this.set('open', true);

    assert.dom('md-fab-speed-dial').hasClass('md-is-open');

    this.set('open', false);

    assert.dom('md-fab-speed-dial').hasNoClass('md-is-open');
  });

  test('clicking the trigger triggers the `onToggle` action', async function(assert) {
    assert.expect(1);

    this.onToggle = (state) => {
      assert.ok(state);
    };

    await render(hbs`
      {{#paper-speed-dial onToggle=(action onToggle) as |dial|}}
        {{dial.trigger}}
      {{/paper-speed-dial}}
    `);

    await click('md-fab-trigger');
  });
});
