/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-card-header-text';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperCardheaderText
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  layout,
  tagName: 'md-card-header-text'
});

PaperComponent[NAME_KEY] = 'paper-card-header-text';

export default PaperComponent;
