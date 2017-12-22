/**
 * @module ember-paper
 */
import Component from '@ember/component';

import layout from '../templates/components/paper-card-header-text';

/**
 * @class PaperCardheaderText
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'md-card-header-text'
});
