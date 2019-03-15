/**
 * @module ember-paper
 */
import Component from '@ember/component';

import layout from 'ember-paper/templates/components/paper-card/media/template';

/**
 * @class PaperCardMedia
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: '',
  size: 'md'
});
