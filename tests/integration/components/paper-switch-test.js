import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import $ from 'jquery';

moduleForComponent('paper-switch', 'Integration | Component | paper switch', {
  integration: true
});

test('should set selected class correctly', function(assert) {
  this.set('foo', () => { });
  this.set('switchValue', true);

  this.render(hbs`
    {{#paper-switch value=switchValue onChange=foo}}
      Radio button 1
    {{/paper-switch}}
  `);
  assert.ok(this.$('md-switch').hasClass('md-checked'));

  this.set('switchValue', false);
  assert.ok(!this.$().hasClass('md-checked'));
});

test('should not set focused class', function(assert) {
  this.render(hbs`
    {{#paper-switch value=switchValue onChange=(action (mut switchValue))}}
      Radio button 1
    {{/paper-switch}}
  `);
  this.$('md-switch').click();

  assert.ok(!this.$('md-switch').hasClass('md-focused'));
});

test('should set focused class', function(assert) {
  this.render(hbs`
    {{#paper-switch value=switchValue onChange=(action (mut switchValue))}}
      Radio button 1
    {{/paper-switch}}
  `);
  this.$('md-switch').click();
  this.$('md-switch').focusout();
  this.$('md-switch').focusin();

  assert.ok(this.$('md-switch').hasClass('md-focused'));
});

test('should render block content as label', function(assert) {
  this.set('foo', () => { });
  this.set('switchValue', true);

  this.render(hbs`
    {{#paper-switch value=switchValue onChange=foo}}
      A block label
    {{/paper-switch}}
  `);
  assert.equal(this.$('md-switch .md-label').text().trim(), 'A block label');
});

test('blockless mode should render label', function(assert) {
  this.set('foo', () => { });
  this.set('switchValue', true);

  this.render(hbs`
    {{paper-switch value=switchValue onChange=foo label="An inline label"}}
  `);
  assert.equal(this.$('md-switch .md-label').text().trim(), 'An inline label');
});

// space and enter key codes
[32, 13].forEach((keyCode) => {
  test(`should be possible to switch on with key code ${keyCode}`, function(assert) {
    assert.expect(2);

    this.set('switchValue', false);
    this.render(hbs`{{paper-switch value=switchValue onChange=(action (mut switchValue))}}`);
    assert.equal(this.get('switchValue'), false);

    let e = new $.Event('keypress', { which: keyCode });
    this.$('md-switch').trigger(e);

    assert.equal(this.get('switchValue'), true);
  });

  test(`should be possible to switch off with key code ${keyCode}`, function(assert) {
    assert.expect(2);

    this.set('switchValue', true);
    this.render(hbs`{{paper-switch value=switchValue onChange=(action (mut switchValue))}}`);
    assert.equal(this.get('switchValue'), true);

    let e = new $.Event('keypress');
    e.which = keyCode; // # Some key code value
    this.$('md-switch').trigger(e);

    assert.equal(this.get('switchValue'), false);
  });
});

/* test('the `onChange` action is mandatory for paper-switch', function(assert) {
  assert.expect(1);

  assert.throws(() => {
    this.render(hbs`{{paper-switch value=true}}`);
  }, /requires an `onChange` action/);
});*/
