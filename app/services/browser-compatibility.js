import Ember from 'ember';

export default Ember.Service.extend({

  snifferService: Ember.inject.service('sniffer'),

  webkit: Ember.computed('', function() {
    return /webkit/i.test(this.get('snifferService.vendorPrefix'));
  }),

  vendorProperty(name) {
    var prefix = this.get('snifferService.vendorPrefix').toLowerCase();
    return this.get('webkit') ? `-webkit-${name.charAt(0)}${name.substring(1)}` : name;
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
  })
});
