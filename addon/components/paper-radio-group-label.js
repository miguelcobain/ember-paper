/* eslint-disable ember/no-classic-components, ember/require-tagless-components, ember/no-component-lifecycle-hooks */
import Component from '@ember/component';
import layout from '../templates/components/paper-radio-group-label';

export default Component.extend({
  layout,

  tagName: 'md-label',

  didInsertElement() {
    this._super(...arguments);

    if (this.setAriaLabelledby) {
      this.setAriaLabelledby(this.elementId);
    }
  }
});
