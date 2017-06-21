/**
 * @module ember-paper
 */
import Ember from 'ember';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperCardHeaderHeadline
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  tagName: 'span',
  classNames: ['md-headline']
});

PaperComponent[NAME_KEY] = 'paper-card-header-headline';

export default PaperComponent;
