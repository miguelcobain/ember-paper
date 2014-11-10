import Ember from 'ember';
import sniffer from '../utils/sniffer';

var webkit = /webkit/i.test(sniffer.vendorPrefix);
function vendorProperty(name) {
  return webkit ?
    ('webkit' + name.charAt(0).toUpperCase() + name.substring(1)) :
    name;
}

var TRANSITIONEND_EVENT = 'transitionend' + (webkit ? ' webkitTransitionEnd' : ''),
  ANIMATIONEND_EVENT = 'animationend' + (webkit ? ' webkitAnimationEnd' : ''),
  TRANSFORM = vendorProperty('transform'),
  TRANSITION = vendorProperty('transition'),
  TRANSITION_DURATION = vendorProperty('transitionDuration'),
  ANIMATION_PLAY_STATE = vendorProperty('animationPlayState'),
  ANIMATION_DURATION = vendorProperty('animationDuration'),
  ANIMATION_NAME = vendorProperty('animationName'),
  ANIMATION_TIMING = vendorProperty('animationTimingFunction'),
  ANIMATION_DIRECTION = vendorProperty('animationDirection');

export default Ember.Mixin.create({
  //classNames:['paper-ripple'],
  noink:false,

  /* DEFAULT RIPPLE OPTIONS */
  center: false,
  animationDuration: 300,
  mousedownPauseTime: 150,
  animationName: '',
  animationTimingFunction: 'linear',

  cantRipple:Ember.computed.any('noink','disabled'),
  cantRippleDidChange:function(){
    if(!this.get('cantRipple')){
      this.hammertime = new Hammer(this.$()[0]);
      this.hammertime.on('hammer.input', Ember.$.proxy(this.onInput,this));
    }
  }.observes('cantRipple').on('didInsertElement'),

  onWillDestroyElement:function(){
    if(this.get('cantRipple')){
      if(this.rippleContainer){
        this.rippleContainer.remove();
      }
      if(this.hammertime){
        this.hammertime.destroy();
      }
    }
  }.observes('cantRipple').on('willDestroyElement'),

  onInput:function(ev){
    if (ev.eventType === Hammer.INPUT_START && ev.isFirst) {
      this.createRipple(ev.center.x, ev.center.y, true);
    }
    //TODO handle mouse hold case
  },

  // Override to place ripple container in a different element,
  // otherwise it will be appended on root element
  rippleContainerSelector:'',
  rippleContainer:null,
  createRippleContainer:function(){
    if(!this.rippleContainer){
      this.rippleContainer = Ember.$('<div class="paper-ripple-container">');
      this.$(this.rippleContainerSelector).append(this.rippleContainer);
    }
    return this.rippleContainer;
  },
  createRippleElement:function(){
    var rippleEl = Ember.$('<div class="paper-ripple">')
      .css(ANIMATION_DURATION, this.get('animationDuration') + 'ms')
      .css(ANIMATION_NAME, this.get('animationName'))
      .css(ANIMATION_TIMING, this.get('animationTimingFunction'))
      .on(ANIMATIONEND_EVENT, function() {
        rippleEl.remove();
      });
    return rippleEl;
  },
  createRipple:function(left, top, positionsAreAbsolute){
    var rippleEl = this.createRippleElement();
    var rippleContainer = this.createRippleContainer();

    rippleContainer.append(rippleEl);

    var containerWidth = rippleContainer.prop('offsetWidth');

    if (this.center) {
      left = containerWidth / 2;
      top = rippleContainer.prop('offsetHeight') / 2;
    } else if (positionsAreAbsolute) {
      var elementRect = this.$()[0].getBoundingClientRect();
      left -= elementRect.left;
      top -= elementRect.top;
    }

    var css = {
      'background-color': window.getComputedStyle(rippleEl[0]).color ||
        window.getComputedStyle(this.$()[0]).color,
      'border-radius': (containerWidth / 2) + 'px',

      left: (left - containerWidth / 2) + 'px',
      width: containerWidth + 'px',

      top: (top - containerWidth / 2) + 'px',
      height: containerWidth + 'px'
    };
    //not being used in angular material
    //css[ANIMATION_DURATION] = options.fadeoutDuration + 'ms';
    rippleEl.css(css);

    return rippleEl;
  }

});
