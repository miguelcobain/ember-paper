/**
 * @module ember-paper
 */
import Component from '@ember/component';

import layout from '../templates/components/paper-card-actions';

/**
 * @class PaperCardActions
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'md-card-actions',
  classNameBindings: ['defaultClasses'],

  didReceiveAttrs() {
    this._super(...arguments);

    // if the consumer didn't set layout classes, we should set them
    // to the default (layout = row, layout align = end center)
    let providedClasses = this.get('class');

    if (!providedClasses || providedClasses.indexOf('layout-') === -1) {
      this.set('defaultClasses', 'layout-row layout-align-end-center');
    }
  }
});
