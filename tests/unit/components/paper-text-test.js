import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('paper-text', 'PaperTextComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // appends the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('it does not set isInvalid when required is false and text has no value', function(assert) {
  assert.expect(1);
  var component = this.subject();

  component.set('required', false);
  component.set('value', "");

  assert.equal(component.get("isInvalid"), false, "isInvalid is true");
});

test('it sets isInvalid as true when required is true and text has no value', function(assert) {
  assert.expect(1);
  var component = this.subject();

  component.set('required', true);
  component.set('value', "");

  assert.equal(component.get("isInvalid"), true, "isInvalid is false");
});

test('it does not set isInvalid when required is true and text has value', function(assert) {
  assert.expect(1);
  var component = this.subject();

  component.set('required', true);
  component.set('value', "Ember Paper");

  assert.equal(component.get("isInvalid"), false, "isInvalid is true with a value");
});

test('it adds md-input-invalid css class when isInvalid', function(assert) {
  assert.expect(2);
  var inputGroup,
      component = this.subject();

  component.set('required', true);
  component.set('value', "");

  this.render();

  inputGroup = document.getElementsByTagName('md-input-container');

  assert.equal(inputGroup.length === 1, true);
  assert.equal(inputGroup[0].className.indexOf('md-input-invalid') >= 0, true, "Could not find md-input-invalid css class");
});

test('it sets error text when isInvalid', function(assert) {
  assert.expect(2);
  var inputGroup,
      errorDiv,
      expectedError = "This is required.",
      component = this.subject();

  component.set('required', true);
  component.set('value', "");
  component.set('errorText', expectedError);

  this.render();

  inputGroup = document.getElementsByTagName('md-input-container');

  assert.equal(inputGroup.length === 1, true);

  errorDiv = document.getElementById('error-input-'+inputGroup[0].id);

  assert.equal(errorDiv.innerHTML, expectedError, "Error text does not equal " + expectedError);
});