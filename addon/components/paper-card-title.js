/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-card-title';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperCardTitle
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  layout,
  tagName: 'md-card-title'
});

PaperComponent[NAME_KEY] = 'paper-card-title';

export default PaperComponent;
