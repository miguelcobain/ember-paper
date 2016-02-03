import Ember from 'ember';
import Ripple from './ripple-mixin';

export default Ember.Mixin.create(Ripple, {
  rippleContainerSelector: '.md-container',
  center: false,
  dimBackground: true,
  outline: false
});
