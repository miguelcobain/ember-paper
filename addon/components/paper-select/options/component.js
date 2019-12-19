import PowerSelectOptions from 'ember-power-select/components/power-select/options';

import template from './template';

import { tagName, layout } from '@ember-decorators/component';
import { computed } from '@ember/object';

@tagName('md-content')
@layout(template)
class PaperSelectOptions extends PowerSelectOptions {

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
