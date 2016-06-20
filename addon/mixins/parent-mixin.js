import Ember from 'ember';
const { Mixin, computed, A } = Ember;

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
