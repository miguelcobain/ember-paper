import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  tagName: '',

  left: computed.equal('direction', 'left'),
  right: computed.equal('direction', 'right'),

  style: computed('leftValue', 'rightValue', function() {
    let left = parseInt(this.get('leftValue'));
    let right = parseInt(this.get('rightValue'));
    return `left: ${left}px; right: ${right}px;`;
  })
});
