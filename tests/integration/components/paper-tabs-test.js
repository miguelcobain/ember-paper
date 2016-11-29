import QUnit from 'qunit';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

/*const KEY_CODE = {
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
  ENTER: 13,
  SPACE: 32
};*/

moduleForComponent('paper-tabs', 'Integration | Component | paper tabs', {
  integration: true
});

QUnit.assert.activeTab = function(tab, message) {
  this.ok(tab.hasClass('md-active'), message);
};

/* Activating Tabs */

test('should select first tab by default', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab label="a"}}a{{/tabs.tab}}
      {{#tabs.tab label="b"}}b{{/tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.activeTab(this.$('md-tab-item').eq(0));
});

test('should select & focus tab on click', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab}}{{/tabs.tab}}
      {{#tabs.tab}}{{/tabs.tab}}
      {{#tabs.tab disabled=true}}{{/tabs.tab}}
    {{/paper-tabs}}
  `);
  let tabs = this.$('md-tab-item');

  tabs.eq(1).click();
  assert.activeTab(tabs.eq(1));

  tabs.eq(0).click();
  assert.activeTab(tabs.eq(0));
});

/*test('should focus tab on arrow if tab is enabled', function(assert) {
  assert.expect(7);

  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab}}{{/tabs.tab}}
      {{#tabs.tab disabled=true}}{{/tabs.tab}}
      {{#tabs.tab}}{{/tabs.tab}}
    {{/paper-tabs}}
  `);

  let tabsCanvas = this.$('md-tabs-canvas').eq(0);
  let tabItems = this.$('md-tab-item');

  assert.activeTab(tabItems.eq(0));

  // Boundary case, do nothing
  tabsCanvas.trigger({ type: 'keydown', which: KEY_CODE.LEFT_ARROW });
  assert.activeTab(tabItems.eq(0));

  // Tab 0 should still be active, but tab 2 focused (skip tab 1 it's disabled)
  tabsCanvas.trigger({ type: 'keydown', which: KEY_CODE.RIGHT_ARROW });
  assert.activeTab(tabItems.eq(0));

  tabsCanvas.trigger({ type: 'keydown', which: KEY_CODE.ENTER });
  assert.activeTab(tabItems.eq(2));

  // Boundary case, do nothing
  tabsCanvas.trigger({ type: 'keydown', which: KEY_CODE.RIGHT_ARROW });
  assert.activeTab(tabItems.eq(2));

  tabsCanvas.trigger({ type: 'keydown', which: KEY_CODE.ENTER });
  assert.activeTab(tabItems.eq(2));

  // Skip tab 1 again, it's disabled
  tabsCanvas.trigger({ type: 'keydown', which: KEY_CODE.LEFT_ARROW });
  tabsCanvas.trigger({ type: 'keydown', which: KEY_CODE.ENTER });
  assert.activeTab(tabItems.eq(0));
});*/

/*test('should select tab on space or enter', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab}}{{/tabs.tab}}
      {{#tabs.tab}}{{/tabs.tab}}
    {{/paper-tabs}}
  `);

  let tabsCanvas = this.$('md-tabs-canvas').eq(0);
  let tabItems = this.$('md-tab-item');

  tabItems.eq(0).trigger('click');

  tabsCanvas.trigger({ type: 'keydown', which: KEY_CODE.RIGHT_ARROW });
  tabsCanvas.trigger({ type: 'keydown', which: KEY_CODE.ENTER });
  assert.activeTab(tabItems.eq(1));

  tabsCanvas.trigger({ type: 'keydown', which: KEY_CODE.LEFT_ARROW });
  tabsCanvas.trigger({ type: 'keydown', which: KEY_CODE.SPACE });
  assert.activeTab(tabItems.eq(0));
});*/

test('should bind to selected', function(assert) {
  assert.expect(4);

  this.render(hbs`
    {{#paper-tabs selected=current as |tabs|}}
      {{#tabs.tab}}{{/tabs.tab}}
      {{#tabs.tab}}{{/tabs.tab}}
      {{#tabs.tab}}{{/tabs.tab}}
    {{/paper-tabs}}
  `);

  let tabItems = this.$('md-tab-item');

  assert.activeTab(tabItems.eq(0));
  assert.equal(this.get('current'), 0);

  this.set('current', 1);
  assert.activeTab(tabItems.eq(1));

  tabItems.eq(2).trigger('click');
  assert.equal(this.get('current'), 2);
});

/*test('disabling active tab', function(assert) {
  assert.expect(3);

  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab disabled=disabled0}}{{/tabs.tab}}
      {{#tabs.tab disabled=disabled1}}{{/tabs.tab}}
    {{/paper-tabs}}
  `);

  let tabItems = this.$('md-tab-item');

  assert.activeTab(tabItems.eq(0));

  this.set('disabled0', true);
  assert.activeTab(tabItems.eq(1));

  this.setProperties({ 'disabled0': false, 'disabled1': true });
  assert.activeTab(tabItems.eq(0));
});*/

test('should support inline label type', function(assert) {
  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab label="super label"}}{{/tabs.tab}}
    {{/paper-tabs}}
  `);

  assert.equal(this.$('md-tab-item').text().trim(), 'super label');
});

test('should support block label type', function(assert) {
  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab as |tab|}}
        {{#tab.label}}<b>super</b> label{{/tab.label}}
      {{/tabs.tab}}
    {{/paper-tabs}}
  `);
  assert.equal(this.$('md-tab-item').text().trim(), 'super label');
});

