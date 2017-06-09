/**
 * @module ember-paper
 */
import Ember from 'ember';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperCardHeaderSubhead
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  tagName: 'span',
  classNames: ['md-subhead']
});

PaperComponent[NAME_KEY] = 'paper-card-header-subhead';

export default PaperComponent;
