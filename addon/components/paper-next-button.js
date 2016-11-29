import Ember from 'ember';
const { computed, Component } = Ember;

export default Component.extend({
  tagName: 'md-next-button',

  classNameBindings: ['canPageForward:ok:md-disabled'],

  /* Inherited from `{{paper-tabs-wrapper}}` */
  canPageForward: computed.reads('parent.canPageForward'),

  click() {
    this.get('parent').send('nextPage');
  }
});
