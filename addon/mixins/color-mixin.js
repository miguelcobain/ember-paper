/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Mixin, NAME_KEY } = Ember;

/**
 * @class ColorMixin
 * @extends Ember.Mixin;
 */
const PaperMixin = Mixin.create({
  classNameBindings: ['warn:md-warn', 'accent:md-accent', 'primary:md-primary']
});

PaperMixin[NAME_KEY] = 'paper-color-mixin';

export default PaperMixin;
