import Ember from 'ember';
const { computed, Component, String: EmberString } = Ember;

export default Component.extend({
  tagName: '',

  barClass: computed('direction', function() {
    const direction = this.get('direction');
    if (direction) {
      return EmberString.htmlSafe(`md-${direction}`);
    }
  }),

  style: computed('leftPosition', 'rightPosition', function() {
    let left = parseInt(this.get('leftPosition'));
    let right = parseInt(this.get('rightPosition'));
    return EmberString.htmlSafe(`left: ${left}px; right: ${right}px;`);
  })

});
