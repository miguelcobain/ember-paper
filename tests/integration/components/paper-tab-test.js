import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';
import { A } from 'ember-array/utils';

// FIXME should it be in utility class?
const KEY_CODE = {
  ENTER: 13,
  SPACE: 32
};

const keyDown = ($element, which) => $element.trigger(new $.Event('keydown', { which }));

moduleForComponent('paper-tab', 'Integration | Component | paper tab', {
  integration: true,
  beforeEach() {
    this.set('parentComponent', function() {
      let tabs = A([]);
      return {
        wormhole: 'wormhole',
        tabs,
        send() {},
        registerChild(child) {
          tabs.pushObject(child);
        },
        unregisterChild(child) {
          tabs.removeObject(child);
        }
      };
    }());
  }
});

test('it can render a tab', function(assert) {
  this.render(hbs`<div id="wormhole"></div>{{#paper-tab parentComponent=parentComponent as |tab|}}
    {{#tab.label}}label{{/tab.label}}
    {{#tab.body}}content{{/tab.body}}
  {{/paper-tab}}
`);

  assert.equal(this.$('md-tab-item').text().trim(), 'label');
  assert.equal(this.$('#wormhole md-tab-content').text().trim(), 'content');
});

test('it can pass label as attribute and content as block', function(assert) {
  this.render(hbs`<div id="wormhole"></div>{{#paper-tab parentComponent=parentComponent label="label"}}
    content
  {{/paper-tab}}
`);

  assert.equal(this.$('md-tab-item').text().trim(), 'label');
  assert.equal(this.$('#wormhole md-tab-content').text().trim(), 'content');
});

test('it can select tab by clicking on label', function(assert) {
  assert.expect(2);

  this.set('parentComponent.send', function(action, tab) {
    assert.equal(action, 'selectTab');
    assert.equal(tab.get('elementId'), 'testId');
  }.bind(this));

  this.render(hbs`<div id="wormhole"></div>{{#paper-tab id="testId" parentComponent=parentComponent label="label"}}
    content
  {{/paper-tab}}
`);

  this.$('md-tab-item').click();
});

test('it can select tab by pressing ENTER', function(assert) {
  assert.expect(2);

  this.set('parentComponent.send', function(action, tab) {
    assert.equal(action, 'selectTab');
    assert.equal(tab.get('elementId'), 'testId');
  }.bind(this));

  this.render(hbs`<div id="wormhole"></div>{{#paper-tab id="testId" parentComponent=parentComponent label="label"}}
    content
  {{/paper-tab}}
`);

  keyDown(this.$('md-tab-item'), KEY_CODE.ENTER);
});

test('it can select tab by pressing SPACE', function(assert) {
  assert.expect(2);

  this.set('parentComponent.send', function(action, tab) {
    assert.equal(action, 'selectTab');
    assert.equal(tab.get('elementId'), 'testId');
  }.bind(this));

  this.render(hbs`<div id="wormhole"></div>{{#paper-tab id="testId" parentComponent=parentComponent label="label"}}
    content
  {{/paper-tab}}
`);

  keyDown(this.$('md-tab-item'), KEY_CODE.SPACE);
});

test('it calls onSelect when tab is selected', function(assert) {
  assert.expect(1);

  this.set('onSelect', function() {
    assert.ok(true, 'onSelect called');
  });

  this.render(hbs`<div id="wormhole"></div>{{#paper-tab onSelect=(action onSelect) parentComponent=parentComponent label="label"}}
    content
  {{/paper-tab}}
`);

  this.$('md-tab-item').click();
});

test('it calls onDeselect when tab is unselected', function(assert) {
  assert.expect(1);

  this.set('parentComponent.previous', 1);
  this.set('parentComponent.selected', 0);

  this.set('onDeselect', function() {
    assert.ok(true, 'onDeselect called');
  });

  this.render(hbs`<div id="wormhole"></div>{{#paper-tab onDeselect=(action onDeselect) parentComponent=parentComponent label="label"}}
    content
  {{/paper-tab}}
`);

  this.set('parentComponent.previous', 0);
  this.set('parentComponent.selected', 1);
});

test('it cannot select tab if disabled', function(assert) {
  assert.expect(0);

  this.set('parentComponent.send', () => assert.ok(false, 'should not be called'));

  this.render(hbs`<div id="wormhole"></div>{{#paper-tab disabled=true id="testId" parentComponent=parentComponent label="label"}}
    content
  {{/paper-tab}}
`);

  this.$('md-tab-item').click();
});

test('it renders a md-tab-item tag with md-tab class', function(assert) {
  this.render(hbs`{{paper-tab parentComponent=parentComponent}}`);

  assert.ok(this.$('md-tab-item').length === 1);
  assert.ok(this.$('md-tab-item.md-tab').length === 1);
});

test('it renders with md-active class if isActive is true', function(assert) {
  this.set('isActive', true);

  this.render(hbs`{{paper-tab parentComponent=parentComponent isActive=isActive}}`);

  assert.ok(this.$('md-tab-item').hasClass('md-active'));

  this.set('isActive', false);

  assert.notOk(this.$('md-tab-item').hasClass('md-active'));
});

test('it renders with md-disabled class if isDisabled is true', function(assert) {
  this.set('disabled', true);

  this.render(hbs`{{paper-tab parentComponent=parentComponent disabled=disabled}}`);

  assert.ok(this.$('md-tab-item').hasClass('md-disabled'));

  this.set('disabled', false);

  assert.notOk(this.$('md-tab-item').hasClass('md-disabled'));
});
