/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-subheader';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperSubheader
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  layout,
  tagName: 'h2',
  classNames: ['md-subheader']
});

PaperComponent[NAME_KEY] = 'paper-subheader';

export default PaperComponent;
