import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  selectedVAlignDirection: 'bottom',
  selectedHAlignDirection: 'right',
  selectedDirection: 'up',
  selectedDirection2: 'up',
  selectedAnimation: 'fling',
  selectedOpen: false,
  selectedHover: false
});
