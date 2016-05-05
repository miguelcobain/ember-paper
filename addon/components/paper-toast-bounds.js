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
      this.toggleProperty(`open${type.capitalize()}`);
    }
  }
});
