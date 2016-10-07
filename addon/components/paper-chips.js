import Ember from 'ember';

const { get, Component } = Ember;

export default Component.extend({
  tagName: 'md-chips',
  classNames: ['md-default-theme'],

  actions: {
    addItem(newItem) {
      if (get(newItem, 'length')) {
        this.sendAction('addItem', newItem);
        this.set('newChipValue', '');
      }
    },

    inputFocus() {
      this.set('isFocused', true);
    },

    inputBlur() {
      this.set('isFocused', false);
    }
  }
});
