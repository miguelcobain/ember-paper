import Ember from 'ember';
import PaperMenuAbstract from './paper-menu-abstract';

const { Component } = Ember;

export default Component.extend({
  tagName: 'md-menu-item',

  actions: {
    handleClick(event) {
      this.nearestOfType(PaperMenuAbstract).send('toggleMenu');
      this.sendAction('onClick', event);
    }
  }

});
