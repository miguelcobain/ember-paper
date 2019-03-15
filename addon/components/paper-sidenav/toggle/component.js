/**
 * @module ember-paper
 */
import { inject as service } from '@ember/service';

import Component from '@ember/component';
import layout from 'ember-paper/templates/components/paper-sidenav/toggle/template';

/**
 * @class PaperSidenavToggle
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: '',

  name: 'default',

  paperSidenav: service(),

  toggle() {
    this.get('paperSidenav').toggle(this.get('name'));
  }

});
