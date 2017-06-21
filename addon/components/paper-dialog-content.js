/**
 * @module ember-paper
 */
import Ember from 'ember';
const { NAME_KEY, Component } = Ember;

/**
 * @class PaperDialogComponent
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  tagName: 'md-dialog-content',
  classNames: ['md-dialog-content']
});

PaperComponent[NAME_KEY] = 'paper-dialog-content';

export default PaperComponent;
