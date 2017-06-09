/**
 * @module ember-paper
 */
import Ember from 'ember';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperDialogContainer
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
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

PaperComponent[NAME_KEY] = 'paper-dialog-container';

export default PaperComponent;
