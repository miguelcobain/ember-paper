import Ember from 'ember';
import ChildMixin from 'ember-paper/mixins/child-mixin';

const { Component } = Ember;

export default Component.extend(ChildMixin, {
  tagName: 'md-menu-item',
  disabled: false,

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
