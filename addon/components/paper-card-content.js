/**
 * @module ember-paper
 */
import Ember from 'ember';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperCardContent
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  tagName: 'md-card-content'
});

PaperComponent[NAME_KEY] = 'paper-card-content';

export default PaperComponent;