test('should support content inside inline label type', function(assert) {
  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab label="label that!"}}
        <b>content</b> that!
      {{/tabs.tab}}
    {{/paper-tabs}}
  `);

  let labelText = this.$('md-tab-item').text().trim();
  let contentText = this.$('md-tab-content').text().trim();

  assert.equal(labelText, 'label that!', labelText);
  assert.equal(contentText, 'content that!');
});

/*
test('should support content inside block label type', function(assert) {
  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab as |tab|}}
        {{#tab.label}}label that!{{/tab.label}}
        {{#tab.body}}<b>content</b> that!{{/tab.body}}
      {{/tabs.tab}}
    {{/paper-tabs}}
  `);

  let labelText = this.$('md-tab-item').text().trim();
  let contentText = this.$('md-tab-content').text().trim();

  assert.equal(labelText, 'label that!', labelText);
  assert.equal(contentText, 'content that!');
});
*/
test('should allow cases where no tabs are selected', function(assert) {
  this.render(hbs`
    {{#paper-tabs selected=selectedIndex as |tabs|}}
      {{#tabs.tab label="a" as |tab|}}tab content{{/tabs.tab}}
      {{#tabs.tab label="b" as |tab|}}tab content{{/tabs.tab}}
    {{/paper-tabs}}
  `);

  let tabItems = this.$('md-tab-item');

  this.set('selectedIndex', -1);

  assert.notOk(tabItems.eq(0).hasClass('md-active'));
  assert.notOk(tabItems.eq(1).hasClass('md-active'));
  // assert: md-tabs-content-wrapper is empty

  tabItems.eq(0).trigger('click');

  assert.ok(tabItems.eq(0).hasClass('md-active'));
  assert.notOk(tabItems.eq(1).hasClass('md-active'));
  assert.equal(this.get('selectedIndex'), 0);

  tabItems.eq(1).trigger('click');

  assert.notOk(tabItems.eq(0).hasClass('md-active'));
  assert.ok(tabItems.eq(1).hasClass('md-active'));
  assert.equal(this.get('selectedIndex'), 1);

  this.set('selectedIndex', -1);

  assert.notOk(tabItems.eq(0).hasClass('md-active'));
  assert.notOk(tabItems.eq(1).hasClass('md-active'));
  // assert: md-tabs-content-wrapper is empty
});

/*test('should properly nest tabs', function(assert) {
  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab label="one"}}
        {{#paper-tabs as |tabs|}}
          {{#tabs.tab as |tab|}}{{#tab.label}}a{{/tab.label}}{{/tabs.tab}}
          {{#tabs.tab as |tab|}}{{#tab.label}}b{{/tab.label}}{{/tabs.tab}}
          {{#tabs.tab as |tab|}}{{#tab.label}}c{{/tab.label}}{{/tabs.tab}}
        {{/paper-tabs}}
      {{/tabs.tab}}
      {{#tabs.tab label="two"}}two{{/tabs.tab}}
    {{/paper-tabs}}
  `);
  // first item should be 'one'
  assert.equal(this.$('md-tab-item').eq(0).text(), 'one');
  // first item in nested tabs should be 'a'
  assert.equal(this.$('md-tabs md-tab-item').eq(0).text(), 'a');
});*/

test('pagination wrapper should have inline width if md-stretch-tabs="never"', function(assert) {
  this.render(hbs`
    {{#paper-tabs stretchTabs="never" as |tabs|}}
      {{#tabs.tab label="label!"}}content!{{/tabs.tab}}
    {{/paper-tabs}}
  `);
  assert.ok(this.$('md-pagination-wrapper').prop('style').width);
});

test(`pagination wrapper should not have inline width if stretchTabs="always"`, function(assert) {
  this.render(hbs`
    {{#paper-tabs stretchTabs="always" as |tabs|}}
      {{#tabs.tab label="label!"}}content!{{/tabs.tab}}
    {{/paper-tabs}}
  `);
  assert.notOk(this.$('md-pagination-wrapper').prop('style').width);
});

test('tab should use its contents as the label if there is no label attribute or label/body tags', function(assert) {
  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab}}test{{/tabs.tab}}
    {{/paper-tabs}}
  `);
  assert.equal(this.$('md-tab-item span').text().trim(), 'test');
  assert.equal(this.$('md-tab-item md-tab-body').length, 0);
});

test('tab should use its contents as the body if there is a label attribute', function(assert) {
  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab label="test"}}content{{/tabs.tab}}
    {{/paper-tabs}}
  `);
  assert.ok(this.$('md-tab-item').length);
  assert.equal(this.$('md-tab-item span').text(), 'test');
  assert.equal(this.$('md-tab-content').text().trim(), 'content');
});

test('tab should convert a label attribute to a label tag', function(assert) {
  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab label="test"}}
        content
      {{/tabs.tab}}
    {{/paper-tabs}}
  `);
  assert.ok(this.$('md-tab-item').length);
  assert.equal(this.$('md-tab-item span').text(), 'test');
  assert.equal(this.$('md-tab-content').text().trim(), 'content');
});

/*
test('tab should not insert a body if there is no content', function(assert) {
  this.render(hbs`
    {{#paper-tabs as |tabs|}}
      {{#tabs.tab as |tab|}}
        {{#tab.label}}test{{/tab.label}}
      {{/tabs.tab}}
    {{/paper-tabs}}
  `);
  assert.ok(this.$('md-tab-item'));
  assert.equal(this.$('md-tab-item span').text(), 'test');
  assert.notOk(this.$('md-tab-content').length);
});
*/
