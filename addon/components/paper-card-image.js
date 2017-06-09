/**
 * @module ember-paper
 */
import Ember from 'ember';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperCardImage
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  tagName: 'img',
  classNames: ['md-card-image'],
  attributeBindings: ['src', 'title', 'alt']
});

PaperComponent[NAME_KEY] = 'paper-card-image';

export default PaperComponent;
