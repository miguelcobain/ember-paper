import Ember from 'ember';
import layout from '../templates/components/paper-nav-ink-bar';

const { computed, Component, String: { htmlSafe } } = Ember;

export default Component.extend({
  layout,

  tagName: 'md-ink-bar',

  attributeBindings: ['style'],
  classNameBindings: ['movingRight:md-right:md-left'],

  style: computed('left', 'right', function() {
    return htmlSafe(`left: ${this.get('left')}px; right: ${this.get('right')}px;`);
  })
});
