/**
 * @module ember-paper
 */
import Mixin from '@ember/object/mixin';

import { computed } from '@ember/object';
import { A } from '@ember/array';

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
