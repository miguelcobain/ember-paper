/**
 * @module ember-paper
 */
import Ember from 'ember';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperList
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  tagName: 'md-list',
  classNames: ['md-default-theme']
});

PaperComponent[NAME_KEY] = 'paper-list';

export default PaperComponent;
