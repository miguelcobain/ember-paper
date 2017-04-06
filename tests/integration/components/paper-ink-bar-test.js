import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-ink-bar', 'Integration | Component | paper ink bar', {
  integration: true
});

test('it binds the direction css class', function(assert) {
  this.set('direction', 'left');

  this.render(hbs`{{paper-ink-bar direction=direction}}`);

  assert.ok(this.$('md-ink-bar').hasClass('md-left'));

  this.set('direction', 'right');

  assert.ok(this.$('md-ink-bar').hasClass('md-right'));
});

test('it binds the style attribute', function(assert) {
  this.set('leftPosition', 0);
  this.set('rightPosition', 0);

  this.render(hbs`{{paper-ink-bar leftPosition=leftPosition rightPosition=rightPosition}}`);

  assert.equal(this.$('md-ink-bar').attr('style'), 'left:0px;right:0px;');

  this.set('rightPosition', 23.5);

  assert.equal(this.$('md-ink-bar').attr('style'), 'left:0px;right:23px;');

  this.set('leftPosition', -12);

  assert.equal(this.$('md-ink-bar').attr('style'), 'left:-12px;right:23px;');
});
