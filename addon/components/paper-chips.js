import Ember from 'ember';

const { get, Component, isEmpty, isPresent } = Ember;

export default Component.extend({
  tagName: 'md-chips',
  classNames: ['md-default-theme'],
  activeChip: -1,

  resetActiveChip: Ember.observer('isFocused', function() {
    if (!this.get('isFocused')) {
      this.set('activeChip', -1);
    }
  }),

  actions: {
    addItem(newItem) {
      if (get(newItem, 'length')) {
        this.sendAction('addItem', newItem);
        this.set('newChipValue', '');
      }
    },

    inputFocus() {
      const input = this.$('.md-chip-input-container input');
      this.set('isFocused', true);

      if (!this.get('content').length && !input.is(':focus')) {
        input.focus();
      } else {
        this.set('activeChip', -1);
      }
    },

    inputBlur() {
      this.set('isFocused', false);
    },

    keyDown(event) {
      if (!this.get('readOnly') && isEmpty(this.get('newChipValue')) && isPresent(this.get('content'))) {
        // No text has been entered, but we have chips; cursor keys should select chips.
        const key = event.key,
          current = this.get('activeChip'),
          chips = this.get('content'),
          input = this.$('.md-chip-input-container input');

        if (key === 'ArrowLeft' || (key === 'Backspace' && current === -1)) {
          if (current === -1) {
            this.$('md-chips-wrap', this.element).focus();
            this.set('activeChip', chips.length-1);
          } else if (current > 0) {
            this.decrementProperty('activeChip');
          }
        } else if (key === 'ArrowRight') {
          if (current >= 0) {
            this.incrementProperty('activeChip');
          }

          if (this.get('activeChip') >= chips.length) {
            this.set('activeChip', -1);
            input.focus();
          }
        } else if (current >= 0 && (key === 'Delete' || key === 'Backspace')) {
          this.sendAction('removeItem', chips[current]);
          if (current >= chips.length) {
            input.focus();
            this.set('activeChip', -1);
          }
        }
      } else {
        // Make sure we don't leave a chip focused while typing.
        this.set('activeChip', -1);
      }
    }
  }
});
