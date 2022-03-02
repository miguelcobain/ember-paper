/* eslint-disable ember/no-classic-components, ember/require-tagless-components */
/**
 * @module ember-paper
 */
import Component from '@ember/component';

/**
 * @class PaperCardImage
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: 'img',
  classNames: ['md-card-image'],
  attributeBindings: ['src', 'title', 'alt']
});
