import Ember from 'ember';

let { Component } = Ember;

export default Component.extend({
  tagName: 'md-contact-chips',
  classNames: ['md-default-theme'],

  actions: {
    inputFocus() {
      this.set('isFocused', true);
    },

    inputBlur() {
      this.set('isFocused', false);
    }
  }
});
