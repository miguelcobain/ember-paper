/**
 * @module ember-paper
 */
import Ember from 'ember';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperToolbarTools
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  classNames: ['md-toolbar-tools']
});

PaperComponent[NAME_KEY] = 'paper-toolbar-tools';

export default PaperComponent;
