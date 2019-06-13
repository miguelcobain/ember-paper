import Component from '@ember/component';
import { isPresent, isEmpty } from '@ember/utils';
import { observer, computed } from '@ember/object';
import layout from '../templates/components/paper-chips';
import { invokeAction } from 'ember-invoke-action';

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
  lastItemChosen: false,

  // eslint-disable-next-line ember/no-observers
  handleFocusChange: observer('focusedElement', 'activeChip', function() {
    let element = this.get('focusedElement');

    if (!this.get('isFocused')) {
      this.set('activeChip', -1);
    }

    if ((element === 'chips' && (this.get('activeChip') !== -1)) || element === 'input') {
      invokeAction(this, 'focusIn', window.event);
    } else {
      invokeAction(this, 'focusOut', window.event);
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

        invokeAction(this, 'addItem', item);
        this.set('newChipValue', '');
        this.set('searchText', '');
      }
    },

    removeItem(item) {
      invokeAction(this, 'removeItem', item);
      let current = this.get('activeChip');

      if (current === -1 || current >= this.get('content').length) {
        this.set('activeChip', -1);
      }
    },

    inputFocus(autocomplete) {
      let input = this.getInput();

      this.set('focusedElement', 'input');

      if (!this.get('content').length && input !== document.activeElement) {
        input.focus();
      } else {
        this.set('activeChip', -1);
      }

      // Keep track of the autocomplete, so we can force it to close when navigating to chips.

      if (isEmpty(this.get('autocomplete')) && input.classList.contains('ember-paper-autocomplete-search-input')) {
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
      if (!this.focusMovingTo('.md-chip-input-container input', event)) {
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
        this.element.querySelector('md-chips-wrap').focus();

        // Update state to reflect the clicked chip being active.
        this.set('focusedElement', 'chips');
        this.set('activeChip', index);
      }
    },

    autocompleteChange(item) {
      if (item) {
        // Trigger onChange for the new item.
        invokeAction(this, 'addItem', item);
        this.set('searchText', '');

        // Track selection of last item if no match required.
        if (this.get('options').length === 1 && !this.get('requireMatch')) {
          this.set('lastItemChosen', true);
          this.set('autocomplete', null);
        }
      }
    },

    searchTextChange(value, select) {
      this.set('searchText', value);

      // Close dropdown if search text is cleared by the user.
      if (isEmpty(value)) {
        select.actions.close();
      }
    },

    keyDown(event) {
      let input = this.getInput();
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
        invokeAction(this, 'keyDown', event);
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
        this.element.querySelector('md-chips-wrap').focus();
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
      invokeAction(this, 'removeItem', chips[current]);
      if (current >= chips.length) {
        this.set('activeChip', -1);
      }
    }
  },

  closeAutocomplete() {
    if (!isEmpty(this.get('autocomplete')) && !isEmpty(this.get('autocomplete').actions)) {
      this.get('autocomplete').actions.close();
    }
  },

  getInput() {
    return this.element.querySelector('.md-chip-input-container input');
  },

  focusMovingTo(selector, event) {

    // for some reason, this.element seems to be null on latest ember versions
    if (!this.element) {
      return;
    }
    let el = this.element.querySelector(selector);
    if (!isEmpty(event) && !isEmpty(event.relatedTarget) && event.relatedTarget === el) {
      return true;
    }

    return false;
  }
});
