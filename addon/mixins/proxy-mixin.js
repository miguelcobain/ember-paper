/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Mixin, computed, A } = Ember;

/**
 * @class ProxyMixin
 * @extends Ember.Mixin
 */
export default Mixin.create({
  proxiedComponents: computed(function() {
    return A();
  }),
  register(component) {
    if (!component.get('skipProxy')) {
      this.get('proxiedComponents').addObject(component);
      this.setupProxiedComponent();
    }
  }
});
