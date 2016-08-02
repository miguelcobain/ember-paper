/**
 * @module ember-paper
 */
import Ember from 'ember';
import ParentMixin from 'ember-paper/mixins/parent-mixin';

const { Mixin, computed } = Ember;

/**
 * @class ChildMixin
 * @extends Ember.Mixin
 */
export default Mixin.create({

  // override to look for a specific parent class
  parentClass: ParentMixin,

  // this will typically be overriden when yielding a contextual component
  parentComponent: computed(function() {
    return this.nearestOfType(this.get('parentClass'));
  }),

  init() {
    this._super(...arguments);
    if (this.get('parentComponent')) {
      this.get('parentComponent').register(this);
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.get('parentComponent')) {
      this.get('parentComponent').unregister(this);
    }
  }
});
