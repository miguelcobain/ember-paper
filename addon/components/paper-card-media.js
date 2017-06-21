/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-card-media';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperCardMedia
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  layout,
  tagName: '',
  size: 'md'
});

PaperComponent[NAME_KEY] = 'paper-card-media';

export default PaperComponent;
