import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, click } from 'ember-native-dom-helpers';

moduleForComponent('paper-nav-bar', 'Integration | Component | paper nav bar', {
  integration: true
});

test('can set default selected tab', function(assert) {
  this.render(hbs`
    {{#paper-nav-bar selectedNavItem="two" as |nav|}}
      {{nav.item name="one"}}
      {{nav.item name="two"}}
      {{nav.item name="three"}}
    {{/paper-nav-bar}}
  `);

  assert.ok(find('.md-nav-item:nth-child(2)').hasAttribute('aria-selected'));
});

test('blockless nav bar items render name prop', function(assert) {
  this.render(hbs`
    {{#paper-nav-bar as |nav|}}
      {{nav.item name="one"}}
      {{nav.item name="two"}}
      {{nav.item name="three"}}
    {{/paper-nav-bar}}
  `);

  assert.ok(find('.md-nav-item:nth-child(1)').textContent, 'one');
  assert.ok(find('.md-nav-item:nth-child(2)').textContent, 'two');
  assert.ok(find('.md-nav-item:nth-child(3)').textContent, 'three');
});

test('block nav bar items renders block', function(assert) {
  this.render(hbs`
    {{#paper-nav-bar as |nav|}}
      {{#nav.item}}
        one
      {{/nav.item}}
      {{#nav.item}}
        two
      {{/nav.item}}
      {{#nav.item}}
        three
      {{/nav.item}}
    {{/paper-nav-bar}}
  `);

  assert.ok(find('.md-nav-item:nth-child(1)').textContent, 'one');
  assert.ok(find('.md-nav-item:nth-child(2)').textContent, 'two');
  assert.ok(find('.md-nav-item:nth-child(3)').textContent, 'three');
});

test('can change selected tab using property', function(assert) {
  this.selected = 'two';

  this.render(hbs`
    {{#paper-nav-bar selectedNavItem=selected as |nav|}}
      {{nav.item name="one"}}
      {{nav.item name="two"}}
      {{nav.item name="three"}}
    {{/paper-nav-bar}}
  `);

  assert.ok(find('.md-nav-item:nth-child(2)').hasAttribute('aria-selected'));

  this.set('selected', 'three');

  assert.ok(find('.md-nav-item:nth-child(3)').hasAttribute('aria-selected'));

});

test('clicking on a tab sets it to active', async function(assert) {
  this.render(hbs`
    {{#paper-nav-bar as |nav|}}
      {{nav.item name="one"}}
      {{nav.item name="two"}}
      {{nav.item name="three"}}
    {{/paper-nav-bar}}
  `);

  await click('.md-nav-item:nth-child(3) button');

  assert.ok(find('.md-nav-item:nth-child(3)').hasAttribute('aria-selected'));
});

test('clicking on multiple tabs works', async function(assert) {
  this.render(hbs`
    {{#paper-nav-bar as |nav|}}
      {{nav.item name="one"}}
      {{nav.item name="two"}}
      {{nav.item name="three"}}
    {{/paper-nav-bar}}
  `);

  await click('.md-nav-item:nth-child(2) button');
  await click('.md-nav-item:nth-child(3) button');
  await click('.md-nav-item:nth-child(1) button');

  assert.ok(find('.md-nav-item:nth-child(1)').hasAttribute('aria-selected'));
});

test('onChange is triggered', async function(assert) {
  assert.expect(1);

  this.onChange = (name) => {
    assert.equal(name, 'two');
  };

  this.render(hbs`
    {{#paper-nav-bar onChange=onChange as |nav|}}
      {{nav.item name="one"}}
      {{nav.item name="two"}}
      {{nav.item name="three"}}
    {{/paper-nav-bar}}
  `);

  await click('.md-nav-item:nth-child(2) button');
});

test('item onClick is triggered', async function(assert) {
  assert.expect(1);

  this.onClick = () => {
    assert.ok(true);
  };

  this.render(hbs`
    {{#paper-nav-bar onChange=onChange as |nav|}}
      {{nav.item name="one"}}
      {{nav.item name="two"}}
      {{nav.item name="three" onClick=onClick}}
    {{/paper-nav-bar}}
  `);

  await click('.md-nav-item:nth-child(3) button');
});

test('has ink bar by default', async function(assert) {
  this.render(hbs`
    {{#paper-nav-bar as |nav|}}
      {{nav.item}}
      {{nav.item}}
      {{nav.item}}
    {{/paper-nav-bar}}
  `);

  assert.ok(find('md-nav-ink-bar'));
});

test('noInkBar disables ink bar', async function(assert) {

  this.render(hbs`
    {{#paper-nav-bar noInkBar=true as |nav|}}
      {{nav.item}}
      {{nav.item}}
      {{nav.item}}
    {{/paper-nav-bar}}
  `);

  assert.notOk(find('md-nav-ink-bar'));
});
