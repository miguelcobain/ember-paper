import Ember from 'ember';

var RipplesMixin = Ember.Mixin.create({
    rippleService: Ember.inject.service('ripple')
});

export default RipplesMixin;
