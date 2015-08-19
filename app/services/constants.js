import Ember from 'ember';

export default Ember.Service.extend({

  sniffer: Ember.inject.service('sniffer'),

  webkit: Ember.computed(function() {
    return /webkit/i.test(this.get('sniffer.vendorPrefix'));
  }),

  vendorProperty(name) {
    var prefix = this.get('sniffer.vendorPrefix').toLowerCase();
    return this.get('webkit') ? `webkit${name.charAt(0).toUpperCase()}${name.substring(1)}` : name;
  },

  CSS: Ember.computed('webkit', function() {
    var webkit = this.get('webkit');
    return {
      /* Constants */
      TRANSITIONEND:  'transitionend' + (webkit ? ' webkitTransitionEnd'  : ''),
      ANIMATIONEND:   'animationend'  + (webkit ? ' webkitAnimationEnd'   : ''),

      TRANSFORM:              this.vendorProperty('transform'),
      TRANSFORM_ORIGIN:       this.vendorProperty('transformOrigin'),
      TRANSITION:             this.vendorProperty('transition'),
      TRANSITION_DURATION:    this.vendorProperty('transitionDuration'),
      ANIMATION_PLAY_STATE:   this.vendorProperty('animationPlayState'),
      ANIMATION_DURATION:     this.vendorProperty('animationDuration'),
      ANIMATION_NAME:         this.vendorProperty('animationName'),
      ANIMATION_TIMING:       this.vendorProperty('animationTimingFunction'),
      ANIMATION_DIRECTION:    this.vendorProperty('animationDirection')
    };
  }),

  KEYCODE: Ember.Object.create({
    ENTER:          13,
    ESCAPE:         27,
    SPACE:          32,
    LEFT_ARROW:     37,
    UP_ARROW:       38,
    RIGHT_ARROW:    39,
    DOWN_ARROW:     40,
    TAB:            9
  })
});
