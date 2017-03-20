import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

const { Component } = Ember;

moduleForComponent('paper-input', 'Integration | Component | paper input', {
  integration: true,
  beforeEach() {
    this.dummyOnChange = () => {};
  }
});

test('renders with correct label', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-input label="Name" onChange=dummyOnChange}}`);

  assert.equal(this.$('md-input-container label').text(), 'Name');
});

test('renders with left icon', function(assert) {
  assert.expect(2);

  this.render(hbs`{{paper-input icon="person" onChange=dummyOnChange}}`);

  assert.ok(this.$('md-input-container md-icon').length);
  assert.ok(this.$('md-input-container').hasClass('md-has-icon'));
});

test('renders with right icon', function(assert) {
  assert.expect(3);

  this.render(hbs`{{paper-input label="name" iconRight="person" onChange=dummyOnChange}}`);

  assert.ok(this.$('md-input-container md-icon').length);
  assert.ok(this.$('md-input-container').hasClass('md-has-icon'));
  assert.ok(this.$('md-input-container').hasClass('md-icon-right'));
});

test('renders with a custom icon component when `iconComponent` is specified', function(assert) {
  assert.expect(2);

  this.register('component:custom-icon', Component.extend({
    classNames: ['custom-icon']
  }));

  this.render(hbs`{{paper-input iconComponent="custom-icon" icon="person" onChange=dummyOnChange}}`);

  assert.equal(this.$('md-input-container md-icon').length, 0, 'default icon component is not rendered');
  assert.equal(this.$('md-input-container .custom-icon').length, 1, 'custom icon component rendered');
});

test('renders with a custom icon component when `iconComponent` is specified and icon should be displayed on the right', function(assert) {
  assert.expect(2);

  this.register('component:custom-icon', Component.extend({
    classNames: ['custom-icon']
  }));

  this.render(hbs`{{paper-input iconComponent="custom-icon" iconRight="person" onChange=dummyOnChange}}`);

  assert.equal(this.$('md-input-container md-icon').length, 0, 'default icon component is not rendered');
  assert.equal(this.$('md-input-container .custom-icon').length, 1, 'custom icon component rendered');
});

test('renders input with id', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-input inputElementId="testId" onChange=dummyOnChange}}`);

  let actual = this.$('md-input-container input').attr('id');
  let expected = 'testId';
  assert.equal(actual, expected);
});

test('renders input with placeholder', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-input placeholder="Enter value here" onChange=dummyOnChange}}`);

  let actual = this.$('md-input-container input').attr('placeholder');
  let expected = 'Enter value here';
  assert.equal(actual, expected);
});

test('renders input with value', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-input value="current value" onChange=dummyOnChange}}`);

  let actual = this.$('md-input-container input').val();
  let expected = 'current value';
  assert.equal(actual, expected);
});

test('renders input as disabled', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-input disabled=true onChange=dummyOnChange}}`);

  let actual = this.$('md-input-container input').attr('disabled');
  let expected = 'disabled';
  assert.equal(actual, expected);
});

test('renders input as required', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-input passThru=(hash required="required") onChange=dummyOnChange}}`);

  let actual = this.$('md-input-container input').attr('required');
  let expected = 'required';
  assert.equal(actual, expected);
});

test('renders input as autofocus', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-input autofocus=true onChange=dummyOnChange}}`);

  let actual = this.$('md-input-container input').attr('autofocus');
  let expected = 'autofocus';
  assert.equal(actual, expected);
});

test('renders input with accept types of files', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-input passThru=(hash accept="audio/*|video/*|image/*") onChange=dummyOnChange}}`);

  let actual = this.$('md-input-container input').attr('accept');
  let expected = 'audio/*|video/*|image/*';
  assert.equal(actual, expected);
});

