import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-tabs-canvas', 'Integration | Component | paper tabs canvas', {
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

test('it add md-paginated to canvas if parentComponent.shouldPaginate is true', function(assert) {
  this.set('parentComponent.shouldPaginate', true);

  this.render(hbs`{{#paper-tabs-canvas parentComponent=parentComponent}}
     block content
  {{/paper-tabs-canvas}}`);

  assert.ok(this.$('md-tabs-canvas').hasClass('md-paginated'));
});

test('it add md-center-tabs to canvas if parentComponent.shouldCenterTabs is true', function(assert) {
  this.set('parentComponent.shouldCenterTabs', true);

  this.render(hbs`{{#paper-tabs-canvas parentComponent=parentComponent}}
     block content
  {{/paper-tabs-canvas}}`);

  assert.ok(this.$('md-tabs-canvas').hasClass('md-center-tabs'));
});
