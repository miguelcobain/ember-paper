import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-tab-content', 'Integration | Component | paper tab content', {
  integration: true,
  beforeEach() {
    this.set('parentComponent', {
      trigger() {}
    });
  }
});

test('it renders content in a md-tab-content tag', function(assert) {
  this.render(hbs`
    {{#paper-tab-content parentComponent=parentComponent}}
      content
    {{/paper-tab-content}}
  `);
  assert.equal(this.$('md-tab-content').text().trim(), 'content');
});

test('it applies md-active is parent is active', function(assert) {
  this.set('parentComponent.isActive', false);

  this.render(hbs`
    {{#paper-tab-content parentComponent=parentComponent}}
      content
    {{/paper-tab-content}}
  `);

  assert.notOk(this.$('md-tab-content').hasClass('md-active'));

  this.set('parentComponent.isActive', true);

  assert.ok(this.$('md-tab-content').hasClass('md-active'));
});

test('it applies md-left if parent is left', function(assert) {
  this.set('parentComponent.isLeft', false);

  this.render(hbs`
    {{#paper-tab-content parentComponent=parentComponent}}
      content
    {{/paper-tab-content}}
  `);

  assert.notOk(this.$('md-tab-content').hasClass('md-left'));

  this.set('parentComponent.isLeft', true);

  assert.ok(this.$('md-tab-content').hasClass('md-left'));
});

test('it applies md-right if parent is right', function(assert) {
  this.set('parentComponent.isRight', false);

  this.render(hbs`
    {{#paper-tab-content parentComponent=parentComponent}}
      content
    {{/paper-tab-content}}
  `);

  assert.notOk(this.$('md-tab-content').hasClass('md-right'));

  this.set('parentComponent.isRight', true);

  assert.ok(this.$('md-tab-content').hasClass('md-right'));
});

test('it trigger onRendered on parent component on render', function(assert) {
  assert.expect(1);

  this.set('parentComponent.trigger', (event) => assert.equal(event, 'onRendered'));

  this.render(hbs`
    {{#paper-tab-content parentComponent=parentComponent}}
      content
    {{/paper-tab-content}}
  `);
});
