import Ember from 'ember';
import layout from '../templates/components/paper-ink-bar';

const { computed, Component, String: { htmlSafe } } = Ember;

export default Component.extend({
  tagName: '',
  layout,

  barClass: computed('direction', function() {
    let direction = this.get('direction');
    if (direction) {
      return `md-${direction}`;
    }
  }),

  style: computed('leftPosition', 'rightPosition', function() {
    let left = parseInt(this.get('leftPosition'));
    let right = parseInt(this.get('rightPosition'));
    return htmlSafe(`left: ${left}px; right: ${right}px;`);
  })

});
