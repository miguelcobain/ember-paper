import Component from '@ember/component';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper form', function(hooks) {
  setupRenderingTest(hooks);

  test('`isInvalid` and `isValid` work as expected', async function(assert) {
    assert.expect(4);

    await render(hbs`
      {{#paper-form as |form|}}
        {{form.input value=foo onChange=(action (mut foo)) label="Foo"}}
        {{form.input value=bar onChange=(action (mut bar)) label="Bar" errors=errors}}

        {{#if form.isInvalid}}
          <div class="invalid-div">Form is invalid!</div>
        {{/if}}
        {{#if form.isValid}}
          <div class="valid-div">Form is valid!</div>
        {{/if}}

      {{/paper-form}}
    `);

    assert.dom('.invalid-div').doesNotExist();
    assert.dom('.valid-div').exists({ count: 1 });

    this.set('errors', [{
      message: 'foo should be a number.',
      attribute: 'foo'
    }, {
      message: 'foo should be smaller than 12.',
      attribute: 'foo'
    }]);

    assert.dom('.invalid-div').exists({ count: 1 });
    assert.dom('.valid-div').doesNotExist();
  });

  test('form `onSubmit` action is invoked and `onInvalid` is not', async function(assert) {
    assert.expect(1);

    this.set('onSubmit', () => {
      assert.ok(true);
    });

    this.set('onInvalid', () => {
      assert.notOk(true);
    });

    await render(hbs`
      {{#paper-form onSubmit=(action onSubmit) onInvalid=(action onInvalid) as |form|}}
        {{form.input value=foo onChange=(action (mut foo)) label="Foo"}}
        {{form.input value=bar onChange=(action (mut bar)) label="Bar"}}

        <button type="button" onclick={{action form.onSubmit}}>Submit</button>

      {{/paper-form}}
    `);

    await click('button');
  });

  test('form `onInvalid` action is invoked and `onSubmit` is not when the form is not valid', async function(assert) {
    assert.expect(1);

    this.set('onSubmit', () => {
      assert.notOk(true);
    });

    this.set('onInvalid', () => {
      assert.ok(true);
    });

    await render(hbs`
      {{#paper-form onSubmit=(action onSubmit) onInvalid=(action onInvalid) as |form|}}
        {{form.input value="" required=true onChange=null}}

        <button type="submit">Submit</button>
      {{/paper-form}}
    `);

    await click('button[type=submit]');
  });

  test('form `onValidityChange` action is invoked', async function(assert) {
    // paper-input triggers `onValidityChange` on render
    // so we expect two runs: one on render and another on validity change
    assert.expect(9);

    this.set('onValidityChange', (isValid, isTouched, isInvalidAndTouched) => {
      assert.ok(isValid);
      assert.notOk(isTouched);
      assert.notOk(isInvalidAndTouched);
    });

    await render(hbs`
      {{#paper-form onValidityChange=(action onValidityChange) as |form|}}
        {{form.input value=foo onChange=(action (mut foo)) label="Foo"}}
        {{form.input value=bar onChange=(action (mut bar)) label="Bar" errors=errors}}
      {{/paper-form}}
    `);

    this.set('onValidityChange', (isValid, isTouched, isInvalidAndTouched) => {
      assert.ok(isValid);
      assert.ok(isTouched);
      assert.notOk(isInvalidAndTouched);
    });

    await triggerEvent('input:first-of-type', 'blur');

    this.set('onValidityChange', (isValid, isTouched, isInvalidAndTouched) => {
      assert.notOk(isValid);
      assert.ok(isTouched);
      assert.ok(isInvalidAndTouched);
    });

    this.set('errors', [{
      message: 'foo should be a number.',
      attribute: 'foo'
    }, {
      message: 'foo should be smaller than 12.',
      attribute: 'foo'
    }]);

  });

  test('form is reset after submit action is invoked', async function(assert) {
    assert.expect(3);

    await render(hbs`
      {{#paper-form as |form|}}
        {{form.input value=foo onChange=(action (mut foo)) label="Foo"}}
        {{form.input value=bar onChange=(action (mut bar)) label="Bar"}}

        <button onclick={{action form.onSubmit}}>Submit</button>

      {{/paper-form}}
    `);

    // no touched inputs
    assert.dom('.ng-dirty').doesNotExist();

    await triggerEvent('input:first-of-type', 'blur');

    // there is a dirty input
    assert.dom('.ng-dirty').exists({ count: 1 });

    await click('button');

    assert.dom('.ng-dirty').doesNotExist('inputs were reset');
  });

  test('works without using contextual components', async function(assert) {
    assert.expect(4);

    await render(hbs`
      {{#paper-form as |form|}}
        {{paper-input value=foo onChange=(action (mut foo)) label="Foo"}}
        {{paper-input value=bar onChange=(action (mut bar)) label="Bar" errors=errors}}

        {{#if form.isInvalid}}
          <div class="invalid-div">Form is invalid!</div>
        {{/if}}
        {{#if form.isValid}}
          <div class="valid-div">Form is valid!</div>
        {{/if}}

      {{/paper-form}}
    `);

    assert.dom('.invalid-div').doesNotExist();
    assert.dom('.valid-div').exists({ count: 1 });

    this.set('errors', [{
      message: 'foo should be a number.',
      attribute: 'foo'
    }, {
      message: 'foo should be smaller than 12.',
      attribute: 'foo'
    }]);

    assert.dom('.invalid-div').exists({ count: 1 });
    assert.dom('.valid-div').doesNotExist();
  });

  test('form submit button renders', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#paper-form as |form|}}
        {{#form.submit-button}}Submit{{/form.submit-button}}
      {{/paper-form}}
    `);

    assert.dom('button').exists({ count: 1 });
  });

  test('form submit button calls form onSubmit action', async function(assert) {
    assert.expect(1);

    this.set('onSubmit', () => {
      assert.ok(true);
    });

    await render(hbs`
      {{#paper-form onSubmit=(action onSubmit) as |form|}}
        {{#form.submit-button}}Submit{{/form.submit-button}}
      {{/paper-form}}
    `);

    await click('button');
  });

  test('form submit button is of type submit', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#paper-form as |form|}}
        {{#form.submit-button}}Submit{{/form.submit-button}}
      {{/paper-form}}
    `);

    assert.dom('button').hasAttribute('type', 'submit');
  });

  test('form submit button component can be customized by passing `submitButtonComponent`', async function(assert) {
    assert.expect(1);

    this.owner.register('component:custom-submit-button', Component.extend({
      classNames: ['custom-submit-button']
    }));

    await render(hbs`
      {{#paper-form submitButtonComponent="custom-submit-button" as |form|}}
        {{form.submit-button}}
      {{/paper-form}}
    `);

    assert.dom('.custom-submit-button')
      .exists({ count: 1 }, 'custom submit button is displayed');
  });

  test('form `onSubmit` action is invoked when form element is submitted', async function(assert) {
    assert.expect(1);

    this.set('onSubmit', () => {
      assert.ok(true);
    });

    await render(hbs`
      {{#paper-form onSubmit=(action onSubmit) as |form|}}
        {{form.input value=foo onChange=(action (mut foo)) label="Foo"}}
        {{form.input value=bar onChange=(action (mut bar)) label="Bar"}}

        <input type="submit" value="Submit">

      {{/paper-form}}
    `);

    await click('input[type=submit]');
  });

  test('yielded form.input renders the `paper-input`-component', async function(assert) {
    assert.expect(1);

    this.owner.register('component:paper-input', Component.extend({
      classNames: ['paper-input']
    }));

    await render(hbs`
      {{#paper-form as |form|}}
        {{form.input}}
      {{/paper-form}}
    `);

    assert.dom('.paper-input')
      .exists({ count: 1 }, 'paper-input component displayed');
  });

  test('yielded form.input can be customized by passing `inputComponent`', async function(assert) {
    assert.expect(2);

    this.owner.register('component:paper-input', Component.extend({
      classNames: ['paper-input']
    }));

    this.owner.register('component:custom-input', Component.extend({
      classNames: ['custom-input']
    }));

    await render(hbs`
      {{#paper-form inputComponent="custom-input" as |form|}}
        {{form.input}}
      {{/paper-form}}
    `);

    assert.dom('.paper-input')
      .doesNotExist('paper-input component is not displayed');
    assert.dom('.custom-input')
      .exists({ count: 1 }, 'custom input-component is displayed');
  });

  test('yielded form.select renders `paper-select`-component', async function(assert) {
    assert.expect(1);

    this.owner.register('component:paper-select', Component.extend({
      classNames: ['paper-select']
    }));

    await render(hbs`
      {{#paper-form as |form|}}
        {{form.select}}
      {{/paper-form}}
    `);

    assert.dom('.paper-select')
      .exists({ count: 1 }, 'paper-select is displayed');
  });

  test('yielded form.select can be customized by passing `selectComponent`', async function(assert) {
    assert.expect(2);

    this.owner.register('component:paper-select', Component.extend({
      classNames: ['paper-select']
    }));

    this.owner.register('component:custom-select', Component.extend({
      classNames: ['custom-select']
    }));

    await render(hbs`
      {{#paper-form selectComponent="custom-select" as |form|}}
        {{form.select}}
      {{/paper-form}}
    `);

    assert.dom('.paper-select')
      .doesNotExist('paper-select component is not displayed');
    assert.dom('.custom-select')
      .exists({ count: 1 }, 'custom select-component is displayed');
  });

  test('yielded form.autocomplete renders `paper-autocomplete`-component', async function(assert) {
    assert.expect(1);

    this.owner.register('component:paper-autocomplete', Component.extend({
      classNames: ['paper-autocomplete']
    }));

    await render(hbs`
      {{#paper-form as |form|}}
        {{form.autocomplete}}
      {{/paper-form}}
    `);

    assert.dom('.paper-autocomplete')
      .exists({ count: 1 }, 'paper-autocomplete is displayed');
  });

  test('yielded form.autocomplete can be customized by passing `autocompleteComponent`', async function(assert) {
    assert.expect(2);

    this.owner.register('component:paper-autocomplete', Component.extend({
      classNames: ['paper-autocomplete']
    }));

    this.owner.register('component:custom-autocomplete', Component.extend({
      classNames: ['custom-autocomplete']
    }));

    await render(hbs`
      {{#paper-form autocompleteComponent="custom-autocomplete" as |form|}}
        {{form.autocomplete}}
      {{/paper-form}}
    `);

    assert.dom('.paper-autocomplete')
      .doesNotExist('paper-autocomplete component is not displayed');
    assert.dom('.custom-autocomplete')
      .exists({ count: 1 }, 'custom autocomplete-component is displayed');
  });
});
