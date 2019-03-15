/**
 * @module ember-paper
 */
import Component from '@ember/component';

import layout from 'ember-paper/templates/components/paper-card/header/text/template';

/**
 * @class PaperCardheaderText
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'md-card-header-text'
});
