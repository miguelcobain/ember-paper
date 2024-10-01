/* eslint-disable ember/no-classic-components */
/**
 * @module ember-paper
 */
import { inject as service } from '@ember/service';

import Component from '@ember/component';

/**
 * @class PaperSidenavToggle
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: '',
  name: 'default',
  paperSidenav: service(),

  toggle() {
    this.paperSidenav.toggle(this.name);
  },
});
