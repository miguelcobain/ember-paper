import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-checkbox', 'Integration | Component | paper checkbox', {
  integration: true
});

test('should set and remove checked css class', function(assert) {
  assert.expect(2);

  this.set('value', true);
  this.render(hbs`{{paper-checkbox checked=value label="Blue" onchange=(action (mut value))}}`);
  assert.ok(this.$('md-checkbox').hasClass('md-checked'));

  this.set('value', false);
  assert.ok(!this.$('md-checkbox').hasClass('md-checked'));
});

test('should trigger an action when unchecking', function(assert) {
  assert.expect(1);

  this.set('value', true);
  this.handleChange = (checked) => {
    assert.equal(checked, false);
  };

  this.render(hbs`{{paper-checkbox checked=value onchange=handleChange}}`);

  this.$('md-checkbox').click();
});

test('should trigger an action when checking', function(assert) {
  assert.expect(1);

  this.set('value', false);
  this.handleChange = (checked) => {
    assert.equal(checked, true);
  };

  this.render(hbs`{{paper-checkbox checked=value onchange=handleChange}}`);

  this.$('md-checkbox').click();
});

test('shouldn\'t trigger an action when disabled', function(assert) {
  assert.expect(0);

  this.set('value', false);
  this.handleChange = (checked) => {
    assert.equal(checked, true);
  };

  this.render(hbs`{{paper-checkbox disabled=true checked=value onchange=handleChange}}`);

  this.$('md-checkbox').click();
});

test('should be possible to check with spacebar', function(assert) {
  assert.expect(2);

  this.set('value', false);
  this.render(hbs`{{paper-checkbox checked=value onchange=(action (mut value))}}`);
  assert.equal(this.get('value'), false);

  let e = Ember.$.Event('keypress');
  e.which = 32; // # Some key code value
  this.$('md-checkbox').trigger(e);

  assert.equal(this.get('value'), true);
});

test('should be possible to uncheck with spacebar', function(assert) {
  assert.expect(2);

  this.set('value', true);
  this.render(hbs`{{paper-checkbox checked=value onchange=(action (mut value))}}`);
  assert.equal(this.get('value'), true);

  let e = Ember.$.Event('keypress');
  e.which = 32; // # Some key code value
  this.$('md-checkbox').trigger(e);

  assert.equal(this.get('value'), false);
});

test('blockless version should set label inside', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-checkbox checked=value onchange=(action (mut value)) label="çup?"}}`);

  assert.equal(this.$('.md-label > span').text().trim(), 'çup?');
});

test('block version should set label inside', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#paper-checkbox checked=value onchange=(action (mut value))}}
      çup?
    {{/paper-checkbox}}
  `);

  assert.equal(this.$('.md-label > span').text().trim(), 'çup?');
});

test('the `onchange` function is mandatory', function(assert) {
  assert.expect(1);

  assert.throws(() => {
    this.render(hbs`{{paper-checkbox checked=true}}`);
  }, /requires an `onchange` function/);
});