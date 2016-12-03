import Ember from 'ember';
const { computed: { not }, Component } = Ember;

export default Component.extend({
  tagName: 'md-prev-button',

  classNameBindings: [
    'disabled:md-disabled'
  ],

  /* Inherited from `{{paper-tabs-wrapper}}` */
  disabled: not('parent.canPageBack'),

  click() {
    if (!this.get('disabled')) {
      this.get('parent').send('previousPage');
    }
  }
});
