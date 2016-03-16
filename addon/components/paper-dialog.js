import Ember from 'ember';
import PaperDialogParent from './paper-dialog-parent';
const { Component, $ } = Ember;

export default Component.extend({
  tagName: '',

  destination: Ember.computed('parent', function() {
    return this.get('parent') ? this.get('parent') : 'paper-wormhole';
  }),

  didInsertElement() {
    $(window).on('keyup', (e) => {
      if (27 === e.keyCode) {
        this.get('onClose')();
      }
    });
  },

  willDestroyElement() {
    $(window).off('keyup');
  },

  actions: {
    outsideClicked() {
      if (this.get('clickOutsideToClose') && this.get('onClose')) {
        return this.get('onClose')();
      }
    },

    dialogClicked(ev) {
      // ev.stopPropagation();
    }
  }
});
