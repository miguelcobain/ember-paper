import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'md-virtual-repeat-container',
  classNames: ['md-virtual-repeat-container'],
  classNameBindings: ['orientHorizontal:md-orient-horizontal:md-orient-vertical'],

  size: 0,
  scrollSize: 0,
  scrollOffset: 0,
  horizontal: computed.readOnly('orientHorizontal'),
  repeater: null,
  autoShrink: false,
  autoShrinkMin: computed((x) => parseInt(x, 10) || 0),
  originalSize: null,
  offsetSize: computed((x) => parseInt(x, 10) || 0),
  oldElementSize: null,
  topIndex: 0

});
