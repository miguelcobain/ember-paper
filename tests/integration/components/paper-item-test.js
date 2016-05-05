import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';

const { set, get } = Ember;

moduleForComponent('paper-item', 'Integration | Component | paper item', {
  integration: true
});

test('single action checkboxes should react to checkbox clicks', function(assert) {
  assert.expect(1);
  set(this, 'checkboxEnabled', false);
  this.render(hbs`
    {{#paper-list}}
      {{#paper-item}}
        <p>Checkbox 1</p>
        {{paper-checkbox class="md-secondary" value=checkboxEnabled onChange=(action (mut checkboxEnabled))}}
      {{/paper-item}}
    {{/paper-list}}
  `);
  return wait().then(() => {
    let checkbox = this.$('md-checkbox');
    checkbox.click();
    assert.ok(get(this, 'checkboxEnabled'));
  });
});

test('single action checkboxes should not react to item clicks when disabled', function(assert) {
  assert.expect(1);
  set(this, 'checkboxEnabled', false);
  this.render(hbs`
    {{#paper-list}}
      {{#paper-item}}
        <p>Checkbox 1</p>
        {{paper-checkbox class="md-secondary" disabled=true value=checkboxEnabled onChange=(action (mut checkboxEnabled))}}
      {{/paper-item}}
    {{/paper-list}}
  `);
  return wait().then(() => {
    let item = this.$('.md-list-item-inner');
    item.click();
    assert.notOk(get(this, 'checkboxEnabled'));
  });
});

test('single action checkboxes should react to item clicks', function(assert) {
  assert.expect(1);
  set(this, 'checkboxEnabled', false);
  this.render(hbs`
    {{#paper-list}}
      {{#paper-item}}
        <p>Checkbox 1</p>
        {{paper-checkbox class="md-secondary" value=checkboxEnabled onChange=(action (mut checkboxEnabled))}}
      {{/paper-item}}
    {{/paper-list}}
  `);
  return wait().then(() => {
    let item = this.$('.md-list-item-inner');
    item.click();
    assert.ok(get(this, 'checkboxEnabled'));
  });
});

test('Clickable Items with Secondary Controls must not bubble main item action', function(assert) {
  // the switch test is tricky as it involves passing hammer
  // tap event.
  assert.expect(0);
});

test('Item checkbox with secondary action and no primary action is toggled by checkbox click', function(assert) {
  assert.expect(2);
  set(this, 'secondaryValue', false);
  set(this, 'checked', false);

  this.render(hbs`
    {{#paper-list}}
      {{#paper-item}}
        {{#paper-checkbox value=checked onChange=(action (mut checked))}}{{/paper-checkbox}}
        <p>Item with checkbox and secondary action</p>
        {{#paper-button class="md-secondary" iconButton=true onClick=(action (mut secondaryValue))}}
          {{paper-icon "message"}}
        {{/paper-button}}
      {{/paper-item}}
    {{/paper-list}}
  `);
  let mdCheckbox = this.$('md-checkbox');
  return wait().then(() => {
    mdCheckbox.click();
    assert.ok(get(this, 'checked'));
    assert.notOk(get(this, 'secondaryValue'));
  });
});

test('Item checkbox with secondary action and no primary action is toggled by primary click', function(assert) {
  assert.expect(2);
  set(this, 'secondaryValue', false);
  set(this, 'checked', false);

  this.render(hbs`
    {{#paper-list}}
      {{#paper-item}}
        {{#paper-checkbox value=checked onChange=(action (mut checked))}}{{/paper-checkbox}}
        <p>Item with checkbox and secondary action</p>
        {{#paper-button class="md-secondary" iconButton=true onClick=(action (mut secondaryValue))}}
          {{paper-icon "message"}}
        {{/paper-button}}
      {{/paper-item}}
    {{/paper-list}}
  `);
  let item = this.$('.md-list-item-inner');
  return wait().then(() => {
    item.click();
    assert.ok(get(this, 'checked'));
    assert.notOk(get(this, 'secondaryValue'));
  });
});

test('Item checkbox with secondary action and primary action dont bubble secondary event', function(assert) {
  assert.expect(3);
  set(this, 'secondaryValue', false);
  set(this, 'checked', false);
  set(this, 'primaryValue', false);
  set(this, 'primaryAction', () => {
    set(this, 'primaryValue', !get(this, 'primaryValue'));
  });

  this.render(hbs`
    {{#paper-list}}
      {{#paper-item onClick=(action primaryAction)}}
          {{#paper-checkbox value=checked onChange=(action (mut checked))}}{{/paper-checkbox}}
          <p>Item with checkbox and secondary action</p>
          {{#paper-button class="md-secondary" iconButton=true onClick=(action (mut secondaryValue))}}
            {{paper-icon "message"}}
          {{/paper-button}}
      {{/paper-item}}
    {{/paper-list}}
  `);
  return wait().then(() => {
    let secondaryButton = this.$('button');
    secondaryButton.click();
    assert.ok(get(this, 'secondaryValue'));
    assert.notOk(get(this, 'primaryValue'));
    assert.notOk(get(this, 'checked'));
  });
});

test('Item checkbox with secondary action and primary action dont bubble primary action on checkbox click when checkbox action exists', function(assert) {
  assert.expect(6);
  set(this, 'secondaryValue', false);
  set(this, 'checked', false);
  set(this, 'primaryValue', false);
  set(this, 'primaryAction', () => {
    set(this, 'primaryValue', !get(this, 'primaryValue'));
  });

  this.render(hbs`
    {{#paper-list}}
      {{#paper-item onClick=(action primaryAction)}}
          {{#paper-checkbox value=checked onChange=(action (mut checked))}}{{/paper-checkbox}}
          <p>Item with checkbox and secondary action</p>
          {{#paper-button class="md-secondary" iconButton=true onClick=(action (mut secondaryValue))}}
            {{paper-icon "message"}}
          {{/paper-button}}
      {{/paper-item}}
    {{/paper-list}}
  `);
  let item = this.$('.md-list-item-inner');
  let mdCheckbox = this.$('md-checkbox');
  return wait().then(() => {
    mdCheckbox.click();
    assert.ok(get(this, 'checked'));
    assert.notOk(get(this, 'primaryValue'));
    assert.notOk(get(this, 'secondaryValue'));
    item.click();
    assert.ok(get(this, 'checked'));
    assert.ok(get(this, 'primaryValue'));
    assert.notOk(get(this, 'secondaryValue'));
  });
});

