import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper icon', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with tag name', async function(assert) {
    assert.expect(1);

    await render(hbs`{{paper-icon icon="check"}}`);

    assert.dom('md-icon').exists({count: 1})
  });

  test('it renders with classes', async function(assert) {
    assert.expect(5);

    this.set('icon', 'foo');
    await render(hbs`{{paper-icon icon}}`);

    let component = find('md-icon');

    
    assert.dom(component).hasClass('paper-icon');
    assert.dom(component).hasClass('material-icons');

    assert.dom(component).hasText('foo');
    
    this.set('icon', 'bar');
    assert.dom(component).hasText('bar');
    
    assert.notEqual(component.innerHTML.trim(), 'foo');
  });

  test('it renders with spin class', async function(assert) {
    assert.expect(2);

    this.set('spin', true);
    await render(hbs`{{paper-icon "check" spin=spin}}`);

    let component = find('md-icon');

    assert.dom(component).hasClass('md-spin');

    this.set('spin', false);
    assert.dom(component).doesNotHaveClass('md-spin');
    
  });

  test('it renders with reverse spin class', async function(assert) {
    assert.expect(2);

    this.set('reverseSpin', true);
    await render(hbs`{{paper-icon "check" reverseSpin=reverseSpin}}`);

    let component = find('md-icon');
    assert.dom(component).hasClass('md-spin-reverse');

    this.set('reverseSpin', false);

    assert.dom(component).doesNotHaveClass('md-spin-reverse');
  });

  test('it renders with size styles', async function(assert) {
    assert.expect(10);

    this.set('size', 12);
    await render(hbs`{{paper-icon "check" size=size}}`);

    let component = find('md-icon');

    
    assert.dom(component).hasAttribute('style', /font-size:.*12px/);
    assert.dom(component).hasAttribute('style', /height:.*12px/);

    this.set('size', 18);
    assert.dom(component).hasAttribute('style', /font-size:.*18px/);
    assert.dom(component).hasAttribute('style', /height:.*18px/);

    this.set('size', 24);
    assert.dom(component).hasAttribute('style', /font-size:.*24px/);
    assert.dom(component).hasAttribute('style', /height:.*24px/);

    this.set('size', 36);
    assert.dom(component).hasAttribute('style', /font-size:.*36px/);
    assert.dom(component).hasAttribute('style', /height:.*36px/);

    this.set('size', 48);
    assert.dom(component).hasAttribute('style', /font-size:.*48px/);
    assert.dom(component).hasAttribute('style', /height:.*48px/);
  });

  test('it renders with a default aria-label of the icon', async function(assert) {
    assert.expect(2);

    this.set('icon', 'foo-bar');
    await render(hbs`{{paper-icon icon}}`);

    let component = find('md-icon');

    assert.dom(component).hasAttribute('aria-label', 'foo-bar');

    this.set('icon', 'bar-baz');
    assert.dom(component).hasAttribute('aria-label', 'bar-baz');
  });

  test('it renders with a provided aria-label', async function(assert) {
    assert.expect(2);

    this.set('ariaLabel', 'foo-bar');
    await render(hbs`{{paper-icon "check" aria-label=ariaLabel}}`);

    let component = find('md-icon');

    assert.dom(component).hasAttribute('aria-label', 'foo-bar');

    this.set('ariaLabel', 'bar-baz');

    assert.dom(component).hasAttribute('aria-label', 'bar-baz');
  });

  test('it renders the correct ligature when given a dashed or underscored icon name', async function(assert) {
    assert.expect(2);

    this.set('iconName', 'aspect-ratio');
    await render(hbs`{{paper-icon iconName}}`);

    let component = find('md-icon');

    assert.dom(component).hasText('aspect_ratio');

    this.set('iconName', 'aspect_ratio');

    assert.dom(component).hasText('aspect_ratio');
  });

  test('it renders with md-font-icon attribute', async function(assert) {
    assert.expect(1);

    this.set('iconName', 'check');
    await render(hbs`{{paper-icon iconName}}`);

    let component = find('md-icon');

    assert.dom(component).hasAttribute('md-font-icon', 'check');
  });
});