test('renders input with attribute autocomplete', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-input passThru=(hash autocomplete="autocomplete") onChange=dummyOnChange}}`);

  let actual = this.$('md-input-container input').attr('autocomplete');
  let expected = 'autocomplete';

  assert.equal(actual, expected);
});

test('renders input with attribute autocorrect', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-input passThru=(hash autocorrect="autocorrect") onChange=dummyOnChange}}`);

  let actual = this.$('md-input-container input').attr('autocorrect');
  let expected = 'autocorrect';

  assert.equal(actual, expected);
});

test('renders input with attribute autocapitalize', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-input passThru=(hash autocapitalize="autocapitalize") onChange=dummyOnChange}}`);

  let actual = this.$('md-input-container input').attr('autocapitalize');
  let expected = 'autocapitalize';

  assert.equal(actual, expected);
});

test('renders input with attribute form', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-input passThru=(hash form="myform") onChange=dummyOnChange onChange=dummyOnChange}}`);

  let actual = this.$('md-input-container input').attr('form');
  let expected = 'myform';

  assert.equal(actual, expected);
});

test('renders input with attribute formnovalidate', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-input passThru=(hash formnovalidate="formnovalidate") onChange=dummyOnChange}}`);

  let actual = this.$('md-input-container input').attr('formnovalidate');
  let expected = 'formnovalidate';

  assert.equal(actual, expected);
});

test('renders input with attribute formtarget', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-input passThru=(hash formtarget="_blank") onChange=dummyOnChange}}`);

  let actual = this.$('md-input-container input').attr('formtarget');
  let expected = '_blank';

  assert.equal(actual, expected);
});

test('renders input with attribute formenctype', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-input passThru=(hash formenctype="multipart/form-data") onChange=dummyOnChange}}`);

  let actual = this.$('md-input-container input').attr('formenctype');
  let expected = 'multipart/form-data';

  assert.equal(actual, expected);
});

test('renders input with multiple passThru attributes', function(assert) {
  assert.expect(5);

  this.render(hbs`{{paper-input type="submit" passThru=(hash form="myform" formnovalidate="formnovalidate" formtarget="_blank" formenctype="multipart/form-data") onChange=dummyOnChange}}`);

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

test('renders input with input mode attribute', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-input passThru=(hash inputmode="numeric") onChange=dummyOnChange}}`);

  let $input = this.$('md-input-container input');

  let actual = $input.attr('inputmode');
  let expected = 'numeric';
  assert.equal(actual, expected);
});

