import Ember from 'ember';
import layout from '../templates/components/paper-chips';

const { Component, isEmpty, isPresent, computed, observer, run } = Ember;

export default Component.extend({
  layout,
  tagName: 'md-chips',
  classNames: ['md-default-theme'],
  activeChip: -1,
  focusedElement: 'none',
  isFocused: computed('focusedElement', function() {
    if (this.get('focusedElement') === 'none') {
      return false;
    }

    return true;
  }),
  resetTimer: null,
  lastItemChosen: false,

  handleFocusChange: observer('focusedElement', 'activeChip', function() {
    let element = this.get('focusedElement');

    if (!this.get('isFocused')) {
      this.set('activeChip', -1);
    }

    if ((element === 'chips' && (this.get('activeChip') !== -1)) || element === 'input') {
      this.sendAction('focusIn', window.event);
    } else {
      this.sendAction('focusOut', window.event);
    }
  }),

  click() {
    this.getInput().focus();
  },

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
          this.queueReset();
        }
      }
    },

    removeItem(item) {
      this.sendAction('removeItem', item);
      let current = this.get('activeChip');

      if (current === -1 || current >= this.get('content').length) {
        this.queueReset();
        this.set('activeChip', -1);
      }
    },

    inputFocus(autocomplete) {
      let input = this.getInput();

      this.set('focusedElement', 'input');

      if (!this.get('content').length && !input.is(':focus')) {
        input.focus();
      } else {
        this.set('activeChip', -1);
      }

      // Keep track of the autocomplete, so we can force it to close when navigating to chips.
      if (isEmpty(this.get('autocomplete')) && input.is('.ember-paper-autocomplete-search-input')) {
        this.set('autocomplete', autocomplete);
      }

      // We don't want the autocomplete to open on focus - it'll open when the user starts typing.
      if (isPresent(autocomplete)) {
        autocomplete.actions.close();
      }
    },

    inputBlur(_, event) {
      if (this.focusMovingTo('.ember-power-select-option', event)) {
        // Focus has shifted to an item - don't mess with this event.
        return true;
      }

      if (this.get('lastItemChosen')) {
        // Last item has been chosen; select will be replaced with an input - ignore blur event.
        this.set('lastItemChosen', false);
        return true;
      }

      if (!this.focusMovingTo('md-chips-wrap', event)) {
        this.set('focusedElement', 'none');
      }
    },

    chipsFocus() {
      this.set('focusedElement', 'chips');
    },

    chipsBlur(event) {
      if (!this.focusMovingTo(this.getInput(), event)) {
        this.set('focusedElement', 'none');
        this.set('activeChip', -1);
      }
    },

    chipClick(index, event) {
      // Prevent click from bubbling up to the chips element.
      event.stopPropagation();

      // If we have a valid chip index, make it active.
      if (!isEmpty(index) && !this.get('readOnly')) {
        // Shift actual focus to wrap so that subsequent blur events work as expected.
        this.$('md-chips-wrap').focus();

        // Update state to reflect the clicked chip being active.
        this.set('focusedElement', 'chips');
        this.set('activeChip', index);
      }
    },

    autocompleteChange(item) {
      if (item) {
        // Trigger onChange for the new item.
        this.sendAction('addItem', item);

        this.queueReset();

        // Track selection of last item if no match required.
        if (this.get('options').length === 1 && !this.get('requireMatch')) {
          this.set('lastItemChosen', true);
          this.set('autocomplete', null);
        }

        return true;
      }
    },

    searchTextChange(searchText, select) {
      // Close dropdown if search text is cleared by the user.
      if (isEmpty(searchText)) {
        select.actions.close();
      }
    },

    keyDown(event) {
      let input = this.getInput().get(0);
      if (!this.get('readOnly') && isEmpty(input.value) && isPresent(this.get('content'))) {
        this.keyboardNavigation(event);
        if (this.get('activeChip') >= 0) {
          this.closeAutocomplete();
        }
      } else {
        // Make sure we don't leave a chip focused while typing.
        this.set('activeChip', -1);
        this.set('focusedElement', 'input');
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
    let input = this.getInput();

    if (['ArrowLeft', 'Left'].includes(key) || (key === 'Backspace' && current === -1)) {
      if (current === -1) {
        input.blur();
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
        this.queueReset();
        this.set('activeChip', -1);
      }
    }
  },

  resetInput() {
    let select = this.get('autocomplete');
    let input = this.getInput();

    if (input.is('.ember-paper-autocomplete-search-input') && isPresent(select)) {
      // Reset the underlying ember-power-select so that it's ready for another selection.
      input.val('');
      select.actions.search('');

      // Close the dropdown after focusing the field.
      input.focus();
      select.actions.close();
    } else {
      input.focus();
    }

    this.set('focusedElement', 'input');
    this.set('resetTimer', null);
  },

  queueReset() {
    if (this.get('resetTimer')) {
      run.cancel(this.get('resetTimer'));
    }

    this.set('resetTimer', run.next(this, this.resetInput));
  },

  closeAutocomplete() {
    if (!isEmpty(this.get('autocomplete')) && !isEmpty(this.get('autocomplete').actions)) {
      this.get('autocomplete').actions.close();
    }
  },

  getInput() {
    return this.$('.md-chip-input-container input');
  },

  focusMovingTo(selector, event) {
    if (!isEmpty(event) && !isEmpty(event.relatedTarget) && this.$().find(event.relatedTarget).is(selector)) {
      return true;
    }

    return false;
  }
});
