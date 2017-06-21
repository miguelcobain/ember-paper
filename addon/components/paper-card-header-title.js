/**
 * @module ember-paper
 */
import Ember from 'ember';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperCardHeaderTitle
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  tagName: 'span',
  classNames: ['md-title']
});

PaperComponent[NAME_KEY] = 'paper-card-header-title';

export default PaperComponent;
