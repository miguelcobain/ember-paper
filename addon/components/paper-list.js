/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Component } = Ember;

/**
 * @class PaperList
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: 'md-list',
  classNames: ['paper-list', 'md-default-theme']
});
