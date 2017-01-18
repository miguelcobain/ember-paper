/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-sidenav-toggle';

const { Component, inject } = Ember;

/**
 * @class PaperSidenavToggle
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: '',

  name: 'default',

  paperSidenav: inject.service(),

  toggle() {
    this.get('paperSidenav').toggle(this.get('name'));
  }

});
