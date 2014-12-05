import Ember from 'ember';
/* global Hammer */

export default Ember.Mixin.create({
  mousedown: true,
  hover: true,
  focus: true,
  center: false,
  mousedownPauseTime: 150,
  dimBackground: false,
  outline: false,
  isFAB: false,
  isMenuItem: false,

  isActive: false,
  isHeld: false,
  counter:0,

  ripples:[],
  rippleStates:[],

  onDidInsertElement:function(){
    if(!this.noink){
      this.element = this.$();
      this.colorElement = this.$();
      this.node = this.element[0];
      this.hammertime = new Hammer(this.node);
      this.color = this.parseColor(this.element.attr('md-ink-ripple')) || this.parseColor(window.getComputedStyle(this.colorElement[0]).color || 'rgb(0, 0, 0)');
      if(this.mousedown){
        this.hammertime.on('hammer.input', Ember.$.proxy(this.onInput,this));
      }
    }
  }.on('didInsertElement'),

  onWillDestroyElement:function(){
    if(this.rippleContainer){
      this.rippleContainer.remove();
    }
    if(this.hammertime){
      this.hammertime.destroy();
    }
  }.on('willDestroyElement'),

  onInput:function(ev){
    var ripple, index;
    if (ev.eventType === Hammer.INPUT_START && ev.isFirst && !this.get('disabled')) {
      ripple = this.createRipple(ev.center.x, ev.center.y);
      this.isHeld = true;
    } else if (ev.eventType === Hammer.INPUT_END && ev.isFinal) {
      this.isHeld = false;
      index = this.ripples.length - 1;
      ripple = this.ripples[index];
      Ember.run.later(this,function(){
        this.updateElement(ripple);
      }, 0);
    }
  },
  /**
  * Gets the current ripple container
  * If there is no ripple container, it creates one and returns it
  *
  * @returns {angular.element} ripple container element
  */
  getRippleContainer: function() {
    if (this.rippleContainer){
      return this.rippleContainer;
    }
    this.rippleContainer = Ember.$('<div class="md-ripple-container">');
    this.element.append(this.rippleContainer);
    return this.rippleContainer;
  },
  /**
  * Creates the ripple element with the provided css
  *
  * @param {object} css properties to be applied
  *
  * @returns {angular.element} the generated ripple element
  */
  getRippleElement: function(css) {
    var elem = Ember.$('<div class="md-ripple" data-counter="' + this.counter++ + '">');
    this.ripples.unshift(elem);
    this.rippleStates.unshift({ animating: true });
    this.rippleContainer.append(elem);
    if(css){
      elem.css(css);
    }
    return elem;
  },
  /**
  * Calculate the ripple size
  *
  * @returns {number} calculated ripple diameter
  */
  getRippleSize: function(left, top) {
    var width = this.rippleContainer.prop('offsetWidth'),
    height = this.rippleContainer.prop('offsetHeight'),
    multiplier, size, rect;
    if (this.isMenuItem) {
      size = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    } else if (this.outline) {
      rect = this.node.getBoundingClientRect();
      left -= rect.left;
      top -= rect.top;
      width = Math.max(left, width - left);
      height = Math.max(top, height - top);
      size = 2 * Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    } else {
      multiplier = this.isFAB ? 1.1 : 0.8;
      size = Math.max(width, height) * multiplier;
    }
    return size;
  },
  parseColor: function(color) {
    if (!color){ return; }
    if (color.indexOf('rgba') === 0){ return color; }
    if (color.indexOf('rgb')  === 0){ return rgbToRGBA(color); }
    if (color.indexOf('#')    === 0){ return hexToRGBA(color); }

    /**
    * Converts a hex value to an rgba string
    *
    * @param {string} hex value (3 or 6 digits) to be converted
    *
    * @returns {string} rgba color with 0.1 alpha
    */
    function hexToRGBA(color) {
      var hex = color.charAt(0) === '#' ? color.substr(1) : color,
      dig = hex.length / 3,
      red = hex.substr(0, dig),
      grn = hex.substr(dig, dig),
      blu = hex.substr(dig * 2);
      if (dig === 1) {
        red += red;
        grn += grn;
        blu += blu;
      }
      return 'rgba(' + parseInt(red, 16) + ',' + parseInt(grn, 16) + ',' + parseInt(blu, 16) + ',0.1)';
    }

    /**
    * Converts rgb value to rgba string
    *
    * @param {string} rgb color string
    *
    * @returns {string} rgba color with 0.1 alpha
    */
    function rgbToRGBA(color) {
      return color.replace(')', ', 0.1)').replace('(', 'a(');
    }

  },
  /**
  * Creates a ripple at the provided coordinates
  *
  * @param {number} left cursor position
  * @param {number} top cursor position
  *
  * @returns {angular.element} the generated ripple element
  */
  createRipple:function(left, top){
    var color = this.color = this.parseColor(this.element.attr('md-ink-ripple')) || this.parseColor(window.getComputedStyle(this.colorElement[0]).color || 'rgb(0, 0, 0)');

    var container = this.getRippleContainer(),
      size = this.getRippleSize(left, top),
      css = this.getRippleCss(size, left, top),
      elem = this.getRippleElement(css),
      index = this.ripples.indexOf(elem),
      state = this.rippleStates[index] || {};

    this.rippleSize = size;

    state.animating = true;

    Ember.run.later(this,function () {
      if (this.dimBackground) {
        container.css({ backgroundColor: color });
      }
      elem.addClass('md-ripple-placed md-ripple-scaled');
      if (this.outline) {
        elem.css({
          borderWidth: (size * 0.5) + 'px',
          marginLeft: (size * -0.5) + 'px',
          marginTop: (size * -0.5) + 'px'
        });
      } else {
        elem.css({ left: '50%', top: '50%' });
      }
      this.updateElement(elem);
      Ember.run.later(this,function () {
        state.animating = false;
        this.updateElement(elem);
      }, (this.outline ? 450 : 225));
    }, 0);

    return elem;
  },
  removeElement: function(elem, wait) {
    var ripples = this.ripples;
    ripples.splice(ripples.indexOf(elem), 1);
    if (ripples.length === 0 && this.rippleContainer) {
      this.rippleContainer.css({ backgroundColor: '' });
    }
    Ember.run.later(this,function(){
      elem.remove();
    }, wait);
  },
  updateElement: function(elem) {
    var index = this.ripples.indexOf(elem),
    state = this.rippleStates[index] || {},
    elemIsActive = this.ripples.length > 1 ? false : this.isActive,
    elemIsHeld   = this.ripples.length > 1 ? false : this.isHeld;
    if (elemIsActive || state.animating || elemIsHeld) {
      elem.addClass('md-ripple-visible');
    } else if (elem) {
      elem.removeClass('md-ripple-visible');
      if (this.outline) {
        elem.css({
          width: this.rippleSize + 'px',
          height: this.rippleSize + 'px',
          marginLeft: (this.rippleSize * -1) + 'px',
          marginTop: (this.rippleSize * -1) + 'px'
        });
      }
      this.removeElement(elem, this.outline ? 450 : 650);
    }
  },
  /**
  * Generates the ripple css
  *
  * @param {number} the diameter of the ripple
  * @param {number} the left cursor offset
  * @param {number} the top cursor offset
  *
  * @returns {{backgroundColor: *, width: string, height: string, marginLeft: string, marginTop: string}}
  */
  getRippleCss: function(size, left, top) {
    var rect,
    css = {
      backgroundColor: rgbaToRGB(this.color),
      borderColor: rgbaToRGB(this.color),
      width: size + 'px',
      height: size + 'px'
    };

    if (this.outline) {
      css.width = 0;
      css.height = 0;
    } else {
      css.marginLeft = css.marginTop = (size * -0.5) + 'px';
    }

    if (this.center) {
      css.left = css.top = '50%';
    } else {
      rect = this.node.getBoundingClientRect();
      css.left = Math.round((left - rect.left) / this.rippleContainer.prop('offsetWidth') * 100) + '%';
      css.top = Math.round((top - rect.top) / this.rippleContainer.prop('offsetHeight') * 100) + '%';
    }

    return css;

    /**
    * Converts rgba string to rgb, removing the alpha value
    *
    * @param {string} rgba color
    *
    * @returns {string} rgb color
    */
    function rgbaToRGB(color) {
      return color.replace('rgba', 'rgb').replace(/,[^\)\,]+\)/, ')');
    }
  }

});
