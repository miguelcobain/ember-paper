import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-tabs-wrapper', 'Integration | Component | paper tabs wrapper', {
  integration: true
});

test('it calls identityTabsWrapper on render to its parent with its size and ID', function(assert) {
  let identifiedWith;
  this.set('parent', {
    identifyTabsWrapper(self) {
      identifiedWith = self;
    }
  });

  this.render(hbs`{{paper-tabs-wrapper id=42 parent=parent}}`);

  assert.equal(identifiedWith.get('id'), 42, 'element ID is 42');
  assert.equal(identifiedWith.get('height'), this.$().outerHeight(), 'check height');
  assert.equal(identifiedWith.get('offset'), this.$().offset().left, 'check left offset');
});

test('it renders prev/next button if parent.shouldPaginate is true', function(assert) {
  this.set('parent', {
    shouldPaginate: true,
    identifyTabsWrapper() {}
  });

  this.render(hbs`{{paper-tabs-wrapper parent=parent}}`);

  assert.ok(this.$('md-next-button').length === 1, 'next button is displayed');
  assert.ok(this.$('md-prev-button').length === 1, 'prev button is displayed');

  this.set('parent.shouldPaginate', false);

  assert.ok(this.$('md-next-button').length === 0, 'next button is hidden');
  assert.ok(this.$('md-prev-button').length === 0, 'prev button is hidden');
});

test('it renders block content in a canvas inside a pagination wrapper', function(assert) {
  this.set('parent', {
    shouldPaginate: false,
    identifyTabsWrapper() {}
  });

  this.render(hbs`{{#paper-tabs-wrapper parent=parent}}
     block content
  {{/paper-tabs-wrapper}}`);

  assert.ok(this.$('md-tabs-canvas').length === 1, 'a canvas is displayed');
  assert.ok(this.$('md-tabs-canvas md-pagination-wrapper').length === 1, 'a pagination wrapper is rendered in the canvas');
  assert.equal(this.$('md-tabs-canvas md-pagination-wrapper').text().trim(), 'block content', 'content is rendered in the wrapper');
});

test('the canvas has md-paginated class if parent.shouldPaginate is true', function(assert) {
  this.set('parent', {
    shouldPaginate: true,
    identifyTabsWrapper() {}
  });

  this.render(hbs`{{paper-tabs-wrapper parent=parent}}`);

  assert.ok(this.$('md-tabs-canvas').hasClass('md-paginated'), 'canvas has md-paginated class');
});
