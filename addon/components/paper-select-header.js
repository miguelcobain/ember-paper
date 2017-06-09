/**
 * @module ember-paper
 */
import Ember from 'ember';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperSelectHeader
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  tagName: 'md-select-header'
});

PaperComponent[NAME_KEY] = 'paper-select-header';

export default PaperComponent;
