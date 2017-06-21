/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-card-actions';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperCardActions
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
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

PaperComponent[NAME_KEY] = 'paper-card-actions';

export default PaperComponent;
