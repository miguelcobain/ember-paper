import Ember from 'ember';
const { Component, computed, $, inject: { service } } = Ember;

export default Component.extend({
  tagName: '',

  escapeToClose: true,
  focusOnOpen: true,

  destination: computed('parent', function() {
    return this.get('parent') ? this.get('parent') : 'paper-wormhole';
  }),

  defaultParent: 'body',

  hashedParent: computed('destination', function() {
    let parent = this.get('destination');
    return parent ? `#${parent}` : null;
  }),

  parentElementSelector: computed.or('hashedParent', 'defaultParent'),

  constants: service(),

  didInsertElement() {
    if (this.get('escapeToClose')) {
      let parent = this.get('parentElementSelector');
      $(parent).on(`keydown.${this.elementId}`, (e) => {
        if (e.keyCode === this.get('constants.KEYCODE.ESCAPE') && this.get('onClose')) {
          this.get('onClose')();
        }
      });
    }
  },

  willDestroyElement() {
    if (this.get('escapeToClose')) {
      let parent = this.get('parentElementSelector');
      $(parent).off(`keydown.${this.elementId}`);
    }
  },

  actions: {
    outsideClicked() {
      if (this.get('clickOutsideToClose') && this.get('onClose')) {
        this.get('onClose')();
      }
    }
  }
});
