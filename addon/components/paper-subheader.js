/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-subheader';

const { Component } = Ember;

/**
 * @class PaperSubheader
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'h2',
  classNames: ['md-subheader']
});
