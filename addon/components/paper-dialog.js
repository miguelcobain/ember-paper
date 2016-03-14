import Ember from 'ember';
import PaperDialogParent from './paper-dialog-parent';
const { Component } = Ember;

export default Component.extend({
  tagName: '',

  parent: null,
  fixed: Ember.computed.empty('parent'),

  destination: Ember.computed('parent', function() {
    return (this.get('parent')) ? this.get('parent') : 'paper-wormhole';
  }),

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
