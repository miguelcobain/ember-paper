/**
 * @module ember-paper
 */
import Ember from 'ember';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperContent
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  tagName: 'md-content',
  classNames: ['md-default-theme'],
  attributeBindings: ['layout-padding', 'scroll-y:md-scroll-y'],
  classNameBindings: ['padding:md-padding']
});

PaperComponent[NAME_KEY] = 'paper-content';

export default PaperComponent;
