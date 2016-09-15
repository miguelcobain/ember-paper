import Ember from 'ember';
import BasicTrigger from 'ember-basic-dropdown/components/basic-dropdown/trigger';
const { computed } = Ember;

export default BasicTrigger.extend({
  tagName: 'md-autocomplete',
  attributeBindings: ['label:md-floating-label','disabled:disabled'],
  disabled: computed('disabledProxy', function() {
    return this.get('disabledProxy') ? this.get('disabledProxy') : undefined;
  }),

  // Chrome 51: setting tabindex=0 explicitly stops tab propogation to
  // other elements. We need to verify that other browsers behave as expected.
  tabIndex: computed('dropdown.disabled', 'tabindex', function() {
    let tabindex = this.get('tabindex');

    // tabindex = falsy - don't set tabindex attr
    if (!tabindex || this.get('dropdown.disabled')) {
      return null;
    }
    return tabindex;
  }),

  actions: {

    handleMousedown() {
      let dropdown = this.get('dropdown');
      if (dropdown.disabled) {
        return;
      }
      this.stopTextSelectionUntilMouseup();
    }
  }
});
