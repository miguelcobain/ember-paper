/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Mixin } = Ember;

/**
 * Adds bindings to flex attributes
 * - flex=true|false
 * - flex-layout=column|row
 *
 * @class FlexMixin
 * @extends Ember.Mixin
 */
export default Mixin.create({
  attributeBindings: [
    'flex',
    'flex-layout:layout',
    // Allow responsive layout definition ( see layout.scss: layout-for-name ):
    'layout-sm',
    'layout-gt-sm',
    'layout-md',
    'layout-gt-md',
    'layout-lg',
    'layout-gt-lg'
  ]
});
