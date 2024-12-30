/* eslint-disable ember/no-classic-components */
/**
 * @module ember-paper
 */
import Component from '@ember/component';

/**
 * @class PaperCardActions
 * @extends Ember.Component
 */
export default class PaperCardActions extends Component {
  tagName = '';

  get classes() {
    // if the consumer didn't set layout classes, we should set them
    // to the default (layout = row, layout align = end center)
    let providedClasses = this['class'];

    if (!providedClasses || providedClasses.indexOf('layout-') === -1) {
      return `layout-row layout-align-end-center ${providedClasses}`.trimEnd();
    }

    return providedClasses;
  }
}
