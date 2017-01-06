/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-card-title-text';

const { Component } = Ember;

/**
 * @class PaperCardTitleText
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'md-card-title-text'
});
