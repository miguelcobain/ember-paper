import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

moduleForComponent('paper-checkbox', 'Integration | Component | paper checkbox', {
  integration: true
});

test('should set and remove checked css class', function(assert) {
  assert.expect(2);

  this.set('value', true);
  this.render(hbs`{{paper-checkbox value=value label="Blue" onChange=(action (mut value))}}`);
  assert.ok(this.$('md-checkbox').hasClass('md-checked'));

  this.set('value', false);
  assert.ok(!this.$('md-checkbox').hasClass('md-checked'));
});

test('should trigger an action when unchecking', function(assert) {
  assert.expect(1);

  this.set('value', true);
  this.set('handleChange', (value) => {
    assert.equal(value, false);
  });

  this.render(hbs`{{paper-checkbox value=value onChange=handleChange}}`);

  this.$('md-checkbox').click();
});

test('should trigger an action when checking', function(assert) {
  assert.expect(1);

  this.set('value', false);
  this.set('handleChange', (value) => {
    assert.equal(value, true);
  });

  this.render(hbs`{{paper-checkbox value=value onChange=handleChange}}`);

  this.$('md-checkbox').click();
});

test('shouldn\'t trigger an action when disabled', function(assert) {
  assert.expect(0);

  this.set('value', false);
  this.set('handleChange', (value) => {
    assert.equal(value, true);
  });

  this.render(hbs`{{paper-checkbox disabled=true value=value onChange=handleChange}}`);

  this.$('md-checkbox').click();
});

// space and enter key codes
[32, 13].forEach((keyCode) => {
  test(`should be possible to check with key code ${keyCode}`, function(assert) {
    assert.expect(2);

    this.set('value', false);
    this.render(hbs`{{paper-checkbox value=value onChange=(action (mut value))}}`);
    assert.equal(this.get('value'), false);

    let e = new $.Event('keypress');
    e.which = keyCode; // # Some key code value
    this.$('md-checkbox').trigger(e);

    assert.equal(this.get('value'), true);
  });

  test(`should be possible to uncheck with key code ${keyCode}`, function(assert) {
    assert.expect(2);

    this.set('value', true);
    this.render(hbs`{{paper-checkbox value=value onChange=(action (mut value))}}`);
    assert.equal(this.get('value'), true);

    let e = new $.Event('keypress');
    e.which = keyCode; // # Some key code value
    this.$('md-checkbox').trigger(e);

    assert.equal(this.get('value'), false);
  });
});

test('blockless version should set label inside', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-checkbox value=value onChange=(action (mut value)) label="çup?"}}`);

  assert.equal(this.$('.md-label > span').text().trim(), 'çup?');
});

test('block version should set label inside', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#paper-checkbox value=value onChange=(action (mut value))}}
      çup?
    {{/paper-checkbox}}
  `);

  assert.equal(this.$('.md-label > span').text().trim(), 'çup?');
});

/* test('the `onChange` action is mandatory', function(assert) {
  assert.expect(1);

  assert.throws(() => {
    this.render(hbs`{{paper-checkbox value=true}}`);
  }, /requires an `onChange` action/);
});*/

test('if `indeterminate` is true, set md-indeterminate class', function(assert) {
  assert.expect(3);

  this.set('value', true);
  this.render(hbs`
    {{paper-checkbox value=value indeterminate=indeterminate
      label="Blue" onChange=(action (mut value))}}
  `);
  assert.ok(this.$('md-checkbox').hasClass('md-checked'));

  this.set('indeterminate', true);
  assert.ok(!this.$('md-checkbox').hasClass('md-checked'));
  assert.ok(this.$('md-checkbox').hasClass('md-indeterminate'));
});
