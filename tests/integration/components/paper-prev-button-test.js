import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-prev-button', 'Integration | Component | paper prev button', {
  integration: true
});

test('it renders the block content', function(assert) {
  this.render(hbs`
    {{#paper-prev-button}}
      content
    {{/paper-prev-button}}
  `);

  assert.equal(this.$().text().trim(), 'content');
});

test('it has md-prev-button tagName', function(assert) {
  this.render(hbs`{{paper-prev-button}}`);

  assert.ok(this.$('md-prev-button').length === 1);
});

test('it has md-disabled css class if parent.canPageForward is false', function(assert) {
  this.set('parent', {
    canPageForward: false
  });

  this.render(hbs`{{paper-prev-button parent=parent}}`);

  assert.ok(this.$('md-prev-button').hasClass('md-disabled'));
});

test('it does not have md-disabled css class if parent.canPageForward is true', function(assert) {
  this.set('parent', {
    canPageBack: true
  });

  this.render(hbs`{{paper-prev-button parent=parent}}`);

  assert.notOk(this.$('md-prev-button').hasClass('md-disabled'));
});

test('it calls send with previousPage on parent when clicked', function(assert) {
  assert.expect(1);

  this.set('parent', {
    canPageBack: true,
    send: (action) => assert.equal(action, 'previousPage')
  });

  this.render(hbs`{{paper-prev-button parent=parent}}`);

  this.$('md-prev-button').click();
});

test('it does call send with previousPage on parent when clicked', function(assert) {
  assert.expect(0);

  this.set('parent', {
    canPageBack: false,
    send: () => assert.ok(false, 'send should not be called')
  });

  this.render(hbs`{{paper-prev-button parent=parent}}`);

  this.$('md-prev-button').click();
});
