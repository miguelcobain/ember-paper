/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Component } = Ember;

/**
 * @class PaperContent
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: 'md-content',
  classNames: ['md-default-theme'],
  attributeBindings: ['layout-padding', 'scroll-y:md-scroll-y'],
  classNameBindings: ['padding:md-padding']
});
