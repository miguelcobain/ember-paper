/**
 * @module ember-paper
 */
import Ember from 'ember';
import ChildMixin from 'ember-paper/mixins/child-mixin';

const { Component } = Ember;

/**
 * @class PaperMenuItem
 * @extends Ember.Component
 * @uses ChildMixin
 */
export default Component.extend(ChildMixin, {
  tagName: 'md-menu-item',
  disabled: false,

  actions: {
    handleClick(event) {
      this.get('dropdown.actions').close();
      this.sendAction('onClick', event);
    }
  },
  mouseEnter() {
    if (!this.get('disabled')) {
      this.$('button').focus();
    }
  }

});
