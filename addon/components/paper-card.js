/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-card';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperCard
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  layout,
  tagName: 'md-card'
});

PaperComponent[NAME_KEY] = 'paper-card';

export default PaperComponent;
