/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Component, String: { htmlSafe } } = Ember;

/**
 * @class PaperSidenavContainer
 * @extends Ember.Component
 */
export default Component.extend({
  classNames: ['flex', 'layout-row'],
  attributeBindings: ['style'],
  style: htmlSafe('overflow: hidden')
});
