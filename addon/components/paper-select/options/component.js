import PowerSelectOptions from 'ember-power-select/components/power-select/options';

import template from './template';

import { tagName, layout } from '@ember-decorators/component';
import { computed } from '@ember/object';

@tagName('md-content')
@layout(template)
class PaperSelectOptions extends PowerSelectOptions {

  get select() {
    return this._select;
  }

  /**
   * This is an ugly hack to avoid eps from ignoring
   * a selection if the cursor didn't move. There is currently no
   * public way way to avoid this check. By not passing in the select event
   * this check is not done.
   */
  set select(value) {
    let originalChoose = value.actions.choose;
    value.actions.choose = (selected) => originalChoose(selected);
    this._select = value;
  }

  attributeBindings = ['role:role', 'ariaControls:aria-controls'];

  role = 'listbox';

  @computed('select.uniqueId')
  get ariaControls() {
    return `ember-power-select-trigger-${this.select.uniqueId}`;
  }

  init() {
    if (this.isGroup) {
      this.set('tagName', '');
      this.set('attributeBindings', undefined);
    }
    super.init(...arguments);
  }

  didInsertElement() {
    if (this.isGroup) {
      return;
    }
    this.addHandlers(this.element);
  }

}

export default PaperSelectOptions;
