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

  didInsertElement() {
    let component = this;
    Ember.$(window).on('keyup', function(e) {
      if (27 === e.keyCode) {
        component.sendAction('onClose');
      }
    });
  },

  willDestroyElement() {
    Ember.$(window).off('keyup');
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
