/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Component, isEqual } = Ember;

export default Component.extend({
  classNames: 'md-fab-action-item',

  icon: 'menu',

  // bubble actions by default
  bubbles: true,

  click() {
    if (!isEqual(this.get('disabled'), true)) {
      let target = this.get('target');

      if (target) {
        this.get('target').send(this.get('action'), this.get('param'));
      } else {
        this.sendAction('action', this.get('param'));
      }

      return this.get('bubbles');
    }
  }
});
