import Ember from 'ember';

const { computed, Component, String: { htmlSafe } } = Ember;

export default Component.extend({
  tagName: 'md-ink-bar',

  attributeBindings: ['style'],
  classNameBindings: ['movingRight:md-right:md-left'],

  style: computed('left', 'right', function() {
    return htmlSafe(`left: ${this.get('left')}px; right: ${this.get('right')}px;`);
  })
});
