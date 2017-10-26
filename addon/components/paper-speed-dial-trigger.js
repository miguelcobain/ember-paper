import Ember from 'ember';
const { Component } = Ember;

export default Component.extend({
  tagName: 'md-fab-trigger',

  click() {
    this.get('speedDial').toggle();
  },

  focusOut() {
    this.get('speedDial').close();
  }
});
