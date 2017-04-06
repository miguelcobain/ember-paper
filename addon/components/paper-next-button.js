import Ember from 'ember';
import layout from '../templates/components/paper-next-button';

const { computed: { not }, Component } = Ember;

export default Component.extend({
  tagName: 'md-next-button',
  layout,

  classNameBindings: [
    'disabled:md-disabled'
  ],

  /* Inherited from `{{paper-tabs-wrapper}}` */
  disabled: not('parent.canPageForward'),

  click() {
    if (!this.get('disabled')) {
      this.get('parent').send('nextPage');
    }
  }
});
