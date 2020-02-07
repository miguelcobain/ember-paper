import Component from '@ember/component';
import template from './template';

import { action } from '@ember/object';
import { isPresent, isEmpty } from '@ember/utils';

import { tagName, layout } from '@ember-decorators/component';

@tagName('')
@layout(template)
class PaperChips extends Component {

  activeChip = -1;
  searchText = '';
  isFocused = false;

  @action
  handleFocusIn() {
    this.set('isFocused', true);
  }

  @action
  handleFocusOut() {
    this.set('isFocused', false);
    this.set('activeChip', -1);
  }

  @action
  handleClick(ev) {
    ev.currentTarget.querySelector('.md-chip-input-container input').focus();
  }

  @action
  handleKeydown(ev) {
    let input = ev.currentTarget.querySelector('.md-chip-input-container input');

    if (!this.readOnly && isEmpty(input.value) && this.content.length) {
      this.keyboardNavigation(ev, input);
    }
  }

  keyboardNavigation(ev, input) {
    // No text has been entered, but we have chips; cursor keys should select chips.
    let current = this.activeChip;
    let chips = this.content;
    let key = ev.key;

    if (['ArrowLeft', 'Left'].includes(key) || (key === 'Backspace' && current === -1)) {
      if (current === -1) {
        input.blur();
        ev.currentTarget.focus();
        this.set('activeChip', chips.length - 1);
      } else if (current > 0) {
        this.set('activeChip', this.activeChip - 1)
      }
    } else if (['ArrowRight', 'Right'].includes(key)) {
      if (current >= 0) {
        this.set('activeChip', this.activeChip + 1)
      }

      if (this.get('activeChip') >= chips.length) {
        this.set('activeChip', -1);
        input.focus();
      }
    } else if (current >= 0 && ['Backspace', 'Delete', 'Del'].includes(key)) {
      this.removeItem(chips[current]);

      this.set('activeChip', Math.min(chips.length - 1, this.activeChip));
    }
  }

  @action
  handleAutocompleteChange(item, select) {
    if (item && select.isOpen) {
      // Trigger onChange for the new item.
      if (this.addItem) {
        this.addItem(item);
      }

      select.actions.search('');
      this.set('searchText', '');
    }
  }

  @action
  handleSearchTextChange(value, select) {
    this.set('searchText', value);

    // Close dropdown if search text is cleared by the user.
    if (isEmpty(value)) {
      select.actions.close();
    }
  }

  @action
  handleAutocompleteOpen(select, e) {
    if (e && e.type === 'focus') {
      return false;
    }
  }

  @action
  handleAddItem(newItem, select) {
    if (this.requireMatch) {
      // Don't add a new item - we're set to require a match.
      return;
    }

    if (isPresent(newItem)) {
      let item = newItem;

      if (isPresent(this.searchField)) {
        item = {};
        item[this.searchField] = newItem;
      }

      if (this.addItem) {
        this.addItem(item);
      }

      if (select) {
        select.actions.search('');
      }
      this.set('searchText', '');
    }
  }

  @action
  handleRemoveItem(item) {
    if (this.removeItem) {
      this.removeItem(item)
    }

    let current = this.activeChip;

    if (current === -1 || current >= this.content.length) {
      this.set('activeChip', -1);
    }
  }

  @action
  handleInputKeydown(ev) {
    if (ev.key === 'Enter') {
      this.handleAddItem(ev.target.value);
      ev.target.value = '';
    }
  }

  @action
  handleChipClick(index, ev) {
    ev.stopPropagation();

    if (!this.readOnly) {
      this.set('activeChip', index);
    }
  }
}

export default PaperChips;
