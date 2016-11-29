import Ember from 'ember';
const { computed, Component } = Ember;

export default Component.extend({
  tagName: '',

  left: computed.equal('direction', 'left'),
  right: computed.equal('direction', 'right'),

  style: computed('leftPosition', 'rightPosition', function() {
    let left = parseInt(this.get('leftPosition'));
    let right = parseInt(this.get('rightPosition'));
    return `left: ${left}px; right: ${right}px;`;
  })
});
