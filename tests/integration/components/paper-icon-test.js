import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper icon', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with tag name', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-icon icon="check"}}`);

    assert.ok(this.$('md-icon').length);
  });

  test('it renders with classes', async function(assert) {
    assert.expect(5);

    this.set('icon', 'foo');
    await render(hbs`{{paper-icon icon}}`);

    let $component = this.$('md-icon');

    assert.ok($component.hasClass('paper-icon'));
    assert.ok($component.hasClass('material-icons'));
    assert.equal($component.text().trim(), 'foo');
    this.set('icon', 'bar');
    assert.equal($component.text().trim(), 'bar');
    assert.notEqual($component.text().trim(), 'foo');
  });

  test('it renders with spin class', async function(assert) {
    assert.expect(2);

    this.set('spin', true);
    await render(hbs`{{paper-icon "check" spin=spin}}`);

    let $component = this.$('md-icon');

    assert.ok($component.hasClass('md-spin'));

    this.set('spin', false);
    assert.notOk($component.hasClass('md-spin'));
  });

  test('it renders with reverse spin class', async function(assert) {
    assert.expect(2);

    this.set('reverseSpin', true);
    await render(hbs`{{paper-icon "check" reverseSpin=reverseSpin}}`);

    let $component = this.$('md-icon');

    assert.ok($component.hasClass('md-spin-reverse'));

    this.set('reverseSpin', false);
    assert.notOk($component.hasClass('md-spin-reverse'));
  });

  test('it renders with size styles', async function(assert) {
    assert.expect(10);

    this.set('size', 12);
    await render(hbs`{{paper-icon "check" size=size}}`);

    let $component = this.$('md-icon');

    assert.ok(/font-size:.*12px/.test($component.attr('style')));
    assert.ok(/height:.*12px/.test($component.attr('style')));

    this.set('size', 18);
    assert.ok(/font-size:.*18px/.test($component.attr('style')));
    assert.ok(/height:.*18px/.test($component.attr('style')));

    this.set('size', 24);
    assert.ok(/font-size:.*24px/.test($component.attr('style')));
    assert.ok(/height:.*24px/.test($component.attr('style')));

    this.set('size', 36);
    assert.ok(/font-size:.*36px/.test($component.attr('style')));
    assert.ok(/height:.*36px/.test($component.attr('style')));

    this.set('size', 48);
    assert.ok(/font-size:.*48px/.test($component.attr('style')));
    assert.ok(/height:.*48px/.test($component.attr('style')));
  });

  test('it renders with a default aria-label of the icon', async function(assert) {
    assert.expect(2);

    this.set('icon', 'foo-bar');
    await render(hbs`{{paper-icon icon}}`);

    let $component = this.$('md-icon');

    assert.equal($component.attr('aria-label'), 'foo-bar');

    this.set('icon', 'bar-baz');

    assert.equal($component.attr('aria-label'), 'bar-baz');
  });

  test('it renders with a provided aria-label', async function(assert) {
    assert.expect(2);

    this.set('ariaLabel', 'foo-bar');
    await render(hbs`{{paper-icon "check" aria-label=ariaLabel}}`);

    let $component = this.$('md-icon');

    assert.equal($component.attr('aria-label'), 'foo-bar');

    this.set('ariaLabel', 'bar-baz');

    assert.equal($component.attr('aria-label'), 'bar-baz');
  });

  test('it renders the correct ligature when given a dashed or underscored icon name', async function(assert) {
    assert.expect(2);

    this.set('iconName', 'aspect-ratio');
    await render(hbs`{{paper-icon iconName}}`);

    let $component = this.$('md-icon');

    assert.equal($component.text().trim(), 'aspect_ratio');

    this.set('iconName', 'aspect_ratio');

    assert.equal($component.text().trim(), 'aspect_ratio');
  });

  test('it renders with md-font-icon attribute', async function(assert) {
    assert.expect(1);

    this.set('iconName', 'check');
    await render(hbs`{{paper-icon iconName}}`);

    let $component = this.$('md-icon');

    assert.equal($component.attr('md-font-icon'), 'check');
  });
});
