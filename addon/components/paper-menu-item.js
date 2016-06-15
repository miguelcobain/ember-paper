import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'md-menu-item',

  actions: {
    handleClick(event) {
      this.sendAction('onClick', event);
    }
  },
  mouseEnter() {
    if (!this.get('disabled')) {
      this.$('button').focus();
    }
  }

});
