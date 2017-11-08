/**
 * @module ember-paper
 */
import Ember from 'ember';
import { ChildMixin } from 'ember-composability-tools';

const { Mixin, run } = Ember;

/**
 * @class ProxiableMixin
 * @uses ChildMixin
 * @extends Ember.Mixin
 */
export default Mixin.create(ChildMixin, {

  classNameBindings: ['secondary:md-secondary'],

  shouldRegister: false,

  registerWithParent() {
    run.next(this, this._super);
  },

  mouseDown() {
    this._super(...arguments);
    let parentComponent = this.get('parentComponent');
    if (parentComponent) {
      parentComponent.set('mouseActive', true);
      run.later(() => {
        if (parentComponent.isDestroyed) {
          return;
        }
        parentComponent.set('mouseActive', false);
      }, 100);
    }
  },

  focusIn() {
    this._super(...arguments);
    let parentComponent = this.get('parentComponent');
    if (parentComponent && !parentComponent.get('mouseActive')) {
      parentComponent.set('focused', true);
    }
  },

  focusOut() {
    this._super(...arguments);
    let parentComponent = this.get('parentComponent');
    if (parentComponent) {
      parentComponent.set('focused', false);
    }
  }
});
