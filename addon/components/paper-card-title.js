/**
 * @module ember-paper
 */
import Component from '@ember/component';

import layout from '../templates/components/paper-card-title';

/**
 * @class PaperCardTitle
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'md-card-title'
});
