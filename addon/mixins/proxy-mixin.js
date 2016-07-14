/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Mixin } = Ember;

/**
 * @class ProxyMixin
 * @extends Ember.Mixin
 */
export default Mixin.create({
  proxiedComponents: Ember.computed(function() {
    return Ember.A();
  }),
  register(component) {
    if (!component.get('skipProxy')) {
      this.get('proxiedComponents').addObject(component);
      this.setupProxiedComponent();
    }
  }
});
