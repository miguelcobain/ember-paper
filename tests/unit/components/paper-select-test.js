import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Ember from 'ember';

moduleForComponent('paper-select', {
  // specify the other units that are required for this test
  needs: ['component:paper-icon']
});

var content = Ember.A([
  {id: 1, name: "Paper"},
  {id: 2, name: "Paper"},
  {id: 3, name: "Pen"},
  {id: 4, name: "Pencil"},
  {id: 5, name: "Ruler"}
]);

test('it renders', function(assert) {
  assert.expect(3);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  component.set('optionValuePath', 'content.id');
  component.set('content', content);

  // renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
  assert.equal(component.get('element').tagName, 'md-select'.toUpperCase(), 'matches `md-select`');
});

test('it throws if content is not present', function(assert) {
  assert.expect(1);

  var component = this.subject();

  try {
    this.render();
  } catch (error) {
    assert.equal(error.message, "Paper Select: You must provide a content array.", 'throws if content is not present');
  }
});

test('it throws if optionValuePath is not present', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.set('content', content);

  try {
    this.render();
  } catch (error) {
    assert.equal(error.message, "Paper Select: You must set an optionValuePath.", 'throws if optionValuePath is not present');
  }
});

test('it throws if Option Values are not unique', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.set('content', content);
  component.set('optionValuePath', 'content.name');

  try {
    this.render();
  } catch (error) {
    assert.equal(error.message, "Paper Select: Your optionValuePath must be unique for each item in the content array.", 'throws if Option Values are not unique');
  }
});

test('It is valid when there is no prompt', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.set('content', content);
  component.set('optionValuePath', 'content.id');
  this.render();

  assert.ok(this.$().hasClass('valid'));
});

test('It is not valid when there is a prompt', function(assert) {
  assert.expect(1);

  var component = this.subject();
  component.set('content', content);
  component.set('optionValuePath', 'content.id');
  component.set('prompt', 'Select Your Stationary:');
  this.render();

  assert.ok(!this.$().hasClass('valid'));
});

