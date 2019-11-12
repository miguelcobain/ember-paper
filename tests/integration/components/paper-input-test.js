import Component from '@ember/component';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, fillIn, triggerEvent, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper-input', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.dummyOnChange = () => {};
  });

  test('renders with correct label', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input label="Name" onChange=dummyOnChange}}`);
    assert.dom('md-input-container label').hasText('Name');
  });

  test('renders with left icon', async function(assert) {
    assert.expect(2);

    await render(hbs`{{paper-input icon="person" onChange=dummyOnChange}}`);

    assert.dom('md-input-container md-icon').exists({ count: 1 }, 'renders with left icon');
    assert.dom('md-input-container').hasClass('md-icon-left');
  });

  test('renders with right icon', async function(assert) {
    assert.expect(2);

    await render(hbs`{{paper-input label="name" iconRight="person" onChange=dummyOnChange}}`);

    assert.dom('md-input-container md-icon').exists({ count: 1 }, 'renders with right icon');
    assert.dom('md-input-container').hasClass('md-icon-right');
  });

  test('renders with a custom icon component when `iconComponent` is specified', async function(assert) {
    assert.expect(2);

    this.owner.register('component:custom-icon', Component.extend({
      classNames: ['custom-icon']
    }));

    await render(hbs`{{paper-input iconComponent="custom-icon" icon="person" onChange=dummyOnChange}}`);

    assert.dom('md-input-container md-icon').doesNotExist('default icon component is not rendered');
    assert.dom('md-input-container .custom-icon').exists({ count: 1 }, 'custom icon component rendered');

  });

  test('renders with a custom icon component when `iconComponent` is specified and icon should be displayed on the right', async function(assert) {
    assert.expect(2);

    this.owner.register('component:custom-icon', Component.extend({
      classNames: ['custom-icon']
    }));

    await render(hbs`{{paper-input iconComponent="custom-icon" iconRight="person" onChange=dummyOnChange}}`);

    assert.dom('md-input-container md-icon').doesNotExist('default icon component is not rendered');
    assert.dom('md-input-container .custom-icon').exists({ count: 1 }, 'custom icon component rendered');

  });

  test('renders input with id', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input inputElementId="testId" onChange=dummyOnChange}}`);

    assert.dom('md-input-container input').hasAttribute('id', 'testId');

  });

  test('renders input with placeholder', async function(assert) {
    assert.expect(2);

    await render(hbs`{{paper-input placeholder="Enter value here" onChange=dummyOnChange}}`);

    assert.dom('md-input-container input').hasAttribute('placeholder', 'Enter value here');
    assert.dom('md-input-container').hasClass('md-input-has-placeholder');

  });

  test('renders input with value', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input value="current value" onChange=dummyOnChange}}`);

    assert.dom('md-input-container input').hasValue('current value');
  });

  test('renders input with value that can be cleared', async function(assert) {
    assert.expect(2);

    this.set('value', 'current value');
    await render(hbs`{{paper-input value=value onChange=dummyOnChange}}`);
    assert.dom('md-input-container input').hasValue('current value');

    this.set('value', '');
    assert.dom('md-input-container input').hasValue('');
  });

  test('renders input as disabled', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input disabled=true onChange=dummyOnChange}}`);

    assert.dom('md-input-container input').isDisabled();
  });

  test('renders input as required', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash required="required") onChange=dummyOnChange}}`);

    assert.dom('md-input-container input').isRequired();
  });

  test('renders input as autofocus', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input autofocus=true onChange=dummyOnChange}}`);

    assert.dom('md-input-container input').hasAttribute('autofocus');
  });

  test('renders input with accept types of files', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash accept="audio/*|video/*|image/*") onChange=dummyOnChange}}`);

    assert.dom('md-input-container input').hasAttribute('accept', 'audio/*|video/*|image/*');
  });

  test('renders input with attribute autocomplete', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash autocomplete="autocomplete") onChange=dummyOnChange}}`);

    assert.dom('md-input-container input').hasAttribute('autocomplete', 'autocomplete');
  });

  test('renders input with attribute autocorrect', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash autocorrect="autocorrect") onChange=dummyOnChange}}`);

    assert.dom('md-input-container input').hasAttribute('autocorrect', 'autocorrect');

  });

  test('renders input with attribute autocapitalize', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash autocapitalize="autocapitalize") onChange=dummyOnChange}}`);

    assert.dom('md-input-container input').hasAttribute('autocapitalize', 'autocapitalize');
  });

  test('renders input with attribute form', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash form="myform") onChange=dummyOnChange onChange=dummyOnChange}}`);

    assert.dom('md-input-container input').hasAttribute('form', 'myform');
  });

  test('renders input with attribute formnovalidate', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash formnovalidate="formnovalidate") onChange=dummyOnChange}}`);

    assert.dom('md-input-container input').hasAttribute('formnovalidate', 'formnovalidate');
  });

  test('renders input with attribute formtarget', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash formtarget="_blank") onChange=dummyOnChange}}`);

    assert.dom('md-input-container input').hasAttribute('formtarget', '_blank');
  });

  test('renders input with attribute formenctype', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash formenctype="multipart/form-data") onChange=dummyOnChange}}`);

    assert.dom('md-input-container input').hasAttribute('formenctype', 'multipart/form-data');
  });

  test('renders input with multiple passThru attributes', async function(assert) {
    assert.expect(5);

    await render(
      hbs`{{paper-input type="submit" passThru=(hash form="myform" formnovalidate="formnovalidate" formtarget="_blank" formenctype="multipart/form-data") onChange=dummyOnChange}}`
    );

    assert.dom('md-input-container input').hasAttribute('type', 'submit');
    assert.dom('md-input-container input').hasAttribute('form', 'myform');
    assert.dom('md-input-container input').hasAttribute('formnovalidate', 'formnovalidate');
    assert.dom('md-input-container input').hasAttribute('formtarget', '_blank');
    assert.dom('md-input-container input').hasAttribute('formenctype', 'multipart/form-data');

  });

  test('renders input with input mode attribute', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash inputmode="numeric") onChange=dummyOnChange}}`);

    assert.dom('md-input-container input').hasAttribute('inputmode', 'numeric');
  });

  test('renders input with multiple attributes', async function(assert) {
    assert.expect(12);

    await render(hbs`{{paper-input type="submit"
        passThru=(hash
          min="2"
          maxlength="20"
          max="42"
          multiple="true"
          name="elementname"
          pattern="(999)999-9999"
          readonly="true"
          size="30"
          spellcheck="true"
          step="2"
          tabindex="1138"
        )
        onChange=dummyOnChange
      }}`);

    let input = find('md-input-container input');

    assert.dom(input).hasAttribute('type', 'submit');
    assert.dom(input).hasAttribute('min', '2');
    assert.dom(input).hasAttribute('maxlength', '20');
    assert.dom(input).hasAttribute('max', '42');
    // not sure why hasAttribute doesn't work for multiple
    assert.equal(input.multiple, true);
    assert.dom(input).hasAttribute('name', 'elementname');
    assert.dom(input).hasAttribute('pattern', '(999)999-9999');
    assert.dom(input).hasAttribute('readonly', 'true');
    assert.dom(input).hasAttribute('size', '30');
    assert.dom(input).hasAttribute('spellcheck', 'true');
    assert.dom(input).hasAttribute('step', '2');
    assert.dom(input).hasAttribute('tabindex', '1138');

  });

  test('char counter works', async function(assert) {
    assert.expect(3);

    this.value = 'aaabbb';

    await render(hbs`
      {{paper-input value=value onChange=(action (mut value)) maxlength=8}}
    `);

    assert.dom('.md-char-counter').exists({ count: 1 }, 'renders char counter');
    assert.dom('.md-char-counter').hasText('6/8');
    this.set('value', 'aa');

    assert.dom('.md-char-counter').hasText('2/8');
  });

  test('built-in validations work', async function(assert) {
    assert.expect(2);

    this.value = 'aaabbbccc';

    await render(hbs`
      {{paper-input value=value onChange=dummyOnChange isTouched=true
        maxlength=8}}
    `);

    assert.dom('.paper-input-error').exists({ count: 1 }, 'renders one error');
    assert.dom('.paper-input-error:first-child').hasText('Must not exceed 8 characters.');
  });

  test('custom validations work', async function(assert) {
    assert.expect(3);

    this.value = 'aaabbbccc';
    this.customValidations = [{
      param: 'notinclude',
      message: 'You can\'t include the substring %@.',
      validate: (value, notinclude) => typeof value === 'string' && value.indexOf(notinclude) === -1
    }];

    await render(hbs`
      {{paper-input value=value onChange=dummyOnChange isTouched=true
        maxlength=8 customValidations=customValidations notinclude="cc"}}
    `);

    assert.dom('.paper-input-error').exists({ count: 2 }, 'renders two errors');
    assert.dom('.paper-input-error:first-child').hasText('Must not exceed 8 characters.');
    assert.dom('.paper-input-error:last-child').hasText("You can't include the substring cc.");
  });

  test('changing param in built-in validations works', async function(assert) {
    assert.expect(3);

    this.value = '';
    this.required = false;

    await render(hbs`
      {{paper-input value=value onChange=dummyOnChange isTouched=true
        required=required}}
    `);

    assert.dom('.paper-input-error').doesNotExist('no errors');

    this.set('required', true);

    assert.dom('.paper-input-error').exists({ count: 1 }, 'renders one error');
    assert.dom('.paper-input-error:first-child').hasText('This is required.');
  });

  test('changing param in custom validations works', async function(assert) {
    assert.expect(6);

    this.value = 'aaabbbccc';
    this.notinclude = 'cc';
    this.customValidations = [{
      param: 'notinclude',
      message: 'You can\'t include the substring %@.',
      validate: (value, notinclude) => typeof value === 'string' && value.indexOf(notinclude) === -1
    }];

    await render(hbs`
      {{paper-input value=value onChange=dummyOnChange isTouched=true
        maxlength=8 customValidations=customValidations notinclude=notinclude}}
    `);

    assert.dom('.paper-input-error').exists({ count: 2 }, 'renders two errors');
    assert.dom('.paper-input-error:first-child').hasText('Must not exceed 8 characters.');
    assert.dom('.paper-input-error:last-child').hasText("You can't include the substring cc.");

    this.set('notinclude', 'bb');

    assert.dom('.paper-input-error').exists({ count: 2 });
    assert.dom('.paper-input-error:first-child').hasText('Must not exceed 8 characters.');
    assert.dom('.paper-input-error:last-child').hasText("You can't include the substring bb.");
  });

  test('custom validations without param work', async function(assert) {
    assert.expect(3);

    this.value = 'aaabbbccc';
    this.customValidations = [{
      message: 'You can\'t include the substring cc.',
      validate: (value) => typeof value === 'string' && value.indexOf('cc') === -1
    }];

    await render(hbs`
      {{paper-input value=value onChange=dummyOnChange isTouched=true
        maxlength=8 customValidations=customValidations}}
    `);

    assert.dom('.paper-input-error').exists({ count: 2 }, 'renders two errors');
    assert.dom('.paper-input-error:first-child').hasText('Must not exceed 8 characters.');
    assert.dom('.paper-input-error:last-child').hasText("You can't include the substring cc.");
  });

  test('can override any validation message', async function(assert) {
    assert.expect(3);

    this.value = 'aaabbbccc';
    this.customValidations = [{
      param: 'notinclude',
      message: 'You can\'t include the substring %@.',
      validate: (value, notinclude) => typeof value === 'string' && value.indexOf(notinclude) === -1
    }];

    await render(hbs`
      {{paper-input value=value onChange=dummyOnChange isTouched=true
        maxlength=8 customValidations=customValidations notinclude="cc"
        errorMessages=(hash
          maxlength="Too small, baby!"
          notinclude="Can't have %@, baby!"
        )}}
    `);

    assert.dom('.paper-input-error').exists({ count: 2 }, 'renders two errors');
    assert.dom('.paper-input-error:first-child').hasText('Too small, baby!');
    assert.dom('.paper-input-error:last-child').hasText("Can't have cc, baby!");
  });

  test('renders error messages from an external `errors` array', async function(assert) {
    assert.expect(3);

    this.errors = [{
      message: 'foo should be a number.',
      attribute: 'foo'
    }, {
      message: 'foo should be smaller than 12.',
      attribute: 'foo'
    }];

    await render(hbs`{{paper-input onChange=dummyOnChange errors=errors isTouched=true}}`);

    assert.dom('.paper-input-error').exists({ count: 2 }, 'renders two errors');
    assert.dom('.paper-input-error:first-child').hasText('foo should be a number.');
    assert.dom('.paper-input-error:last-child').hasText('foo should be smaller than 12.');
  });

  test('renders error messages from an external `errors` string array', async function(assert) {
    assert.expect(3);

    this.errors = [
      'foo should be a number.',
      'foo should be smaller than 12.'
    ];

    await render(hbs`{{paper-input onChange=dummyOnChange errors=errors isTouched=true}}`);

    assert.dom('.paper-input-error').exists({ count: 2 }, 'renders two errors');
    assert.dom('.paper-input-error:first-child').hasText('foo should be a number.');
    assert.dom('.paper-input-error:last-child').hasText('foo should be smaller than 12.');

  });

  /* test('the `onChange` action is mandatory for paper-input', function(assert) {
    assert.expect(1);

    assert.throws(() => {
      this.render(hbs`
        {{paper-input value="asd"}}
      `);
    }, /`onChange` action/);
  });*/

  test('displayed input value matches actual input value', async function(assert) {
    assert.expect(4);

    this.set('value', '');
    this.onChange = () => {
      this.set('value', '123');
    };

    await render(hbs`{{paper-input onChange=onChange value=value}}`);

    let input = find('input, textarea');

    input.value = '12345';

    await triggerEvent(input, 'input');
    await settled();
    assert.dom(input).hasValue('123');
    assert.equal(this.value, '123', 'component value should be 123');

    input.value = 'abcdefg';
    await triggerEvent(input, 'input');

    await settled();
    assert.dom(input).hasValue('123');
    assert.equal(this.value, '123', 'component value should be 123');

  });

  test('displayed input value matches actual input value with no onChange method', async function(assert) {
    this.set('value', 'foo');

    await render(hbs`{{paper-input onChange=null value=value}}`);

    await fillIn('input', '12345');

    assert.dom('input').hasValue('foo');
    assert.equal(this.get('value'), 'foo');
  });

  test('errors only show after input is touched and input is invalid', async function(assert) {
    assert.expect(4);

    let errors = [{
      message: 'foo should be a number.',
      attribute: 'foo'
    }];
    this.set('errors', errors);

    await render(hbs`{{paper-input onChange=null errors=errors}}`);

    assert.dom('.md-input-invalid').doesNotExist();
    assert.dom('.paper-input-error').doesNotExist();

    await triggerEvent('input', 'blur');

    assert.dom('.md-input-invalid').exists();
    assert.dom('.paper-input-error').exists({ count: 1 });
  });

  test('hasValue works when user types', async function(assert) {
    await render(hbs`{{paper-input value=foo onChange=(action (mut foo))}}`);

    assert.dom('md-input-container')
      .doesNotHaveClass('md-input-has-value', 'should not have md-input-has-value class if input does not have value');

    await fillIn('input', 'abc');

    assert.dom('md-input-container')
      .hasClass('md-input-has-value', 'should have md-input-has-value class if input has value');
  });

  test('hasValue works when `value` updated programatically', async function(assert) {
    this.foo = '';
    await render(hbs`{{paper-input value=foo onChange=(action (mut foo))}}`);

    assert.dom('md-input-container').doesNotHaveClass('md-input-has-value');

    this.set('foo', 'abc');

    assert.dom('md-input-container').hasClass('md-input-has-value');

  });

  test('can render other stuff using paper-input block', async function(assert) {
    this.foo = '';
    await render(hbs`
      {{#paper-input value=foo onChange=(action (mut foo))}}
        <div class="other-stuff"></div>
      {{/paper-input}}
    `);

    assert.dom('.other-stuff').exists();
  });

  test('does not have md-input-has-placeholder class when no placeholder', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input onChange=dummyOnChange}}`);

    assert.dom('md-input-container').doesNotHaveClass('md-input-has-placeholder');

  });

  test('does not have md-input-has-placeholder class when there is a label', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input label="Label here" onChange=dummyOnChange}}`);

    assert.dom('md-input-container').doesNotHaveClass('md-input-has-placeholder');

  });

  test('aria-describedby on input elements is set properly', async function(assert) {

    let errors = [{
      message: 'foo is required.',
      attribute: 'foo'
    }];
    this.set('errors', errors);

    await render(hbs`{{paper-input onChange=null errors=errors}}`);
    await triggerEvent('input', 'blur');

    let input = find('.md-input');
    let ariaDescribedbyValues = input.getAttribute('aria-describedby').split(' ');

    assert.equal(ariaDescribedbyValues.length, 2);

    assert.ok(ariaDescribedbyValues[0].includes('-char-count'));

    assert.dom(`#${ariaDescribedbyValues[0]}`).exists();

    assert.ok(ariaDescribedbyValues[1].includes('-error-messages'));

    assert.dom(`#${ariaDescribedbyValues[1]}`).exists();
  });

  test('title attribute is set properly', async function(assert) {
    await render(hbs`{{paper-input onChange=null title="important title"}}`);

    assert.dom('input').hasAttribute('title');
  });
});
