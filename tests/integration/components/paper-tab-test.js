import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { Object: EmberObject, A, run } = Ember;

moduleForComponent('paper-tab', 'Integration | Component | paper tab', {
  integration: true,
  beforeEach() {
    this.set('parent', EmberObject.create({
      tabs: A([]),
      send() {}
    }));
  }
});

test('it renders a md-tab-item tag', function(assert) {
  this.render(hbs`{{paper-tab parent=parent}}`);

  assert.ok(this.$('md-tab-item').length === 1);
});

test('it renders with md-active class if isActive is true', function(assert) {
  this.set('isActive', true);

  this.render(hbs`{{paper-tab parent=parent isActive=isActive}}`);

  assert.ok(this.$('md-tab-item').hasClass('md-active'));

  this.set('isActive', false);

  assert.notOk(this.$('md-tab-item').hasClass('md-active'));
});

test('it renders with md-disabled class if disabled is true', function(assert) {
  this.set('disabled', true);

  this.render(hbs`{{paper-tab parent=parent disabled=disabled}}`);

  assert.ok(this.$('md-tab-item').hasClass('md-disabled'));

  this.set('disabled', false);

  assert.notOk(this.$('md-tab-item').hasClass('md-disabled'));
});

test('it calls onSelect on click action with self', function(assert) {
  assert.expect(1);

  this.set('onSelect', function({ id }) {
    assert.equal(id, 42, 'onSelect is called with self');
  });

  this.render(hbs`{{paper-tab id=42 parent=parent onSelect=(action onSelect)}}`);

  this.$('md-tab-item').click();
});

test('it calls onDeselect with self when another tab is opened', function(assert) {
  assert.expect(1);

  this.set('onDeselect', function({ id }) {
    assert.equal(id, 42, 'onDeselect is called with self');
  });

  this.render(hbs`{{paper-tab id=42 parent=parent onDeselect=(action onDeselect)}}`);

  run(this, function() {
    this.get('parent').setProperties({
      selected: 1,
      lastSelectedIndex: 0
    });
  });
});