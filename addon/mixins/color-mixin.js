/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Mixin } = Ember;

/**
 * @class ColorMixin
 * @extends Ember.Mixin;
 */
export default Mixin.create({
  classNameBindings: ['warn:md-warn', 'accent:md-accent', 'primary:md-primary']
});
