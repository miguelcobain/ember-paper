import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'md-prev-button',

  classNameBindings: ['canPageBack::md-disabled'],

  /* Inherited from `{{paper-tabs-wrapper}}` */
  canPageBack: computed.reads('parent.canPageBack'),

  click: function() {
    this.get('parent').send('previousPage');
  }
});
