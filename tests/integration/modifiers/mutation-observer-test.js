import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { A } from '@ember/array';

function items() {
  return A(['ONE', 'TWO', 'THREE']);
}

module('Integration | Modifier | mutation-observer', function (hooks) {
  setupRenderingTest(hooks);

  test('it does not respond if DOM elements do not change', async function (assert) {
    assert.expect(1);

    const callMeMaybe = () => {
      assert.ok(false, 'No DOM change, callback should not be called');
    };
    this.set('callMeMaybe', callMeMaybe);

    await render(hbs`
      <div {{mutation-observer this.callMeMaybe}}></div>
    `);

    assert.ok(true);
  });

  test('it responds by default when DOM elements are removed', async function (assert) {
    assert.expect(4);

    const callMeMaybe = () => {
      assert.ok(true, 'Callback has been fired due to DOM removal');
    };
    this.set('callMeMaybe', callMeMaybe);
    this.set('items', items());

    await render(hbs`
      <div {{mutation-observer this.callMeMaybe}}>
        {{#each items as |item|}}
          <div class={{item}}>{{item}}</div>
        {{/each}}
      </div>
    `);

    this.items.removeAt(1);
    await settled();

    assert.dom('.ONE').exists();
    assert.dom('.TWO').doesNotExist();
    assert.dom('.THREE').exists();
  });

  test('it responds by default when DOM elements are added', async function (assert) {
    assert.expect(9);

    const callMeMaybe = () => {
      assert.ok(true, 'Callback has been fired due to DOM addition');
    };
    this.set('callMeMaybe', callMeMaybe);
    this.set('items', items());

    await render(hbs`
      <div {{mutation-observer this.callMeMaybe}}>
        {{#each this.items as |item|}}
          <div class={{item}}>{{item}}</div>
        {{/each}}
      </div>
    `);

    assert.dom('.ONE').exists();
    assert.dom('.TWO').exists();
    assert.dom('.THREE').exists();
    assert.dom('.FOUR').doesNotExist();

    this.items.addObject('FOUR');
    await settled();

    assert.dom('.ONE').exists();
    assert.dom('.TWO').exists();
    assert.dom('.THREE').exists();
    assert.dom('.FOUR').exists();
  });

  test('it responds by default when DOM elements are reordered', async function (assert) {
    assert.expect(8);

    const callMeMaybe = () => {
      assert.ok(true, 'Callback has been fired due to DOM mutation');
    };
    this.set('callMeMaybe', callMeMaybe);
    this.set('items', items());

    await render(hbs`
      <div id="outer" {{mutation-observer this.callMeMaybe}}>
        {{#each this.items as |item|}}
          <div class={{item}}>{{item}}</div>
        {{/each}}
      </div>
    `);

    assert.dom('.ONE').exists();
    assert.dom('.TWO').exists();
    assert.dom('.THREE').exists();

    this.items.reverseObjects();
    await settled();

    assert.dom('.ONE').exists();
    assert.dom('.TWO').exists();
    assert.dom('.THREE').exists();
    assert.equal(
      this.element.textContent.trim(),
      'THREE\n          TWO\n          ONE'
    );
  });
});
