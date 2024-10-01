/* eslint-disable ember/no-classic-components, ember/no-component-lifecycle-hooks, ember/require-tagless-components */
/**
 * @module ember-paper
 */
import Component from '@ember/component';

/**
 * @class PaperCardActions
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: 'md-card-actions',
  classNameBindings: ['defaultClasses'],

  didReceiveAttrs() {
    this._super(...arguments);

    // if the consumer didn't set layout classes, we should set them
    // to the default (layout = row, layout align = end center)
    let providedClasses = this['class'];

    if (!providedClasses || providedClasses.indexOf('layout-') === -1) {
      this.set('defaultClasses', 'layout-row layout-align-end-center');
    }
  },
});
