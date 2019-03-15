/**
 * @module ember-paper
 */
import Component from '@ember/component';

import layout from 'ember-paper/templates/components/paper-optgroup/template';

/**
 * @class PaperOptgroup
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'md-optgroup',
  attributeBindings: ['label']
});
