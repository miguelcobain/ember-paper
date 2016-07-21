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

  click() {
    this.sendAction('outsideClicked');
  }
});
