import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-form', 'Integration | Component | paper form', {
  integration: true
});

test('`isInvalid` and `isValid` work as expected', function(assert) {
  assert.expect(4);

  this.render(hbs`
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

  assert.equal(this.$('.invalid-div').length, 0);
  assert.equal(this.$('.valid-div').length, 1);

  this.set('errors', [{
    message: 'foo should be a number.',
    attribute: 'foo'
  }, {
    message: 'foo should be smaller than 12.',
    attribute: 'foo'
  }]);

  assert.equal(this.$('.invalid-div').length, 1);
  assert.equal(this.$('.valid-div').length, 0);
});

test('form `onSubmit` action is invoked', function(assert) {
  assert.expect(1);

  this.set('onSubmit', () => {
    assert.ok(true);
  });

  this.render(hbs`
    {{#paper-form onSubmit=(action onSubmit) as |form|}}
      {{form.input value=foo onChange=(action (mut foo)) label="Foo"}}
      {{form.input value=bar onChange=(action (mut bar)) label="Bar"}}

      <button onclick={{action form.onSubmit}}>Submit</button>

    {{/paper-form}}
  `);

  this.$('button').click();
});

test('form `onValidityChange` action is invoked', function(assert) {
  // paper-input triggers `onValidityChange` on render
  // so we expect two runs: one on render and another on validity change
  assert.expect(2);

  this.set('onValidityChange', () => {
    assert.ok(true);
  });

  this.render(hbs`
    {{#paper-form onValidityChange=(action onValidityChange) as |form|}}
      {{form.input value=foo onChange=(action (mut foo)) label="Foo"}}
      {{form.input value=bar onChange=(action (mut bar)) label="Bar" errors=errors}}
    {{/paper-form}}
  `);

  this.set('errors', [{
    message: 'foo should be a number.',
    attribute: 'foo'
  }, {
    message: 'foo should be smaller than 12.',
    attribute: 'foo'
  }]);
});

test('form is reset after submit action is invoked', function(assert) {
  assert.expect(3);

  this.render(hbs`
    {{#paper-form as |form|}}
      {{form.input value=foo onChange=(action (mut foo)) label="Foo"}}
      {{form.input value=bar onChange=(action (mut bar)) label="Bar"}}

      <button onclick={{action form.onSubmit}}>Submit</button>

    {{/paper-form}}
  `);

  // no touched inputs
  assert.equal(this.$('.ng-dirty').length, 0, 'no touched inputs');

  this.$('input:first').trigger('blur');

  // there is a dirty input
  assert.equal(this.$('.ng-dirty').length, 1, 'there is a touched input');

  this.$('button').click();

  assert.equal(this.$('.ng-dirty').length, 0, 'inputs were reset');
});

test('works without using contextual components', function(assert) {
  assert.expect(4);

  this.render(hbs`
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

  assert.equal(this.$('.invalid-div').length, 0);
  assert.equal(this.$('.valid-div').length, 1);

  this.set('errors', [{
    message: 'foo should be a number.',
    attribute: 'foo'
  }, {
    message: 'foo should be smaller than 12.',
    attribute: 'foo'
  }]);

  assert.equal(this.$('.invalid-div').length, 1);
  assert.equal(this.$('.valid-div').length, 0);
});

test('form submit button renders', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#paper-form as |form|}}
      {{#form.submit-button}}Submit{{/form.submit-button}}
    {{/paper-form}}
  `);

  assert.equal(this.$('button').length, 1);
});

test('form submit button calls form onSubmit action', function(assert) {
  assert.expect(1);

  this.set('onSubmit', () => {
    assert.ok(true);
  });

  this.render(hbs`
    {{#paper-form onSubmit=(action onSubmit) as |form|}}
      {{#form.submit-button}}Submit{{/form.submit-button}}
    {{/paper-form}}
  `);

  this.$('button').click();
});

test('form submit button is of type submit', function(assert) {
  this.set('onSubmit', () => {
  });

  this.render(hbs`
    {{#paper-form onSubmit=(action onSubmit) as |form|}}
      {{#form.submit-button}}Submit{{/form.submit-button}}
    {{/paper-form}}
  `);

  assert.equal(this.$('button').attr('type'), 'submit');
});
