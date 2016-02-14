import Ember from 'ember';

export default Ember.Service.extend({

  sniffer: Ember.inject.service('sniffer'),

  webkit: Ember.computed(function() {
    return /webkit/i.test(this.get('sniffer.vendorPrefix'));
  }),

  vendorProperty(name) {
    let prefix = this.get('sniffer.vendorPrefix').toLowerCase();
    return this.get('webkit') ? `-webkit-${name.charAt(0)}${name.substring(1)}` : name;
  },

  CSS: Ember.computed('webkit', function() {
    let webkit = this.get('webkit');
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
  }),

  MEDIA: {
    'sm': '(max-width: 599px)',
    'gt-sm': '(min-width: 600px)',
    'md': '(min-width: 600px) and (max-width: 959px)',
    'gt-md': '(min-width: 960px)',
    'lg': '(min-width: 960px) and (max-width: 1199px)',
    'gt-lg': '(min-width: 1200px)'
  },
  MEDIA_PRIORITY: [
    'gt-lg',
    'lg',
    'gt-md',
    'md',
    'gt-sm',
    'sm'
  ]
});
