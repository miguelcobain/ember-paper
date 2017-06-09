/**
 * @module ember-paper
 */
import Ember from 'ember';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperDialogActions
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  tagName: 'md-dialog-actions'
});

PaperComponent[NAME_KEY] = 'paper-dialog-actions';

export default PaperComponent;
