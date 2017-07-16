import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-next-button', 'Integration | Component | paper next button', {
  integration: true
});

test('it renders the keyboard-arrow-left icon', function(assert) {
  this.render(hbs`{{paper-next-button}}`);

  assert.equal(this.$().text().trim(), 'keyboard_arrow_left');
});

test('it has md-next-button tagName', function(assert) {
  this.render(hbs`{{paper-next-button}}`);

  assert.ok(this.$('md-next-button').length === 1);
});

test('it has md-disabled css class if disabled is true', function(assert) {
  this.render(hbs`{{paper-next-button disabled=true}}`);

  assert.ok(this.$('md-next-button').hasClass('md-disabled'));
});

test('it does not have md-disabled css class if disabled is false', function(assert) {
  this.render(hbs`{{paper-next-button disabled=false}}`);

  assert.notOk(this.$('md-next-button').hasClass('md-disabled'));
});

test('it calls action when clicked', function(assert) {
  assert.expect(1);

  this.set('onClick', () => assert.ok(true, 'onClick called'));

  this.render(hbs`{{paper-next-button click=(action onClick)}}`);

  this.$('md-next-button').click();
});
