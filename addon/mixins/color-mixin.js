/**
 * @module ember-paper
 */
import Mixin from '@ember/object/mixin';

/**
 * @class ColorMixin
 * @extends Ember.Mixin;
 */
export default Mixin.create({
  classNameBindings: ['warn:md-warn', 'accent:md-accent', 'primary:md-primary']
});
