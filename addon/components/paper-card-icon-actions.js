/**
 * @module ember-paper
 */
import Ember from 'ember';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperCardIconActions
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  tagName: 'md-card-icon-actions'
});

PaperComponent[NAME_KEY] = 'paper-card-icon-actions';

export default PaperComponent;
