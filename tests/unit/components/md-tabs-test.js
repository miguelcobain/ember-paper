import {
  moduleForComponent,
  test
}
from 'ember-qunit';

import Ember from 'ember';

moduleForComponent('md-tabs', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  needs: [
      'component:md-tab',
      'component:md-tab-item',
      'component:md-tab-content',
      'component:md-tabs-content-wrapper',
      'component:md-tabs-wrapper',
      'component:md-icon',
      'service:media-queries',
      'service:sniffer',
      'service:ripple',
      'service:constants'
    ],
    integration: true
    //'template:md-tabs-content-wrapper']
});

var oneTabTemplate = Ember.HTMLBars.compile(
  '{{#md-tabs-wrapper}}' +
    '{{#md-tab label="tab 1"}}' +
      '<md-tab-label>tab 1</md-tab-label>' +
    '{{/md-tab}}' +
  '{{/md-tabs-wrapper}}' +
  '{{#md-tabs-content-wrapper}}' +
    '{{#md-tab-content}}' +
      '<div class="demo-tab">' +
        'tab 1' +
        '<br/>' +
      '</div>' +
    '{{/md-tab-content}}' +
  '{{/md-tabs-content-wrapper}}');

var twoTabTemplate = Ember.HTMLBars.compile(
  '{{#md-tabs-wrapper}}' +
    '{{#md-tab label="tab 1"}}' +
      '<md-tab-label>tab 1</md-tab-label>' +
    '{{/md-tab}}' +
    '{{#md-tab label="tab 2"}}' +
      '<md-tab-label>tab 2</md-tab-label>' +
    '{{/md-tab}}' +
  '{{/md-tabs-wrapper}}' +
  '{{#md-tabs-content-wrapper}}' +
    '{{#md-tab-content}}' +
      '<div class="demo-tab">' +
        'tab 1' +
        '<br/>' +
      '</div>' +
    '{{/md-tab-content}}' +
    '{{#md-tab-content}}' +
      '<div class="demo-tab">' +
        'tab 2' +
        '<br/>' +
      '</div>' +
    '{{/md-tab-content}}' +
  '{{/md-tabs-content-wrapper}}');

// TODO: replace with integration tests
//test('it renders', function(assert) {
//  assert.expect(2);
//
//
//
//  // Creates the component instance
//  var component = this.subject({
//    template: oneTabTemplate
//  });
//  assert.equal(component._state, 'preRender');
//
//  // Renders the component to the page
//  this.render();
//
//  assert.equal(component._state, 'inDOM');
//});
//
//test('selects first tab by default', function(assert) {
//  var component = this.subject({
//    template: twoTabTemplate
//  });
//
//  this.render();
//
//  var firstTab = this.$().find('md-tab-item').eq(0);
//  var secondTab = this.$().find('md-tab-item').eq(1);
//
//  assert.ok(firstTab.hasClass('md-active'), 'First tab is selected');
//  assert.ok(!secondTab.hasClass('md-active'), 'Second tab is not selected');
//
//});
//
//test('selects and focuses a tab on click', function(assert) {
//  var component = this.subject({
//    template: twoTabTemplate
//  });
//
//  this.render();
//
//  var e = Ember.$.Event('click');
//
//  var secondTab = this.$().find('md-tab-item').eq(1);
//
//  assert.ok(secondTab.length, 'Second tab exists');
//
//  Ember.run(() => {
//    secondTab.trigger(e);
//  });
//
//  assert.ok(secondTab.hasClass('md-active'), 'Second tab is selected');
//  assert.equal(component.get('selectedIndex'), 1, 'Second tab is selected');
//
//});
//
//test('changing selected index changes active tab', function(assert) {
//  var component = this.subject({
//    template: twoTabTemplate
//  });
//
//  this.render();
//
//  Ember.run(() => {
//    component.set('selectedIndex', 1);
//  });
//
//  var firstTab = this.$().find('md-tab-item').eq(0);
//  var secondTab = this.$().find('md-tab-item').eq(1);
//  assert.ok(!firstTab.hasClass('md-active'), 'First tab is not selected');
//  assert.ok(secondTab.hasClass('md-active'), 'Second tab is selected');
//
//});
