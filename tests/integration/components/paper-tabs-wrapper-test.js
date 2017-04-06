import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-tabs-wrapper', 'Integration | Component | paper tabs wrapper', {
  integration: true,
  beforeEach() {
    this.set('parentComponent', (function() {
      return {
        wormhole: 'wormhole',
        send() {},
        registerChild() {},
        unregisterChild() {}
      };
    })());
  }
});

test('it add md-stretch-tabs to md-tabs-wrapper if parentComponent.shouldStretchTabs is true', function(assert) {
  this.set('parentComponent.shouldStretchTabs', true);

  this.render(hbs`{{#paper-tabs-wrapper parentComponent=parentComponent}}
     block content
  {{/paper-tabs-wrapper}}`);

  assert.ok(this.$('md-tabs-wrapper').hasClass('md-stretch-tabs'));
});

test('it add md-paginated to canvas if parentComponent.shouldPaginate is true', function(assert) {
  this.set('parentComponent.shouldPaginate', true);

  this.render(hbs`{{#paper-tabs-wrapper parentComponent=parentComponent}}
     block content
  {{/paper-tabs-wrapper}}`);

  assert.ok(this.$('md-tabs-canvas').hasClass('md-paginated'));
});

test('it add md-center-tabs to canvas if parentComponent.shouldCenterTabs is true', function(assert) {
  this.set('parentComponent.shouldCenterTabs', true);

  this.render(hbs`{{#paper-tabs-wrapper parentComponent=parentComponent}}
     block content
  {{/paper-tabs-wrapper}}`);

  assert.ok(this.$('md-tabs-canvas').hasClass('md-center-tabs'));
});

test('it renders block content in a canvas inside a pagination wrapper', function(assert) {
  this.set('parentComponent.shouldPaginate', false);

  this.render(hbs`{{#paper-tabs-wrapper parentComponent=parentComponent}}
     block content
  {{/paper-tabs-wrapper}}`);

  assert.ok(this.$('md-tabs-canvas').length === 1, 'a canvas is displayed');
  assert.ok(this.$('md-tabs-canvas md-pagination-wrapper').length === 1, 'a pagination wrapper is rendered in the canvas');
  assert.equal(this.$('md-tabs-canvas md-pagination-wrapper').text().trim(), 'block content', 'content is rendered in the wrapper');
});

test('the canvas has md-paginated class if parentComponent.shouldPaginate is true', function(assert) {
  this.set('parentComponent.shouldPaginate', true);

  this.render(hbs`{{paper-tabs-wrapper parentComponent=parentComponent}}`);

  assert.ok(this.$('md-tabs-canvas').hasClass('md-paginated'), 'canvas has md-paginated class');
});

test('it renders prev/next button if parentComponent.shouldPaginate is true', function(assert) {
  this.set('parentComponent.shouldPaginate', true);

  this.render(hbs`{{paper-tabs-wrapper parentComponent=parentComponent}}`);

  assert.ok(this.$('md-next-button').length === 1, 'next button is displayed');
  assert.ok(this.$('md-prev-button').length === 1, 'prev button is displayed');

  this.set('parentComponent.shouldPaginate', false);

  assert.ok(this.$('md-next-button').length === 0, 'next button is hidden');
  assert.ok(this.$('md-prev-button').length === 0, 'prev button is hidden');
});

test('it calls nextPage if parentComponent.canPageForward is true', function(assert) {
  assert.expect(3);

  this.set('parentComponent.canPageForward', false);
  this.set('parentComponent.shouldPaginate', true);
  this.set('parentComponent.send', (action) => assert.equal(action, 'nextPage', 'next page is called once'));

  this.render(hbs`{{paper-tabs-wrapper parentComponent=parentComponent}}`);

  assert.ok(this.$('md-next-button').hasClass('md-disabled'), 'button disabled');

  this.$('md-next-button').click();

  this.set('parentComponent.canPageForward', true);

  assert.notOk(this.$('md-next-button').hasClass('md-disabled'), 'button enabled');

  this.$('md-next-button').click();
});

test('it calls previousPage if parentComponent.canPageBack is true', function(assert) {
  assert.expect(3);

  this.set('parentComponent.canPageBack', false);
  this.set('parentComponent.shouldPaginate', true);
  this.set('parentComponent.send', (action) => assert.equal(action, 'previousPage', 'prev page is called once'));

  this.render(hbs`{{paper-tabs-wrapper parentComponent=parentComponent}}`);

  assert.ok(this.$('md-prev-button').hasClass('md-disabled'), 'button disabled');

  this.$('md-prev-button').click();

  this.set('parentComponent.canPageBack', true);

  assert.notOk(this.$('md-prev-button').hasClass('md-disabled'), 'button enabled');

  this.$('md-prev-button').click();
});
