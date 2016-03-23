import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'md-next-button',

  classNameBindings: ['canPageForward:ok:md-disabled'],

  /* Inherited from `{{paper-tabs-wrapper}}` */
  canPageForward: computed.reads('parent.canPageForward'),

  click: function() {
    this.get('parent').send('nextPage');
  }
});
