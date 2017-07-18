import Ember from 'ember';
import layout from '../templates/components/paper-nav-ink-bar';

const { computed, Component, String: { htmlSafe } } = Ember;

export default Component.extend({
  layout,

  tagName: 'md-nav-ink-bar',

  attributeBindings: ['style'],

  style: computed('left', 'width', function() {
    return htmlSafe(`left: ${this.get('left')}px; width: ${this.get('width')}px;`);
  })
});
