/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-optgroup';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperOptgroup
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  layout,
  tagName: 'md-optgroup',
  attributeBindings: ['label']
});

PaperComponent[NAME_KEY] = 'paper-optgroup';

export default PaperComponent;
