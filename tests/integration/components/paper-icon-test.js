import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper-icon', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with tag name', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-icon icon="check"}}`);

    assert.dom('md-icon').exists({ count: 1 });
  });

  test('it renders with classes', async function(assert) {
    assert.expect(5);

    this.set('icon', 'foo');
    await render(hbs`{{paper-icon icon}}`);

    assert.dom('md-icon').hasClass('paper-icon');
    assert.dom('md-icon').hasClass('material-icons');

    assert.dom('md-icon').hasText('foo');

    this.set('icon', 'bar');
    assert.dom('md-icon').hasText('bar');
    assert.dom('md-icon').doesNotIncludeText('foo');
  });

  test('it renders with spin class', async function(assert) {
    assert.expect(2);

    this.set('spin', true);
    await render(hbs`{{paper-icon "check" spin=spin}}`);

    assert.dom('md-icon').hasClass('md-spin');

    this.set('spin', false);
    assert.dom('md-icon').doesNotHaveClass('md-spin');

  });

  test('it renders with reverse spin class', async function(assert) {
    assert.expect(2);

    this.set('reverseSpin', true);
    await render(hbs`{{paper-icon "check" reverseSpin=reverseSpin}}`);

    assert.dom('md-icon').hasClass('md-spin-reverse');

    this.set('reverseSpin', false);

    assert.dom('md-icon').doesNotHaveClass('md-spin-reverse');
  });

  test('it renders with size styles', async function(assert) {
    assert.expect(10);

    this.set('size', 12);
    await render(hbs`{{paper-icon "check" size=size}}`);

    assert.dom('md-icon').hasAttribute('style', /font-size:.*12px/);
    assert.dom('md-icon').hasAttribute('style', /height:.*12px/);

    this.set('size', 18);
    assert.dom('md-icon').hasAttribute('style', /font-size:.*18px/);
    assert.dom('md-icon').hasAttribute('style', /height:.*18px/);

    this.set('size', 24);
    assert.dom('md-icon').hasAttribute('style', /font-size:.*24px/);
    assert.dom('md-icon').hasAttribute('style', /height:.*24px/);

    this.set('size', 36);
    assert.dom('md-icon').hasAttribute('style', /font-size:.*36px/);
    assert.dom('md-icon').hasAttribute('style', /height:.*36px/);

    this.set('size', 48);
    assert.dom('md-icon').hasAttribute('style', /font-size:.*48px/);
    assert.dom('md-icon').hasAttribute('style', /height:.*48px/);
  });

  test('it renders with a default aria-label of the icon', async function(assert) {
    assert.expect(2);

    this.set('icon', 'foo-bar');
    await render(hbs`{{paper-icon icon}}`);

    assert.dom('md-icon').hasAttribute('aria-label', 'foo-bar');

    this.set('icon', 'bar-baz');
    assert.dom('md-icon').hasAttribute('aria-label', 'bar-baz');
  });

  test('it renders with a provided aria-label', async function(assert) {
    assert.expect(2);

    this.set('ariaLabel', 'foo-bar');
    await render(hbs`{{paper-icon "check" aria-label=ariaLabel}}`);

    assert.dom('md-icon').hasAttribute('aria-label', 'foo-bar');

    this.set('ariaLabel', 'bar-baz');

    assert.dom('md-icon').hasAttribute('aria-label', 'bar-baz');
  });

  test('it renders the correct ligature when given a dashed or underscored icon name', async function(assert) {
    assert.expect(2);

    this.set('iconName', 'aspect-ratio');
    await render(hbs`{{paper-icon iconName}}`);

    assert.dom('md-icon').hasText('aspect_ratio');

    this.set('iconName', 'aspect_ratio');

    assert.dom('md-icon').hasText('aspect_ratio');
  });

  test('it renders with md-font-icon attribute', async function(assert) {
    assert.expect(1);

    this.set('iconName', 'check');
    await render(hbs`{{paper-icon iconName}}`);

    assert.dom('md-icon').hasAttribute('md-font-icon', 'check');
  });

  test('it renders with a provided aria-hidden attribute', async function(assert) {
    assert.expect(1);

    this.set('ariaHidden', true);
    await render(hbs`{{paper-icon "check" aria-hidden=ariaHidden}}`);

    assert.dom('md-icon').hasAttribute('aria-hidden');
  });
});
