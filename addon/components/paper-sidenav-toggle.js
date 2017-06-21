/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-sidenav-toggle';

const { NAME_KEY, Component, inject } = Ember;

/**
 * @class PaperSidenavToggle
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  layout,
  tagName: '',

  name: 'default',

  paperSidenav: inject.service(),

  toggle() {
    this.get('paperSidenav').toggle(this.get('name'));
  }

});

PaperComponent[NAME_KEY] = 'paper-sidenav-toggle';

export default PaperComponent;
