import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-prev-button', 'Integration | Component | paper prev button', {
  integration: true
});

test('it renders the keyboard-arrow-left icon', function(assert) {
  this.render(hbs`{{paper-prev-button}}`);

  assert.equal(this.$().text().trim(), 'keyboard_arrow_left');
});

test('it has md-prev-button tagName', function(assert) {
  this.render(hbs`{{paper-prev-button}}`);

  assert.ok(this.$('md-prev-button').length === 1);
});

test('it has md-disabled css class if disabled is true', function(assert) {
  this.render(hbs`{{paper-prev-button disabled=true}}`);

  assert.ok(this.$('md-prev-button').hasClass('md-disabled'));
});

test('it does not have md-disabled css class if disabled is false', function(assert) {
  this.render(hbs`{{paper-prev-button disabled=false}}`);

  assert.notOk(this.$('md-prev-button').hasClass('md-disabled'));
});

test('it calls action when clicked', function(assert) {
  assert.expect(1);

  this.set('onClick', () => assert.ok(true, 'action called'));

  this.render(hbs`{{paper-prev-button click=(action onClick)}}`);

  this.$('md-prev-button').click();
});
