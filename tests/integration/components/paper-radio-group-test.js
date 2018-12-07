import Component from '@ember/component';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, triggerKeyEvent, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper-radio-group', function(hooks) {
  setupRenderingTest(hooks);

  test('should set and remove checked css class', async function(assert) {
    assert.expect(2);

    this.set('groupValue', '1');
    await render(hbs`
      {{#paper-radio-group groupValue=groupValue onChange=(action (mut groupValue)) as |group|}}
        {{#group.radio value="1"}}
          Radio button 1
        {{/group.radio}}
        {{#group.radio value="2"}}
          Radio button 2
        {{/group.radio}}
        {{#group.radio value="3"}}
          Radio button 3
        {{/group.radio}}
      {{/paper-radio-group}}
    `);

    assert.dom('md-radio-button').hasClass('md-checked');

    this.set('groupValue', null);
    assert.dom('md-radio-button').doesNotHaveClass('md-checked');

  });

  test('should trigger an action when checking', async function(assert) {
    assert.expect(1);

    this.set('handleChange', (value) => {
      assert.equal(value, '1');
    });

    await render(hbs`
      {{#paper-radio-group groupValue=groupValue onChange=handleChange as |group|}}
        {{#group.radio value="1"}}
          Radio button 1
        {{/group.radio}}
        {{#group.radio value="2"}}
          Radio button 2
        {{/group.radio}}
        {{#group.radio value="3"}}
          Radio button 3
        {{/group.radio}}
      {{/paper-radio-group}}
    `);

    await click('md-radio-button:first-child');
  });

  test('should trigger an action when unchecking (toggle is true)', async function(assert) {
    assert.expect(1);

    this.set('groupValue', '1');
    this.set('handleChange', (value) => {
      assert.equal(value, null);
    });

    await render(hbs`
      {{#paper-radio-group groupValue=groupValue toggle=true onChange=handleChange as |group|}}
        {{#group.radio value="1"}}
          Radio button 1
        {{/group.radio}}
        {{#group.radio value="2"}}
          Radio button 2
        {{/group.radio}}
        {{#group.radio value="3"}}
          Radio button 3
        {{/group.radio}}
      {{/paper-radio-group}}
    `);

    await click('md-radio-button:first-child');
  });

  test('shouldn\'t trigger an action when disabled', async function(assert) {
    assert.expect(0);

    this.set('handleChange', (checked) => {
      assert.equal(checked, '1');
    });

    await render(hbs`
      {{#paper-radio-group groupValue=groupValue disabled=true onChange=(action (mut groupValue)) as |group|}}
        {{#group.radio value="1"}}
          Radio button 1
        {{/group.radio}}
        {{#group.radio value="2"}}
          Radio button 2
        {{/group.radio}}
        {{#group.radio value="3"}}
          Radio button 3
        {{/group.radio}}
      {{/paper-radio-group}}
    `);

    await click('md-radio-button');

  });

  test('should be possible to select next with down/right arrow in a paper-radio-group', async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{#paper-radio-group groupValue=groupValue onChange=(action (mut groupValue)) as |group|}}
        {{#group.radio value="1"}}
          Radio button 1
        {{/group.radio}}
        {{#group.radio value="2"}}
          Radio button 2
        {{/group.radio}}
        {{#group.radio value="3"}}
          Radio button 3
        {{/group.radio}}
      {{/paper-radio-group}}
    `);

    await triggerKeyEvent('md-radio-group', 'keydown', 40);

    assert.equal(this.get('groupValue'), '1');

    await triggerKeyEvent('md-radio-group', 'keydown', 39);

    assert.equal(this.get('groupValue'), '2');
  });

  test('should be possible to select next with up/left arrow in a paper-radio-group', async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{#paper-radio-group groupValue=groupValue onChange=(action (mut groupValue)) as |group|}}
        {{#group.radio value="1"}}
          Radio button 1
        {{/group.radio}}
        {{#group.radio value="2"}}
          Radio button 2
        {{/group.radio}}
        {{#group.radio value="3"}}
          Radio button 3
        {{/group.radio}}
      {{/paper-radio-group}}
    `);

    await triggerKeyEvent('md-radio-group', 'keydown', 38);

    assert.equal(this.get('groupValue'), '1');

    await triggerKeyEvent('md-radio-group', 'keydown', 37);

    assert.equal(this.get('groupValue'), '3');
  });

  test('should be possible to select next with down/right arrow in a paper-radio-group (when group.radio value is 0)', async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{#paper-radio-group groupValue=groupValue onChange=(action (mut groupValue)) as |group|}}
        {{#group.radio value=0}}
          Radio button 1
        {{/group.radio}}
        {{#group.radio value="2"}}
          Radio button 2
        {{/group.radio}}
        {{#group.radio value="3"}}
          Radio button 3
        {{/group.radio}}
      {{/paper-radio-group}}
    `);

    await triggerKeyEvent('md-radio-group', 'keydown', 40);

    assert.equal(this.get('groupValue'), 0);

    await triggerKeyEvent('md-radio-group', 'keydown', 39);

    assert.equal(this.get('groupValue'), '2');
  });

  /* test('the `onChange` action is mandatory for paper-radio-group', function(assert) {
    assert.expect(1);

    assert.throws(() => {
      this.render(hbs`
        {{#paper-radio-group groupValue=groupValue as |group|}}
          {{#group.radio value="1"}}
            Radio button 1
          {{/group.radio}}
        {{/paper-radio-group}}
      `);
    }, /requires an `onChange` action/);
  });*/

  test('passing `radioComponent` allows customizing the yielded radio-component', async function(assert) {
    assert.expect(1);

    this.owner.register('component:custom-radio', Component.extend({
      classNames: 'custom-radio'
    }));

    await render(hbs`
      {{#paper-radio-group radioComponent="custom-radio" groupValue=groupValue onChange=null as |group|}}
        {{group.radio}}
      {{/paper-radio-group}}
    `);

    assert.dom('.custom-radio').exists({ count: 1 }, 'custom radio component is displayed');
  });

  test('it yields label component', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#paper-radio-group onChange=null as |group|}}
        {{#group.label}}
          group label
        {{/group.label}}
      {{/paper-radio-group}}
    `);

    assert.dom('md-label').exists();
  });

  test('it sets aira-labelled property when label is present', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#paper-radio-group onChange=null as |group|}}
        {{#group.label}}
          group label
        {{/group.label}}
      {{/paper-radio-group}}
    `);
    let labelId = find('md-radio-group').getAttribute('aria-labelledby');
    assert.dom(`#${labelId}`).hasText('group label');
  });

  test('it doesn\'t show aria-labelled property when group does not have label element', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#paper-radio-group onChange=null as |group|}}
        {{group.radio}}
      {{/paper-radio-group}}
    `);

    assert.dom('md-radio-group').doesNotHaveAttribute('aria-labelledby');
  });

  test('it has role attribute', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#paper-radio-group onChange=null as |group|}}
        {{group.radio}}
      {{/paper-radio-group}}
    `);

    assert.dom('md-radio-group').hasAttribute('role');
  });
});
