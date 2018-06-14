import Component from '@ember/component';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, fillIn, triggerEvent, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper input', function(hooks) {
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

    assert.ok(findAll('md-input-container md-icon').length);
    assert.dom('md-input-container').hasClass('md-icon-left');
  });

  test('renders with right icon', async function(assert) {
    assert.expect(2);

    await render(hbs`{{paper-input label="name" iconRight="person" onChange=dummyOnChange}}`);

    assert.ok(findAll('md-input-container md-icon').length);
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

    let actual = find('md-input-container input').id;
    let expected = 'testId';
    assert.equal(actual, expected);
  });

  test('renders input with placeholder', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input placeholder="Enter value here" onChange=dummyOnChange}}`);

    let actual = find('md-input-container input').getAttribute('placeholder');
    let expected = 'Enter value here';
    assert.equal(actual, expected);
  });

  test('renders input with value', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input value="current value" onChange=dummyOnChange}}`);

    let actual = find('md-input-container input').value;
    let expected = 'current value';
    assert.equal(actual, expected);
  });

  test('renders input as disabled', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input disabled=true onChange=dummyOnChange}}`);

    let actual = find('md-input-container input').getAttribute('disabled');
    let expected = 'disabled';
    assert.equal(actual, expected);
  });

  test('renders input as required', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash required="required") onChange=dummyOnChange}}`);

    let actual = find('md-input-container input').getAttribute('required');
    let expected = 'required';
    assert.equal(actual, expected);
  });

  test('renders input as autofocus', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input autofocus=true onChange=dummyOnChange}}`);

    let actual = find('md-input-container input').getAttribute('autofocus');
    let expected = 'autofocus';
    assert.equal(actual, expected);
  });

  test('renders input with accept types of files', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash accept="audio/*|video/*|image/*") onChange=dummyOnChange}}`);

    let actual = find('md-input-container input').getAttribute('accept');
    let expected = 'audio/*|video/*|image/*';
    assert.equal(actual, expected);
  });

  test('renders input with attribute autocomplete', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash autocomplete="autocomplete") onChange=dummyOnChange}}`);

    let actual = find('md-input-container input').getAttribute('autocomplete');
    let expected = 'autocomplete';

    assert.equal(actual, expected);
  });

  test('renders input with attribute autocorrect', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash autocorrect="autocorrect") onChange=dummyOnChange}}`);

    let actual = find('md-input-container input').getAttribute('autocorrect');
    let expected = 'autocorrect';

    assert.equal(actual, expected);
  });

  test('renders input with attribute autocapitalize', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash autocapitalize="autocapitalize") onChange=dummyOnChange}}`);

    let actual = find('md-input-container input').getAttribute('autocapitalize');
    let expected = 'autocapitalize';

    assert.equal(actual, expected);
  });

  test('renders input with attribute form', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash form="myform") onChange=dummyOnChange onChange=dummyOnChange}}`);

    let actual = find('md-input-container input').getAttribute('form');
    let expected = 'myform';

    assert.equal(actual, expected);
  });

  test('renders input with attribute formnovalidate', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash formnovalidate="formnovalidate") onChange=dummyOnChange}}`);

    let actual = find('md-input-container input').getAttribute('formnovalidate');
    let expected = 'formnovalidate';

    assert.equal(actual, expected);
  });

  test('renders input with attribute formtarget', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash formtarget="_blank") onChange=dummyOnChange}}`);

    let actual = find('md-input-container input').getAttribute('formtarget');
    let expected = '_blank';

    assert.equal(actual, expected);
  });

  test('renders input with attribute formenctype', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash formenctype="multipart/form-data") onChange=dummyOnChange}}`);

    let actual = find('md-input-container input').getAttribute('formenctype');
    let expected = 'multipart/form-data';

    assert.equal(actual, expected);
  });

  test('renders input with multiple passThru attributes', async function(assert) {
    assert.expect(5);

    await render(
      hbs`{{paper-input type="submit" passThru=(hash form="myform" formnovalidate="formnovalidate" formtarget="_blank" formenctype="multipart/form-data") onChange=dummyOnChange}}`
    );

    let $input = this.$('md-input-container input');

    let actual = $input.attr('type');
    let expected = 'submit';
    assert.equal(actual, expected);

    actual = $input.attr('form');
    expected = 'myform';
    assert.equal(actual, expected);

    actual = $input.attr('formnovalidate');
    expected = 'formnovalidate';
    assert.equal(actual, expected);

    actual = $input.attr('formtarget');
    expected = '_blank';
    assert.equal(actual, expected);

    actual = $input.attr('formenctype');
    expected = 'multipart/form-data';
    assert.equal(actual, expected);

  });

  test('renders input with input mode attribute', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-input passThru=(hash inputmode="numeric") onChange=dummyOnChange}}`);

    let $input = this.$('md-input-container input');

    let actual = $input.attr('inputmode');
    let expected = 'numeric';
    assert.equal(actual, expected);
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

    let $input = this.$('md-input-container input');

    let actual = $input.attr('type');
    let expected = 'submit';
    assert.equal(actual, expected);

    actual = $input.attr('min');
    expected = '2';
    assert.equal(actual, expected);

    actual = $input.attr('maxlength');
    expected = '20';
    assert.equal(actual, expected);

    actual = $input.attr('max');
    expected = '42';
    assert.equal(actual, expected);

    actual = $input.attr('multiple');
    expected = 'multiple';
    assert.equal(actual, expected);

    actual = $input.attr('name');
    expected = 'elementname';
    assert.equal(actual, expected);

    actual = $input.attr('pattern');
    expected = '(999)999-9999';
    assert.equal(actual, expected);

    actual = $input.attr('readonly');
    expected = 'readonly';
    assert.equal(actual, expected);

    actual = $input.attr('size');
    expected = '30';
    assert.equal(actual, expected);

    actual = $input.attr('spellcheck');
    expected = 'true';
    assert.equal(actual, expected);

    actual = $input.attr('step');
    expected = '2';
    assert.equal(actual, expected);

    actual = $input.attr('tabindex');
    expected = '1138';
    assert.equal(actual, expected);

  });

  test('char counter works', async function(assert) {
    assert.expect(3);

    this.value = 'aaabbb';

    await render(hbs`
      {{paper-input value=value onChange=(action (mut value)) maxlength=8}}
    `);

    assert.dom('.md-char-counter').exists({ count: 1 }, 'renders the char counter');
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
    assert.equal(this.$('.paper-input-error').first().text().trim(), 'Must not exceed 8 characters.');
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
    assert.equal(this.$('.paper-input-error').first().text().trim(), 'Must not exceed 8 characters.');
    assert.equal(this.$('.paper-input-error').last().text().trim(), 'You can\'t include the substring cc.');
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
    assert.equal(this.$('.paper-input-error').first().text().trim(), 'This is required.');
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
    assert.equal(this.$('.paper-input-error').first().text().trim(), 'Must not exceed 8 characters.');
    assert.equal(this.$('.paper-input-error').last().text().trim(), 'You can\'t include the substring cc.');

    this.set('notinclude', 'bb');

    assert.dom('.paper-input-error').exists({ count: 2 }, 'renders two errors');
    assert.equal(this.$('.paper-input-error').first().text().trim(), 'Must not exceed 8 characters.');
    assert.equal(this.$('.paper-input-error').last().text().trim(), 'You can\'t include the substring bb.');
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
    assert.equal(this.$('.paper-input-error').first().text().trim(), 'Must not exceed 8 characters.');
    assert.equal(this.$('.paper-input-error').last().text().trim(), 'You can\'t include the substring cc.');
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
    assert.equal(this.$('.paper-input-error').first().text().trim(), 'Too small, baby!');
    assert.equal(this.$('.paper-input-error').last().text().trim(), 'Can\'t have cc, baby!');
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
    assert.equal(this.$('.paper-input-error').first().text().trim(), 'foo should be a number.');
    assert.equal(this.$('.paper-input-error').last().text().trim(), 'foo should be smaller than 12.');
  });

  test('renders error messages from an external `errors` string array', async function(assert) {
    assert.expect(3);

    this.errors = [
      'foo should be a number.',
      'foo should be smaller than 12.'
    ];

    await render(hbs`{{paper-input onChange=dummyOnChange errors=errors isTouched=true}}`);

    assert.dom('.paper-input-error').exists({ count: 2 }, 'renders two errors');
    assert.equal(this.$('.paper-input-error').first().text().trim(), 'foo should be a number.');
    assert.equal(this.$('.paper-input-error').last().text().trim(), 'foo should be smaller than 12.');
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

    await fillIn('input, textarea', '12345');

    return settled().then(async () => {
      assert.dom('input, textarea').hasValue('123', 'input value should be 123');
      assert.equal(this.value, '123', 'component value should be 123');

      await fillIn('input, textarea', 'abcdefg');

      return settled();
    }).then(() => {
      assert.dom('input, textarea').hasValue('123', 'input values do not match');
      assert.equal(this.value, '123', 'component value should be 123');
    });
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
      .hasClass('md-input-has-value', 'should have md-input-has-value class if input has value'
    );
  });

  test('hasValue works when `value` updated programatically', async function(assert) {
    this.foo = '';
    await render(hbs`{{paper-input value=foo onChange=(action (mut foo))}}`);

    assert.dom('md-input-container').hasNoClass(
      'md-input-has-value',
      'should not have md-input-has-value class if input does not have value'
    );

    this.set('foo', 'abc');

    assert.dom('md-input-container').hasClass(
      'md-input-has-value',
      'should have md-input-has-value class if input has value'
    );
  });

  test('can render other stuff using paper-input block', async function(assert) {
    this.foo = '';
    await render(hbs`
      {{#paper-input value=foo onChange=(action (mut foo))}}
        <div class="other-stuff"></div>
      {{/paper-input}}
    `);

    assert.dom('.other-stuff').exists({ count: 1 });
  });
});
