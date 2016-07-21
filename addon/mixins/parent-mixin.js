/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Mixin, computed, A } = Ember;

/**
 * @class ParentMixin
 * @extends Ember.Mixin
 */
export default Mixin.create({
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
