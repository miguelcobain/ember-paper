import Ember from 'ember';

let { Component } = Ember;

export default Component.extend({
  tagName: 'md-contact-chips',
  classNames: ['md-default-theme'],

  sourceEmpty: Ember.observer('source.length', function() {
    if (!this.get('source').length) {
      this.send('inputBlur');
    }
  }),

  actions: {
    inputFocus() {
      this.set('isFocused', true);
    },

    inputBlur() {
      this.set('isFocused', false);
    },

    autocompleteChange(item, select) {
      if (item) {
        // Trigger onChange for the new item.
        this.sendAction('addItem', item);

        // Reset the underlying ember-power-select so that it's ready for another selection.
        this.$('.ember-power-select-typeahead-input', this.element)[0].value = '';
        select.actions.search('');

        // Re-open ember-power-select to trigger it to reposition the dropdown.
        select.actions.close();
        select.actions.open();
      }
    },

    autocompleteClose() {
      // Mark field as having lost focus.
      this.send('inputBlur');

      if (this.get('source').length) {
        // We still have options left; go ahead and close the underlying ember-power-select.
        return true;
      }

      // There are no options left; the paper-autocomplete / ember-power-select will be removed
      // automatically, so there's no need to try closing it - if you do, you risk trying to close
      // it after it's already been destroyed, which throws an error.
      return false;
    }
  }
});
