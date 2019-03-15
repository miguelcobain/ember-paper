import { computed } from '@ember/object';
import Component from '@ember/component';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  tagName: 'md-ink-bar',

  attributeBindings: ['style'],
  classNameBindings: ['movingRight:md-right:md-left'],

  style: computed('left', 'right', function() {
    return htmlSafe(`left: ${this.get('left')}px; right: ${this.get('right')}px;`);
  })
});
