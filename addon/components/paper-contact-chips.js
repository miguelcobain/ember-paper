import Ember from 'ember';
import PaperChips from 'ember-paper/components/paper-chips';

let { isEmpty, isPresent } = Ember;

export default PaperChips.extend({
  tagName: 'md-contact-chips',
  classNames: ['md-default-theme'],

  sourceEmpty: Ember.observer('source.length', function() {
    if (!this.get('source').length) {
      // Delay slightly so that autocomplete can be replaced with input.
      Ember.run.later(() => this.$('.md-chip-input-container input').focus(), 10);
    }
  }),

  actions: {
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
      // Reset reference to autocomplete widget.
      this.set('autocomplete', null);

      if (this.get('activeChip') === -1) {
        // Mark field as having lost focus - no chip is selected.
        this.send('inputBlur');
      }

      if (this.get('source').length) {
        // We still have options left; go ahead and close the underlying ember-power-select.
        return true;
      }

      // There are no options left; the paper-autocomplete / ember-power-select will be removed
      // automatically, so there's no need to try closing it - if you do, you risk trying to close
      // it after it's already been destroyed, which throws an error.
      return false;
    },

    inputFocus(autocomplete) {
      this._super(arguments);

      // Keep track of the autocomplete, so we can force it to close when navigating to chips.
      if (isEmpty(this.get('autocomplete'))) {
        this.set('autocomplete', autocomplete);
      }
    },

    keyDown(event) {
      const input = this.$('.md-chip-input-container input')[0];
      if (!this.get('readOnly') && isEmpty(input.value) && isPresent(this.get('content'))) {
        this.keyboardNavigation(event);
        if (this.get('activeChip') >= 0 && !isEmpty(this.get('autocomplete')) && !isEmpty(this.get('autocomplete').actions)) {
          this.get('autocomplete').actions.close();
        }
      } else {
        // Make sure we don't leave a chip focused while typing.
        this.set('activeChip', -1);
      }
    },

    noUnselected(old, event) {
      if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        this.sendAction('keyDown', event);
      }

      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }
});
