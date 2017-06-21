/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Mixin, NAME_KEY, computed, A } = Ember;

/**
 * @class ParentMixin
 * @extends Ember.Mixin
 */
const PaperMixin = Mixin.create({
  childComponents: computed(function() {
    return A();
  }),

  register(child) {
    this.get('childComponents').pushObject(child);
  },

  unregister(child) {
    this.get('childComponents').removeObject(child);
  }
});

PaperMixin[NAME_KEY] = 'paper-parent-mixin';

export default PaperMixin;
