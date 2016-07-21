/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Component } = Ember;

/**
 * @class PaperSubheader
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: 'h2',
  classNames: ['md-subheader']
});
