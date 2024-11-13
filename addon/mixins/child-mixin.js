/* eslint-disable ember/no-mixins, ember/require-computed-property-dependencies, prettier/prettier */
/**
 * @module ember-paper
 */
import Mixin from '@ember/object/mixin';

import { computed } from '@ember/object';
import ParentMixin from 'ember-paper/mixins/parent-mixin';

/**
 * @class ChildMixin
 * @extends Ember.Mixin
 */
export default Mixin.create({
  // override to look for a specific parent class
  parentClass: ParentMixin,

  // this will typically be overriden when yielding a contextual component
  parentComponent: computed({
    get() {
      if (this._parentComponent !== undefined) {
        return this._parentComponent;
      }

      return this.nearestOfType(this.parentClass);
    },

    set(key, value) {
      return (this._parentComponent = value);
    },
  }),

  init() {
    this._super(...arguments);
    if (this.parentComponent) {
      let register = this.parentComponent.register
        ? this.parentComponent.register
        : this.parentComponent.registerChild;
      register(this);
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.parentComponent) {
      let unregister = this.parentComponent.register
        ? this.parentComponent.unregister
        : this.parentComponent.unregisterChild;
      unregister(this);
    }
  },
});
