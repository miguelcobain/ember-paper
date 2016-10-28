import Ember from 'ember';
const { Component } = Ember;

export default Component.extend({
  classNames: ['paper-toast-bounds'],
  classNameBindings: [
    'openTop:md-toast-open-top',
    'openBottom:md-toast-open-bottom'
  ],

  actions: {
    toggleToast(type) {
      type = type[0].toUpperCase() + type.slice(1);;
      this.toggleProperty(`open${type}`);
    }
  }
});
