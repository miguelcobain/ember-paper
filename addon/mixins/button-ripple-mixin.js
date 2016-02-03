import Ember from 'ember';
import Ripple from './ripple-mixin';

export default Ember.Mixin.create(Ripple, {
    rippleContainerSelector: null,
    fitRipple: Ember.computed.alias('isIconButton'),
    center: Ember.computed.alias('isIconButton'),
    dimBackground: Ember.computed.not('isIconButton')
});
