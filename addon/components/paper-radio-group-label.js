/* eslint-disable ember/no-classic-components, ember/no-component-lifecycle-hooks, ember/require-tagless-components */
import Component from '@ember/component';

export default Component.extend({
  tagName: 'md-label',

  didInsertElement() {
    this._super(...arguments);

    if (this.setAriaLabelledby) {
      this.setAriaLabelledby(this.elementId);
    }
  },
});
