import PowerOptions from 'ember-power-select/components/power-select/options';
import layout from './template';

export default PowerOptions.extend({
  layout,
  tagName: 'md-content',
  init() {
    if (this.get('role') === 'group') {
      this.set('tagName', '');
      this.set('attributeBindings', undefined);
    }
    this._super(...arguments);
  },
  didInsertElement() {
    if (this.get('role') === 'group') {
      return;
    }
    let findOptionAndPerform = (action, e) => {
      let optionItem = e.target.closest('[data-option-index]');
      if (!optionItem) {
        return;
      }
      if (optionItem.closest('[aria-disabled=true]')) {
        return;
      } // Abort if the item or an ancestor is disabled
      let optionIndex = optionItem.getAttribute('data-option-index');
      action(this._optionFromIndex(optionIndex), e);
    };
    this.element.addEventListener('mouseup', (e) => findOptionAndPerform(this.get('select.actions.choose'), e));
    this.element.addEventListener('mouseover', (e) => findOptionAndPerform(this.get('select.actions.highlight'), e));
    if (this.get('isTouchDevice')) {
      this._addTouchEvents();
    }
    if (this.get('role') !== 'group') {
      let select = this.get('select');
      select.actions.scrollTo(select.highlighted);
    }
  }
});