test('renders input with multiple attributes', function(assert) {
  assert.expect(12);

  this.render(hbs`{{paper-input type="submit"
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

test('char counter works', function(assert) {
  assert.expect(3);

  this.value = 'aaabbb';

  this.render(hbs`
    {{paper-input value=value onChange=(action (mut value)) maxlength=8}}
  `);

  assert.equal(this.$('.md-char-counter').length, 1, 'renders the char counter');
  assert.equal(this.$('.md-char-counter').text().trim(), '6/8');

  this.set('value', 'aa');

  assert.equal(this.$('.md-char-counter').text().trim(), '2/8');
});

test('built-in validations work', function(assert) {
  assert.expect(2);

  this.value = 'aaabbbccc';

  this.render(hbs`
    {{paper-input value=value onChange=dummyOnChange isTouched=true
      maxlength=8}}
  `);

  assert.equal(this.$('.paper-input-error').length, 1, 'renders one error');
  assert.equal(this.$('.paper-input-error').first().text().trim(), 'Must not exceed 8 characters.');
});

test('custom validations work', function(assert) {
  assert.expect(3);

  this.value = 'aaabbbccc';
  this.customValidations = [{
    param: 'notinclude',
    message: 'You can\'t include the substring %@.',
    validate: (value, notinclude) => typeof value === 'string' && value.indexOf(notinclude) === -1
  }];

  this.render(hbs`
    {{paper-input value=value onChange=dummyOnChange isTouched=true
      maxlength=8 customValidations=customValidations notinclude="cc"}}
  `);

  assert.equal(this.$('.paper-input-error').length, 2, 'renders two errors');
  assert.equal(this.$('.paper-input-error').first().text().trim(), 'Must not exceed 8 characters.');
  assert.equal(this.$('.paper-input-error').last().text().trim(), 'You can\'t include the substring cc.');
});

test('changing param in built-in validations works', function(assert) {
  assert.expect(3);

  this.value = '';
  this.required = false;

  this.render(hbs`
    {{paper-input value=value onChange=dummyOnChange isTouched=true
      required=required}}
  `);

  assert.equal(this.$('.paper-input-error').length, 0, 'no errors');

  this.set('required', true);

  assert.equal(this.$('.paper-input-error').length, 1, 'renders one error');
  assert.equal(this.$('.paper-input-error').first().text().trim(), 'This is required.');
});

test('changing param in custom validations works', function(assert) {
  assert.expect(6);

  this.value = 'aaabbbccc';
  this.notinclude = 'cc';
  this.customValidations = [{
    param: 'notinclude',
    message: 'You can\'t include the substring %@.',
    validate: (value, notinclude) => typeof value === 'string' && value.indexOf(notinclude) === -1
  }];

  this.render(hbs`
    {{paper-input value=value onChange=dummyOnChange isTouched=true
      maxlength=8 customValidations=customValidations notinclude=notinclude}}
  `);

  assert.equal(this.$('.paper-input-error').length, 2, 'renders two errors');
  assert.equal(this.$('.paper-input-error').first().text().trim(), 'Must not exceed 8 characters.');
  assert.equal(this.$('.paper-input-error').last().text().trim(), 'You can\'t include the substring cc.');

  this.set('notinclude', 'bb');

  assert.equal(this.$('.paper-input-error').length, 2, 'renders two errors');
  assert.equal(this.$('.paper-input-error').first().text().trim(), 'Must not exceed 8 characters.');
  assert.equal(this.$('.paper-input-error').last().text().trim(), 'You can\'t include the substring bb.');
});

test('custom validations without param work', function(assert) {
  assert.expect(3);

  this.value = 'aaabbbccc';
  this.customValidations = [{
    message: 'You can\'t include the substring cc.',
    validate: (value) => typeof value === 'string' && value.indexOf('cc') === -1
  }];

  this.render(hbs`
    {{paper-input value=value onChange=dummyOnChange isTouched=true
      maxlength=8 customValidations=customValidations}}
  `);

  assert.equal(this.$('.paper-input-error').length, 2, 'renders two errors');
  assert.equal(this.$('.paper-input-error').first().text().trim(), 'Must not exceed 8 characters.');
  assert.equal(this.$('.paper-input-error').last().text().trim(), 'You can\'t include the substring cc.');
});

test('can override any validation message', function(assert) {
  assert.expect(3);

  this.value = 'aaabbbccc';
  this.customValidations = [{
    param: 'notinclude',
    message: 'You can\'t include the substring %@.',
    validate: (value, notinclude) => typeof value === 'string' && value.indexOf(notinclude) === -1
  }];

  this.render(hbs`
    {{paper-input value=value onChange=dummyOnChange isTouched=true
      maxlength=8 customValidations=customValidations notinclude="cc"
      errorMessages=(hash
        maxlength="Too small, baby!"
        notinclude="Can't have %@, baby!"
      )}}
  `);

  assert.equal(this.$('.paper-input-error').length, 2, 'renders two errors');
  assert.equal(this.$('.paper-input-error').first().text().trim(), 'Too small, baby!');
  assert.equal(this.$('.paper-input-error').last().text().trim(), 'Can\'t have cc, baby!');
});

test('renders error messages from an external `errors` array', function(assert) {
  assert.expect(3);

  this.errors = [{
    message: 'foo should be a number.',
    attribute: 'foo'
  }, {
    message: 'foo should be smaller than 12.',
    attribute: 'foo'
  }];

  this.render(hbs`{{paper-input onChange=dummyOnChange errors=errors isTouched=true}}`);

  assert.equal(this.$('.paper-input-error').length, 2, 'renders two errors');
  assert.equal(this.$('.paper-input-error').first().text().trim(), 'foo should be a number.');
  assert.equal(this.$('.paper-input-error').last().text().trim(), 'foo should be smaller than 12.');
});

test('renders error messages from an external `errors` string array', function(assert) {
  assert.expect(3);

  this.errors = [
    'foo should be a number.',
    'foo should be smaller than 12.'
  ];

  this.render(hbs`{{paper-input onChange=dummyOnChange errors=errors isTouched=true}}`);

  assert.equal(this.$('.paper-input-error').length, 2, 'renders two errors');
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

test('displayed input value matches actual input value', function(assert) {
  assert.expect(4);

  this.set('value', '');
  this.onChange = () => {
    this.set('value', '123');
  };

  this.render(hbs`{{paper-input onChange=onChange value=value}}`);

  this.$('input, textarea').val('12345').trigger('input');

  return wait().then(() => {
    assert.equal(this.$('input, textarea').val(), '123', 'input value should be 123');
    assert.equal(this.value, '123', 'component value should be 123');

    this.$('input, textarea').val('abcdefg').trigger('input');

    return wait();
  }).then(() => {
    assert.equal(this.$('input, textarea').val(), '123', 'input values do not match');
    assert.equal(this.value, '123', 'component value should be 123');
  });
});

test('displayed input value matches actual input value with no onChange method', function(assert) {
  assert.expect(2);

  this.set('value', 'foo');

  this.render(hbs`{{paper-input onChange=null value=value}}`);

  this.$('input, textarea').val('12345').trigger('input');
  assert.equal(this.$('input, textarea').val(), 'foo', 'input value should be `foo` (component value)');
  assert.equal(this.get('value'), 'foo', 'component value should be foo');
});

test('errors only show after input is touched and input is invalid', function(assert) {
  assert.expect(4);

  let errors = [{
    message: 'foo should be a number.',
    attribute: 'foo'
  }];
  this.set('errors', errors);

  this.render(hbs`{{paper-input onChange=null errors=errors}}`);

  assert.equal(this.$('.md-input-invalid').length, 0, 'does not render md-input-invalid class');
  assert.equal(this.$('.paper-input-error').length, 0, 'renders zero errors');
  this.$('input, textarea').trigger('blur');
  assert.equal(this.$('.paper-input-error').length, 1, 'render md-input-invalid class');
  assert.equal(this.$('.md-input-invalid').length, 1, 'renders one error');
});

test('hasValue works when user types', function(assert) {
  this.foo = '';
  this.render(hbs`{{paper-input value=foo onChange=(action (mut foo))}}`);

  assert.notOk(
    this.$('md-input-container').hasClass('md-input-has-value'),
    'should not have md-input-has-value class if input does not have value'
  );

  let $input = this.$('md-input-container input');
  $input.val('abc').trigger('input');

  assert.ok(
    this.$('md-input-container').hasClass('md-input-has-value'),
    'should have md-input-has-value class if input has value'
  );
});

test('hasValue works when `value` updated programatically', function(assert) {
  this.foo = '';
  this.render(hbs`{{paper-input value=foo onChange=(action (mut foo))}}`);

  assert.notOk(
    this.$('md-input-container').hasClass('md-input-has-value'),
    'should not have md-input-has-value class if input does not have value'
  );

  this.set('foo', 'abc');

  assert.ok(
    this.$('md-input-container').hasClass('md-input-has-value'),
    'should have md-input-has-value class if input has value'
  );
});

test('can render other stuff using paper-input block', function(assert) {
  this.foo = '';
  this.render(hbs`
    {{#paper-input value=foo onChange=(action (mut foo))}}
      <div class="other-stuff"></div>
    {{/paper-input}}
  `);

  assert.equal(this.$('.other-stuff').length, 1);
});
