/**
 * @module ember-paper
 */
import Component from '@ember/component';

/**
 * @class PaperContent
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: 'md-content',
  classNames: ['md-default-theme'],
  attributeBindings: ['layout-padding', 'scroll-y:md-scroll-y'],
  classNameBindings: ['padding:md-padding']
});
