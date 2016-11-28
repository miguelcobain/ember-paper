import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('paper-item', 'Integration | Component | paper item', {
  integration: true
});

test('single action checkboxes should react to checkbox clicks', function(assert) {
  assert.expect(1);
  this.set('checkboxEnabled', false);
  this.render(hbs`
    {{#paper-list}}
      {{#paper-item as |controls|}}
        <p>Checkbox 1</p>
        {{controls.checkbox value=checkboxEnabled onChange=(action (mut checkboxEnabled))}}
      {{/paper-item}}
    {{/paper-list}}
  `);
  return wait().then(() => {
    let checkbox = this.$('md-checkbox');
    checkbox.click();
    assert.ok(this.get('checkboxEnabled'));
  });
});

test('single action checkboxes should not react to item clicks when disabled', function(assert) {
  assert.expect(1);
  this.set('checkboxEnabled', false);
  this.render(hbs`
    {{#paper-list}}
      {{#paper-item as |controls|}}
        <p>Checkbox 1</p>
        {{controls.checkbox disabled=true value=checkboxEnabled onChange=(action (mut checkboxEnabled))}}
      {{/paper-item}}
    {{/paper-list}}
  `);
  return wait().then(() => {
    let item = this.$('.md-list-item-inner');
    item.click();
    assert.notOk(this.get('checkboxEnabled'));
  });
});

test('single action checkboxes should react to item clicks', function(assert) {
  assert.expect(1);
  this.set('checkboxEnabled', false);
  this.render(hbs`
    {{#paper-list}}
      {{#paper-item as |controls|}}
        <p>Checkbox 1</p>
        {{controls.checkbox value=checkboxEnabled onChange=(action (mut checkboxEnabled))}}
      {{/paper-item}}
    {{/paper-list}}
  `);
  return wait().then(() => {
    let item = this.$('.md-list-item-inner');
    item.click();
    assert.ok(this.get('checkboxEnabled'));
  });
});

test('Clickable Items with Secondary Controls must not bubble main item action', function(assert) {
  // the switch test is tricky as it involves passing hammer
  // tap event.
  assert.expect(0);
});

test('Item checkbox with secondary action and no primary action is toggled by checkbox click', function(assert) {
  assert.expect(2);
  this.set('secondaryValue', false);
  this.set('checked', false);

  this.render(hbs`
    {{#paper-list}}
      {{#paper-item as |controls|}}
        {{controls.checkbox value=checked onChange=(action (mut checked))}}
        <p>Item with checkbox and secondary action</p>
        {{#controls.button iconButton=true onClick=(action (mut secondaryValue))}}
          {{paper-icon "message"}}
        {{/controls.button}}
      {{/paper-item}}
    {{/paper-list}}
  `);
  let mdCheckbox = this.$('md-checkbox');
  return wait().then(() => {
    mdCheckbox.click();
    assert.ok(this.get('checked'));
    assert.notOk(this.get('secondaryValue'));
  });
});

test('Item checkbox with secondary action and no primary action is toggled by primary click', function(assert) {
  assert.expect(2);
  this.set('secondaryValue', false);
  this.set('checked', false);

  this.render(hbs`
    {{#paper-list}}
      {{#paper-item as |controls|}}
        {{controls.checkbox value=checked onChange=(action (mut checked))}}
        <p>Item with checkbox and secondary action</p>
        {{#controls.button iconButton=true onClick=(action (mut secondaryValue))}}
          {{paper-icon "message"}}
        {{/controls.button}}
      {{/paper-item}}
    {{/paper-list}}
  `);
  let item = this.$('.md-list-item-inner');
  return wait().then(() => {
    item.click();
    assert.ok(this.get('checked'));
    assert.notOk(this.get('secondaryValue'));
  });
});

test('Item checkbox with secondary action and primary action dont bubble secondary event', function(assert) {
  assert.expect(3);
  this.set('secondaryValue', false);
  this.set('checked', false);
  this.set('primaryValue', false);
  this.set('primaryAction', () => {
    this.set('primaryValue', !this.get('primaryValue'));
  });

  this.render(hbs`
    {{#paper-list}}
      {{#paper-item onClick=(action primaryAction) as |controls|}}
        {{controls.checkbox value=checked onChange=(action (mut checked))}}
        <p>Item with checkbox and secondary action</p>
        {{#controls.button secondary=true iconButton=true onClick=(action (mut secondaryValue))}}
          {{paper-icon "message"}}
        {{/controls.button}}
      {{/paper-item}}
    {{/paper-list}}
  `);
  return wait().then(() => {
    let secondaryButton = this.$('button.md-secondary');
    secondaryButton.click();
    assert.ok(this.get('secondaryValue'));
    assert.notOk(this.get('primaryValue'));
    assert.notOk(this.get('checked'));
  });
});

test('Item checkbox with secondary action and primary action dont bubble primary action on checkbox click when checkbox action exists', function(assert) {
  assert.expect(6);
  this.set('secondaryValue', false);
  this.set('checked', false);
  this.set('primaryValue', false);
  this.set('primaryAction', () => {
    this.set('primaryValue', !this.get('primaryValue'));
  });

  this.render(hbs`
    {{#paper-list}}
      {{#paper-item onClick=(action primaryAction) as |controls|}}
        {{controls.checkbox value=checked onChange=(action (mut checked))}}
        <p>Item with checkbox and secondary action</p>
        {{#controls.button iconButton=true onClick=(action (mut secondaryValue))}}
          {{paper-icon "message"}}
        {{/controls.button}}
      {{/paper-item}}
    {{/paper-list}}
  `);
  let item = this.$('.md-list-item-inner');
  let mdCheckbox = this.$('md-checkbox');
  return wait().then(() => {
    mdCheckbox.click();
    assert.ok(this.get('checked'));
    assert.notOk(this.get('primaryValue'));
    assert.notOk(this.get('secondaryValue'));
    item.click();
    assert.ok(this.get('checked'));
    assert.ok(this.get('primaryValue'));
    assert.notOk(this.get('secondaryValue'));
  });
});
