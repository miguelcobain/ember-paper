import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-sidenav', 'Integration | Component | paper sidenav', {
  integration: true
});

test('renders a container with flex and layout-row classes', function(assert) {
  assert.expect(2);

  this.render(hbs`{{paper-sidenav-container class="sidenav-container"}}`);

  assert.ok(this.$('.sidenav-container').hasClass('flex'));
  assert.ok(this.$('.sidenav-container').hasClass('layout-row'));
});

test('sidenav uses md-sidenav-left by default', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-sidenav}}`);

  assert.ok(this.$('md-sidenav').hasClass('md-sidenav-left'));
});

test('sidenav uses md-sidenav-right with position="right"', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-sidenav position="right"}}`);

  assert.ok(this.$('md-sidenav').hasClass('md-sidenav-right'));
});