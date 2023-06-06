/**
 * @module ember-paper
 */
import Mixin from '@ember/object/mixin';

import { next, later } from '@ember/runloop';
import { ChildMixin } from 'ember-composability-tools';

/**
 * @class ProxiableMixin
 * @uses ChildMixin
 * @extends Ember.Mixin
 */
export default Mixin.create(ChildMixin, {

  classNameBindings: ['secondary:md-secondary'],

  shouldRegister: false,

  registerWithParent() {
    next(this, this._super);
  },

  mouseDown() {
    this._super(...arguments);
    let parentComponent = this.parentComponent;
    if (parentComponent) {
      parentComponent.set('mouseActive', true);
      later(() => {
        if (parentComponent.isDestroyed) {
          return;
        }
        parentComponent.set('mouseActive', false);
      }, 100);
    }
  },

  focusIn() {
    this._super(...arguments);
    let parentComponent = this.parentComponent;
    if (parentComponent && !parentComponent.get('mouseActive')) {
      parentComponent.set('focused', true);
    }
  },

  focusOut() {
    this._super(...arguments);
    let parentComponent = this.parentComponent;
    if (parentComponent) {
      parentComponent.set('focused', false);
    }
  }
});
