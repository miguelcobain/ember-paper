import Ember from 'ember';
import PaperDialogParent from './paper-dialog-parent';
const { Component } = Ember;

export default Component.extend({
  tagName: '',

  actions: {
    outsideClicked() {
      this.get('onClose')();
    },

    dialogClicked(ev) {
      ev.stopPropagation();
    }
  }
});
