import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import { find, triggerEvent } from 'ember-native-dom-helpers';
const { run } = Ember;

moduleForComponent('paper-tooltip', 'Integration | Component | paper tooltip', {
  integration: true
});

['focus', 'touchstart', 'mouseenter'].forEach((openEvent) => {
  ['blur', 'touchcancel', 'mouseleave'].forEach((closeEvent) => {
    test(`opens after ${openEvent} and closes after ${closeEvent}`, async function(assert) {

      this.render(hbs`
        {{#paper-button}}
          button
          {{#paper-tooltip}}
            tooltip
          {{/paper-tooltip}}
        {{/paper-button}}
      `);

      await triggerEvent('.md-button', openEvent);

      assert.ok(find('md-tooltip'), 'tooltip was rendered');

      await triggerEvent('.md-button', closeEvent);

      assert.notOk(find('md-tooltip'), 'tooltip was destroyed');
    });
  });
});

['scroll', 'blur', 'resize', 'orientationchange'].forEach((closeEvent) => {
  test(`closes after global ${closeEvent}`, async function(assert) {

    this.render(hbs`
      {{#paper-button}}
        button
        {{#paper-tooltip}}
          tooltip
        {{/paper-tooltip}}
      {{/paper-button}}
    `);

    await triggerEvent('.md-button', 'mouseenter');

    assert.ok(find('md-tooltip'), 'tooltip was rendered');

    run(() => window.dispatchEvent(new window.Event(closeEvent)));

    await wait();

    assert.notOk(find('md-tooltip'), 'tooltip was destroyed');
  });
});

test('renders on bottom by default', async function(assert) {

  this.render(hbs`
    {{#paper-button}}
      button
      {{#paper-tooltip}}
        tooltip
      {{/paper-tooltip}}
    {{/paper-button}}
  `);

  await triggerEvent('.md-button', 'mouseenter');

  assert.ok(find('md-tooltip').classList.contains('md-origin-bottom'));
});

test('renders on bottom by default', async function(assert) {

  this.render(hbs`
    {{#paper-button}}
      button
      {{#paper-tooltip}}
        tooltip
      {{/paper-tooltip}}
    {{/paper-button}}
  `);

  await triggerEvent('.md-button', 'mouseenter');

  assert.ok(find('md-tooltip').classList.contains('md-origin-bottom'));
});

['bottom', 'top', 'left', 'right'].forEach((position) => {
  test(`renders on ${position}`, async function(assert) {
    this.position = position;
    this.render(hbs`
      {{#paper-button}}
        button
        {{#paper-tooltip position=position}}
          tooltip
        {{/paper-tooltip}}
      {{/paper-button}}
    `);

    await triggerEvent('.md-button', 'mouseenter');

    assert.ok(find('md-tooltip').classList.contains(`md-origin-${position}`));
  });
});

test('custom class is applied on md-tooltip element', async function(assert) {

  this.render(hbs`
    {{#paper-button}}
      button
      {{#paper-tooltip class="my-tooltip"}}
        tooltip
      {{/paper-tooltip}}
    {{/paper-button}}
  `);

  await triggerEvent('.md-button', 'mouseenter');

  assert.ok(find('md-tooltip').classList.contains('my-tooltip'));
});

