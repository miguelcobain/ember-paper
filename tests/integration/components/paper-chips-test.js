import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerKeyEvent, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper-chips', function(hooks) {
  setupRenderingTest(hooks);

  test('on input, opens dropdown with matched options', async function(assert) {
    this.items = ['Two', 'Three', 'Ten', 'Thirtneen'];
    this.selectedItems = [];
    await render(hbs`
    {{paper-chips
      options=items
      content=selectedItems}}`);

    await fillIn('md-chips input', 'T');
    assert.dom('.md-autocomplete-suggestions li').exists({ count: this.items.length });
  });

  test('without defaultHighlighted, none of the dropdown options are highlighted', async function(assert) {
    this.items = ['Two', 'Three', 'Ten', 'Thirtneen'];
    this.selectedItems = [];

    await render(hbs`
    {{paper-chips
      options=items
      content=selectedItems}}`);

    await fillIn('md-chips input', 'T');
    assert.dom('.md-autocomplete-suggestions li.selected').doesNotExist();
  });

  test('providing defaultHighlighted, opens dropdown where that option is highlighted', async function(assert) {
    this.items = ['Two', 'Three', 'Ten', 'Thirtneen'];
    this.selectedItems = [];
    this.defaultHighlighted = (a) => a.results[0];

    await render(hbs`
    {{paper-chips
      defaultHighlighted=defaultHighlighted
      options=items
      content=selectedItems}}`);

    await fillIn('md-chips input', 'T');
    assert.dom('.md-autocomplete-suggestions li#selected_option').exists({ count: 1 });
  });

  test('pressing ENTER key, sets defaultHighlighted item as selected', async function(assert) {
    this.items = ['Two', 'Three', 'Ten', 'Thirtneen'];
    this.selectedItems = [];
    this.defaultHighlighted = (a) => a.results[0];
    this.addItems = (item) => {
      this.set('selectedItems', [...this.selectedItems, item]);
    };

    await render(hbs`
    {{paper-chips
      addItem=(action addItems)
      defaultHighlighted=defaultHighlighted
      options=items
      content=selectedItems}}`);

    await fillIn('md-chips input', 'T');
    assert.dom('.md-autocomplete-suggestions li#selected_option').exists({ count: 1 });

    await triggerKeyEvent('md-chips input', 'keydown', 13);
    assert.dom('md-chip').exists({ count: this.selectedItems.length });
    assert.dom('md-chip .md-chip-content').hasText('Two');
    assert.equal(this.selectedItems[0], this.items[0]);
  });

});
