/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Component } = Ember;

/**
 * @class PaperDialogContainer
 * @extends Ember.Component
 */
export default Component.extend({
  classNames: ['md-dialog-container'],

  mouseDown(ev) {
    this._sourceEl = ev.target;
  },

  mouseUp(ev) {
    if (this._sourceEl === this.element && ev.target === this.element) {
      ev.stopPropagation();
      ev.preventDefault();
      this.sendAction('outsideClicked');
    }
  }
});
