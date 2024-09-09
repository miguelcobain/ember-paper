/* eslint-disable ember/no-classic-components, ember/require-tagless-components */
/**
 * @module ember-paper
 */
import Component from '@ember/component';

import { htmlSafe } from '@ember/template';

/**
 * @class PaperSidenavContainer
 * @extends Ember.Component
 */
export default Component.extend({
  classNames: ['flex', 'layout-row'],
  attributeBindings: ['style'],
  style: htmlSafe('overflow: hidden')
});
