import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-pagination-wrapper', 'Integration | Component | paper pagination wrapper', {
  integration: true,
  beforeEach() {
    this.set('parentComponent', {
      selectedTab: {},
      selected: 0,
      tabs: [{}]
    });
  }
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

test('it has md-center-tabs class if parentComponent has shouldCenterTabs:true', function(assert) {
  this.set('parentComponent.shouldCenterTabs', true);

  this.render(hbs`{{paper-pagination-wrapper parentComponent=parentComponent}}`);

  assert.ok(this.$('md-pagination-wrapper').hasClass('md-center-tabs'));

  this.set('parentComponent.shouldCenterTabs', false);

  assert.notOk(this.$('md-pagination-wrapper').hasClass('md-center-tabs'));
});

test('it renders md-ink-bar if inkBar is enabled', function(assert) {
  this.set('parentComponent.noInkBar', true);

  this.render(hbs`{{paper-pagination-wrapper parentComponent=parentComponent}}`);

  assert.ok(this.$('md-ink-bar').length === 0, 'ink bar hidden');

  this.set('parentComponent.noInkBar', false);

  assert.ok(this.$('md-ink-bar').length === 1, 'ink bar visible');
});

test('it renders md-ink-bar with proper direction', function(assert) {
  this.set('parentComponent.lastSelectedIndex', 2);
  this.set('parentComponent.selected', 3);

  this.render(hbs`{{paper-pagination-wrapper parentComponent=parentComponent}}`);

  assert.ok(this.$('md-ink-bar').hasClass('md-right'), 'md-right');

  this.set('parentComponent.lastSelectedIndex', 4);

  assert.ok(this.$('md-ink-bar').hasClass('md-left'), 'md-left');
});

test('it renders md-ink-bar with proper left/right position', function(assert) {
  this.set('parentComponent.pagingWidth', 1000);
  this.set('parentComponent.offsetLeft', 100);
  this.set('parentComponent.selectedTabWidth', 100);
  this.set('parentComponent.selectedTabOffsetLeft', 200);

  this.render(hbs`{{paper-pagination-wrapper parentComponent=parentComponent}}`);

  assert.equal(this.$('md-ink-bar').attr('style'), 'left:200px;right:700px;');
});

test('it translate position if should paginate', function(assert) {
  this.set('parentComponent.offsetLeft', 250);
  this.set('parentComponent.shouldPaginate', false);

  this.render(hbs`{{paper-pagination-wrapper parentComponent=parentComponent}}`);

  assert.equal(this.$('md-pagination-wrapper').attr('style'), undefined,  'no translation');

  this.set('parentComponent.shouldPaginate', true);

  assert.equal(this.$('md-pagination-wrapper').attr('style'), 'transform: translate3d(-250px, 0px, 0px);',  'translated by offsetLeft');
});
