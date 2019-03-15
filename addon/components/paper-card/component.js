/**
 * @module ember-paper
 */
import Component from '@ember/component';

import layout from 'ember-paper/templates/components/paper-card/template';

/**
 * @class PaperCard
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'md-card'
});
