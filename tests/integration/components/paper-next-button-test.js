import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-next-button', 'Integration | Component | paper next button', {
  integration: true
});

test('it renders the block content', function(assert) {
  this.render(hbs`
    {{#paper-next-button}}
      content
    {{/paper-next-button}}
  `);

  assert.equal(this.$().text().trim(), 'content');
});

test('it has md-next-button tagName', function(assert) {
  this.render(hbs`{{paper-next-button}}`);

  assert.ok(this.$('md-next-button').length === 1);
});

test('it has md-disabled css class if parent.canPageForward is false', function(assert) {
  this.set('parent', {
    canPageForward: false
  });

  this.render(hbs`{{paper-next-button parent=parent}}`);

  assert.ok(this.$('md-next-button').hasClass('md-disabled'));
});

test('it does not have md-disabled css class if parent.canPageForward is true', function(assert) {
  this.set('parent', {
    canPageForward: true
  });

  this.render(hbs`{{paper-next-button parent=parent}}`);

  assert.notOk(this.$('md-next-button').hasClass('md-disabled'));
});

test('it calls send with nextPage on parent when clicked', function(assert) {
  assert.expect(1);

  this.set('parent', {
    canPageForward: true,
    send: (action) => assert.equal(action, 'nextPage')
  });

  this.render(hbs`{{paper-next-button parent=parent}}`);

  this.$('md-next-button').click();
});

test('it does call send with nextPage on parent when clicked', function(assert) {
  assert.expect(0);

  this.set('parent', {
    canPageForward: false,
    send: () => assert.ok(false, 'send should not be called')
  });

  this.render(hbs`{{paper-next-button parent=parent}}`);

  this.$('md-next-button').click();
});
