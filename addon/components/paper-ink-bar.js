import Ember from 'ember';
const { computed, Component, String: { htmlSafe } } = Ember;

export default Component.extend({
  tagName: '',

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
