/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Component, inject } = Ember;

/**
 * @class PaperSidenavToggle
 * @extends Ember.Component
 */
export default Component.extend({

  tagName: '',

  name: 'default',

  paperSidenav: inject.service(),

  toggle() {
    this.get('paperSidenav').toggle(this.get('name'));
  }

});
