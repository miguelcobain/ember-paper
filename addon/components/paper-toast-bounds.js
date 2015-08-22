import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['paper-toast-bounds'],
  classNameBindings: ['open-top:md-toast-open-top', 'open-bottom:md-toast-open-bottom'],

  actions: {
    toggleToast(type) {
      this.toggleProperty(`open-${type}`);
    }
  }
});
