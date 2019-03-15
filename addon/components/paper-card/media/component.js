/**
 * @module ember-paper
 */
import Component from '@ember/component';

import layout from './template';

/**
 * @class PaperCardMedia
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: '',
  size: 'md'
});
