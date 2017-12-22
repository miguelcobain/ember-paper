/**
 * @module ember-paper
 */
import Component from '@ember/component';

import { htmlSafe } from '@ember/string';

/**
 * @class PaperSidenavContainer
 * @extends Ember.Component
 */
export default Component.extend({
  classNames: ['flex', 'layout-row'],
  attributeBindings: ['style'],
  style: htmlSafe('overflow: hidden')
});
