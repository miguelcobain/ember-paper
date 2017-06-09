/**
 * @module ember-paper
 */
import Ember from 'ember';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperCardAvatar
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  tagName: 'md-card-avatar'
});

PaperComponent[NAME_KEY] = 'paper-card-avatar';

export default PaperComponent;
