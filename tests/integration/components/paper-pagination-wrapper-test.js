import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-pagination-wrapper', 'Integration | Component | paper pagination wrapper', {
  integration: true
});

test('it renders block content', function(assert) {
  this.render(hbs`
    {{#paper-pagination-wrapper}}
      content
    {{/paper-pagination-wrapper}}
  `);
  assert.equal(this.$('md-pagination-wrapper').text().trim(), 'content');
});

test('it has md-pagination-wrapper tagName', function(assert) {
  this.render(hbs`{{paper-pagination-wrapper}}`);

  assert.ok(this.$('md-pagination-wrapper').length === 1);
});

test('it has md-center-tabs class if parent has centerTabs:true', function(assert) {
  this.set('parent', {
    centerTabs: true
  });

  this.render(hbs`{{paper-pagination-wrapper parent=parent}}`);

  assert.ok(this.$('md-pagination-wrapper').hasClass('md-center-tabs'));

  this.set('parent.centerTabs', false);

  assert.notOk(this.$('md-pagination-wrapper').hasClass('md-center-tabs'));
});
