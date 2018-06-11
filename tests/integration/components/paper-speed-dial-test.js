import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { find, click, triggerEvent } from 'ember-native-dom-helpers';

module('Integration | Component | paper speed dial', function(hooks) {
  setupRenderingTest(hooks);

  ['fling', 'scale'].forEach((animation) => {
    test(`adds the correct class for ${animation} animation`, async function(assert) {
      this.animation = animation;
      await render(hbs`{{paper-speed-dial animation=animation}}`);

      assert.ok(find('md-fab-speed-dial').classList.contains(`md-${animation}`));
    });
  });

  ['up', 'down', 'left', 'right'].forEach((direction) => {
    test(`adds the correct class for ${direction} direction`, async function(assert) {
      this.direction = direction;
      await render(hbs`{{paper-speed-dial direction=direction}}`);

      assert.ok(find('md-fab-speed-dial').classList.contains(`md-${direction}`));
    });
  });

  test('hoverFull=true adds the correct md-hover-full class', async function(assert) {
    await render(hbs`{{paper-speed-dial hoverFull=true}}`);

    assert.ok(find('md-fab-speed-dial').classList.contains('md-hover-full'));
  });

  test('clicking the trigger opens the speed dial', async function(assert) {
    await render(hbs`
      {{#paper-speed-dial as |dial|}}
        {{dial.trigger}}
      {{/paper-speed-dial}}
    `);

    assert.notOk(find('md-fab-speed-dial').classList.contains('md-is-open'));

    await click('md-fab-trigger');

    assert.ok(find('md-fab-speed-dial').classList.contains('md-is-open'));
  });

  test('focusing out the speed dial trigger closes it', async function(assert) {
    await render(hbs`
      {{#paper-speed-dial open=true as |dial|}}
        {{dial.trigger}}
      {{/paper-speed-dial}}
    `);

    assert.ok(find('md-fab-speed-dial').classList.contains('md-is-open'));

    await triggerEvent('md-fab-trigger', 'blur');

    assert.notOk(find('md-fab-speed-dial').classList.contains('md-is-open'));
  });

  test('toggling `open` opens/closes the speed dial', async function(assert) {
    this.open = false;

    await render(hbs`
      {{#paper-speed-dial open=open as |dial|}}
        {{dial.trigger}}
      {{/paper-speed-dial}}
    `);

    assert.notOk(find('md-fab-speed-dial').classList.contains('md-is-open'));

    this.set('open', true);

    assert.ok(find('md-fab-speed-dial').classList.contains('md-is-open'));

    this.set('open', false);

    assert.notOk(find('md-fab-speed-dial').classList.contains('md-is-open'));
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
