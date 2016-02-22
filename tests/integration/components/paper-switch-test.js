import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-switch', 'Integration | Component | paper switch', {
  integration: true
});

test('Should set selected class correctly', function(assert) {
  this.set('foo', () => { });
  this.set('switchValue', true);

  this.render(hbs`
    {{#paper-switch checked=switchValue onchange=foo}}
      Radio button 1
    {{/paper-switch}}
  `);
  assert.ok(this.$('md-switch').hasClass('md-checked'));

  this.set('switchValue', false);
  assert.ok(!this.$().hasClass('md-checked'));
});

test('Should render block content as label', function(assert) {
  this.set('foo', () => { });
  this.set('switchValue', true);

  this.render(hbs`
    {{#paper-switch checked=switchValue onchange=foo}}
      A block label
    {{/paper-switch}}
  `);
  assert.equal(this.$('md-switch .md-label').text().trim(), 'A block label');
});

test('Blockless mode should render label', function(assert) {
  this.set('foo', () => { });
  this.set('switchValue', true);

  this.render(hbs`
    {{paper-switch checked=switchValue onchange=foo label="An inline label"}}
  `);
  assert.equal(this.$('md-switch .md-label').text().trim(), 'An inline label');
});

test('the `onchange` function is mandatory for paper-switch', function(assert) {
  assert.expect(1);

  assert.throws(() => {
    this.render(hbs`{{paper-switch value=true}}`);
  }, /requires an `onchange` function/);
});
