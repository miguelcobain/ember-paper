/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-card-title-text';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperCardTitleText
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  layout,
  tagName: 'md-card-title-text'
});

PaperComponent[NAME_KEY] = 'paper-card-title-text';

export default PaperComponent;
