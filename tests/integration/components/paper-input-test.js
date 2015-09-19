import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-input', 'Integration | Component | paper input', {
    integration: true
});

test('renders default theme on wrapper', function (assert) {
    assert.expect(1);

    this.render(hbs`{{paper-input}}`);

    var actual = this.$('md-input-container').attr('class');
    var expected = 'ember-view md-default-theme';
    assert.equal(actual, expected);
});

test('renders with label', function (assert) {
    assert.expect(1);

    this.render(hbs`{{paper-input label="Name"}}`);

    var actual = this.$('md-input-container label').text();
    var expected = 'Name';
    assert.equal(actual, expected);
});

test('renders with icon', function (assert) {
    assert.expect(1);

    this.render(hbs`{{paper-input icon="person" icon-class="name"}}`);

    var actual = this.$('md-input-container md-icon').attr('class');
    var expected = 'name ember-view paper-icon md-font material-icons md-default-theme person';
    assert.equal(actual, expected);
});

test('renders input', function (assert) {
    assert.expect(2);

    this.render(hbs`{{paper-input icon="person" icon-class="name"}}`);

    var actual = this.$('md-input-container input');
    var expected = 'md-input ember-view ember-text-field';
    assert.equal(actual.attr('class'), expected);
    assert.equal(actual.attr('type'), 'text');
});

test('renders input with id', function (assert) {
    assert.expect(1);

    this.render(hbs`{{paper-input inputElementId="testId"}}`);

    var actual = this.$('md-input-container input').attr('id');
    var expected = 'testId';
    assert.equal(actual, expected);
});

test('renders input with placeholder', function (assert) {
    assert.expect(1);

    this.render(hbs`{{paper-input placeholder="Enter value here"}}`);

    var actual = this.$('md-input-container input').attr('placeholder');
    var expected = 'Enter value here';
    assert.equal(actual, expected);
});

test('renders input with value', function (assert) {
    assert.expect(1);

    this.render(hbs`{{paper-input value="current value"}}`);

    var actual = this.$('md-input-container input').val();
    var expected = 'current value';
    assert.equal(actual, expected);
});

test('renders input as disabled', function (assert) {
    assert.expect(1);

    this.render(hbs`{{paper-input disabled=true}}`);

    var actual = this.$('md-input-container input').attr('disabled');
    var expected = 'disabled';
    assert.equal(actual, expected);
});

test('renders input as required', function (assert) {
    assert.expect(1);

    this.render(hbs`{{paper-input required=true}}`);

    var actual = this.$('md-input-container input').attr('required');
    var expected = 'required';
    assert.equal(actual, expected);
});

test('renders input as autofocus', function (assert) {
    assert.expect(1);

    this.render(hbs`{{paper-input autofocus=true}}`);

    var actual = this.$('md-input-container input').attr('autofocus');
    var expected = 'autofocus';
    assert.equal(actual, expected);
});

test('renders input with accept types of files', function (assert) {
    assert.expect(1);

    this.render(hbs`{{paper-input attr-accept="audio/*|video/*|image/*"}}`);

    var actual = this.$('md-input-container input').attr('accept');
    var expected = 'audio/*|video/*|image/*';
    assert.equal(actual, expected);
});

test('renders input with attribute autocomplete', function (assert) {
    assert.expect(1);

    this.render(hbs`{{paper-input attr-autocomplete=true}}`);

    var actual = this.$('md-input-container input').attr('autocomplete');
    var expected = 'true';

    assert.equal(actual, expected);
});

test('renders input with attribute form', function (assert) {
    assert.expect(1);

    this.render(hbs`{{paper-input attr-form="myform"}}`);

    var actual = this.$('md-input-container input').attr('form');
    var expected = 'myform';

    assert.equal(actual, expected);
});

test('renders input with attribute formnovalidate', function (assert) {
    assert.expect(1);

    this.render(hbs`{{paper-input attr-formnovalidate="formnovalidate"}}`);

    var actual = this.$('md-input-container input').attr('formnovalidate');
    var expected = 'formnovalidate';

    assert.equal(actual, expected);
});

test('renders input with attribute formtarget', function (assert) {
    assert.expect(1);

    this.render(hbs`{{paper-input attr-formtarget="_blank"}}`);

    var actual = this.$('md-input-container input').attr('formtarget');
    var expected = '_blank';

    assert.equal(actual, expected);
});

test('renders input with attribute formenctype', function (assert) {
    assert.expect(1);

    this.render(hbs`{{paper-input attr-formenctype="multipart/form-data"}}`);

    var actual = this.$('md-input-container input').attr('formenctype');
    var expected = 'multipart/form-data';

    assert.equal(actual, expected);
});

test('renders input with multiple form attributes', function (assert) {
    assert.expect(5);

    this.render(hbs`{{paper-input type="submit" attr-form="myform" attr-formnovalidate="formnovalidate" attr-formtarget="_blank" attr-formenctype="multipart/form-data"}}`);

    var $input = this.$('md-input-container input');

    var actual = $input.attr('type');
    var expected = 'submit';
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

test('renders input with input mode attribute', function (assert) {
    assert.expect(1);

    this.render(hbs`{{paper-input attr-inputmode="numeric"}}`);

    var $input = this.$('md-input-container input');

    var actual = $input.attr('inputmode');
    var expected = 'numeric';
    assert.equal(actual, expected);
});

test('renders input with multiple attributes', function (assert) {
    assert.expect(12);

    this.render(hbs`{{paper-input type="submit"
        attr-min="2"
        attr-maxlength="20"
        attr-max="42"
        attr-multiple="true"
        attr-name="elementname"
        attr-pattern="(999)999-9999"
        attr-readonly="true"
        attr-size="30"
        attr-spellcheck="true"
        attr-step="2"
        attr-tabindex="1138"
        }}`);

    var $input = this.$('md-input-container input');

    var actual = $input.attr('type');
    var expected = 'submit';
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



