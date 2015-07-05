import Ember from 'ember';

export default Ember.Mixin.create({
  proxiedComponents: Ember.computed(function() {
    return Ember.A();
  }),
  register(component) {
    if (!component.get('skipProxy')) {
      this.get('proxiedComponents').addObject(component);
    }
  },
  unregister(component) {
    this.get('proxiedComponents').removeObject(component);
  },
  isProxiedComponent(component) {
    return this.get('proxiedComponents').contains(component);
  }
});
