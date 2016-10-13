/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'md-fab-trigger',

  mouseEnter() {
    this.sendAction('mouse-enter');
  }
});
