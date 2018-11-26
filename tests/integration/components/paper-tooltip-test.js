import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper-tooltip', function(hooks) {
  setupRenderingTest(hooks);

  ['focus', 'touchstart', 'mouseenter'].forEach((openEvent) => {
    ['blur', 'touchcancel', 'mouseleave'].forEach((closeEvent) => {
      test(`opens after ${openEvent} and closes after ${closeEvent}`, async function(assert) {

        await render(hbs`
          {{#paper-button}}
            button
            {{#paper-tooltip}}
              tooltip
            {{/paper-tooltip}}
          {{/paper-button}}
        `);

        await triggerEvent('.md-button', openEvent);

        assert.dom('md-tooltip').exists({ count: 1 }, 'tooltip was rendered');

        await triggerEvent('.md-button', closeEvent);

        assert.dom('md-tooltip').doesNotExist('tooltip was destroyed');
      });
    });
  });

  ['scroll', 'blur', 'resize', 'orientationchange'].forEach((closeEvent) => {
    test(`closes after global ${closeEvent}`, async function(assert) {

      await render(hbs`
        {{#paper-button}}
          button
          {{#paper-tooltip}}
            tooltip
          {{/paper-tooltip}}
        {{/paper-button}}
      `);

      await triggerEvent('.md-button', 'mouseenter');

      assert.dom('md-tooltip').exists({ count: 1 }, 'tooltip was rendered');

      await triggerEvent(window, closeEvent);

      await settled();

      assert.dom('md-tooltip').doesNotExist('tooltip was destroyed');
    });
  });

  test('renders on bottom by default', async function(assert) {

    await render(hbs`
      {{#paper-button}}
        button
        {{#paper-tooltip}}
          tooltip
        {{/paper-tooltip}}
      {{/paper-button}}
    `);

    await triggerEvent('.md-button', 'mouseenter');

    assert.dom('md-tooltip').hasClass('md-origin-bottom');
  });

  test('renders on bottom by default', async function(assert) {

    await render(hbs`
      {{#paper-button}}
        button
        {{#paper-tooltip}}
          tooltip
        {{/paper-tooltip}}
      {{/paper-button}}
    `);

    await triggerEvent('.md-button', 'mouseenter');

    assert.dom('md-tooltip').hasClass('md-origin-bottom');
  });

  ['bottom', 'top', 'left', 'right'].forEach((position) => {
    test(`renders on ${position}`, async function(assert) {
      this.position = position;
      await render(hbs`
        {{#paper-button}}
          button
          {{#paper-tooltip position=position}}
            tooltip
          {{/paper-tooltip}}
        {{/paper-button}}
      `);

      await triggerEvent('.md-button', 'mouseenter');

      assert.dom('md-tooltip').hasClass(`md-origin-${position}`);
    });
  });

  test('custom class is applied on md-tooltip element', async function(assert) {

    await render(hbs`
      {{#paper-button}}
        button
        {{#paper-tooltip class="my-tooltip"}}
          tooltip
        {{/paper-tooltip}}
      {{/paper-button}}
    `);

    await triggerEvent('.md-button', 'mouseenter');

    assert.dom('md-tooltip').hasClass('my-tooltip');
  });
});

