/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Component } = Ember;

/**
 * @class PaperSidenavContainer
 * @extends Ember.Component
 */
export default Component.extend({
  classNames: ['flex', 'layout-row'],
  attributeBindings: ['style'],
  style: Ember.String.htmlSafe('overflow: hidden')
});
