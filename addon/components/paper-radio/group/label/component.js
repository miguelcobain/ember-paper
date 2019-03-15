import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,

  tagName: 'md-label',

  didInsertElement() {
    this._super(...arguments);

    if (this.get('setAriaLabelledby')) {
      this.get('setAriaLabelledby')(this.elementId);
    }
  }
});
