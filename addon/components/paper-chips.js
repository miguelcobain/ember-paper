import Ember from 'ember';

const { Component, isEmpty, isPresent } = Ember;

export default Component.extend({
  tagName: 'md-chips',
  classNames: ['md-default-theme'],
  activeChip: -1,

  resetActiveChip: Ember.observer('isFocused', function() {
    if (!this.get('isFocused')) {
      this.set('activeChip', -1);
    }
  }),

  sourceEmpty: Ember.observer('source.length', function() {
    if (!this.get('source').length) {
      // Delay slightly so that autocomplete can be replaced with input.
      Ember.run.later(() => this.$('.md-chip-input-container input').focus(), 10);
    }
  }),

  actions: {
    addItem(newItem) {
      if (this.get('requireMatch')) {
        // Don't add a new item - we're set to require a match.
        return;
      }

      if (isPresent(newItem)) {
        let item = newItem;

        if (isPresent(this.get('searchField'))) {
          item = {};
          item[this.get('searchField')] = newItem;
        }

        this.sendAction('addItem', item);
        this.set('newChipValue', '');

        if (isPresent(this.get('autocomplete'))) {
          // We have an autocomplete - reset it once it's closed itself.
          Ember.run.later(this, this.resetAutocomplete, 10);
        }
      }
    },

    inputFocus(autocomplete) {
      let input = this.$('.md-chip-input-container input');
      this.set('isFocused', true);

      if (!this.get('content').length && !input.is(':focus')) {
        input.focus();
      } else {
        this.set('activeChip', -1);
      }

      // Keep track of the autocomplete, so we can force it to close when navigating to chips.
      if (isEmpty(this.get('autocomplete')) && input.is('.ember-power-select-typeahead-input')) {
        this.set('autocomplete', autocomplete);
      }
    },

    inputBlur() {
      this.set('isFocused', false);
    },

    autocompleteChange(item) {
      if (item) {
        // Trigger onChange for the new item.
        this.sendAction('addItem', item);

        this.resetAutocomplete();
        return true;
      }
    },

    autocompleteClose() {
      if (this.get('activeChip') === -1) {
        // Mark field as having lost focus - no chip is selected.
        this.send('inputBlur');
      }

      if (this.get('source').length) {
        // We still have options left; go ahead and close the underlying ember-power-select.
        return true;
      }

      // Reset reference to autocomplete widget.
      this.set('autocomplete', null);

      // There are no options left; the paper-autocomplete / ember-power-select will be removed
      // automatically, so there's no need to try closing it - if you do, you risk trying to close
      // it after it's already been destroyed, which throws an error.
      return false;
    },

    keyDown(event) {
      let [input] = this.$('.md-chip-input-container input');
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
      if (['Backspace', 'Delete', 'Del', 'ArrowLeft', 'Left', 'ArrowRight', 'Right'].includes(event.key)) {
        this.sendAction('keyDown', event);
      } else if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
        // Reject printable key presses
        event.preventDefault();
        event.stopPropagation();
        return false;
      }

    }
  },

  keyboardNavigation({ key }) {
    // No text has been entered, but we have chips; cursor keys should select chips.
    let current = this.get('activeChip');
    let chips = this.get('content');
    let input = this.$('.md-chip-input-container input');

    if (['ArrowLeft', 'Left'].includes(key) || (key === 'Backspace' && current === -1)) {
      if (current === -1) {
        this.$('md-chips-wrap', this.element).focus();
        this.set('activeChip', chips.length - 1);
      } else if (current > 0) {
        this.decrementProperty('activeChip');
      }
    } else if (['ArrowRight', 'Right'].includes(key)) {
      if (current >= 0) {
        this.incrementProperty('activeChip');
      }

      if (this.get('activeChip') >= chips.length) {
        this.set('activeChip', -1);
        input.focus();
      }
    } else if (current >= 0 && ['Backspace', 'Delete', 'Del'].includes(key)) {
      this.sendAction('removeItem', chips[current]);
      if (current >= chips.length) {
        // Delay slightly so that any changes have happened.
        Ember.run.later(() => this.$('.md-chip-input-container input').focus(), 10);
        this.set('activeChip', -1);
      }
    }
  },

  resetAutocomplete() {
    let select = this.get('autocomplete');
    let [input] = this.$('.ember-power-select-typeahead-input', this.element);

    if (isEmpty(input) || isEmpty(select)) {
      // Autocomplete has been removed, so we have nothing left to do.
      return;
    }

    // Reset the underlying ember-power-select so that it's ready for another selection.
    input.value = '';
    select.actions.search('');

    // Re-open ember-power-select to trigger it to reposition the dropdown.
    select.actions.close();
    select.actions.open();
    input.focus();
  }
});
