import Ember from 'ember';
const { computed, Component } = Ember;

export default Component.extend({
  tagName: 'md-prev-button',

  classNameBindings: ['canPageBack::md-disabled'],

  /* Inherited from `{{paper-tabs-wrapper}}` */
  canPageBack: computed.reads('parent.canPageBack'),

  click() {
    this.get('parent').send('previousPage');
  }
});
