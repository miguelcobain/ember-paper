import Ember from 'ember';

export default Ember.Mixin.create({
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
