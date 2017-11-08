import Ember from 'ember';
import PowerOptions from 'ember-power-select/components/power-select/options';
import layout from '../templates/components/paper-select-options';

const { $ } = Ember;

export default PowerOptions.extend({
  layout,
  tagName: 'md-content',
  init() {
    if (this.get('role') === 'group') {
      this.set('tagName', '');
      this.set('attributeBindings', undefined);
    } else if (this.get('searchEnabled')) {
      this.set('tagName', 'md-optgroup');
    }
    this._super(...arguments);
  },
  didInsertElement() {
    if (this.get('role') === 'group') {
      return;
    }
    let findOptionAndPerform = (action, e) => {
      let optionItem = $(e.target).closest('[data-option-index]');
      if (!optionItem || !(0 in optionItem)) {
        return;
      }
      if (optionItem.closest('[aria-disabled=true]').length) {
        return;
      } // Abort if the item or an ancestor is disabled
      let optionIndex = optionItem[0].getAttribute('data-option-index');
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