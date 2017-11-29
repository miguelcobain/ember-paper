/**
 * @module ember-paper
 */
import Ember from 'ember';
const { Component } = Ember;

/**
 * @class PaperDialogComponent
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: 'md-dialog-content',
  classNames: ['md-dialog-content']
});
