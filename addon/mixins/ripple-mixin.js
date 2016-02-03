import Ember from 'ember';
const { inject, computed } = Ember;
/* global window */

const DURATION = 400;

export default Ember.Mixin.create({
  util: inject.service(),
  rippleContainerSelector: '.md-container',

  center: false,
  dimBackground: false,
  fitRipple: false,
  colorElement: false,
  noink: false,

  rippleInk: computed('noink', 'rippleInkColor', function () {
    if (this.get('noink')) {
      return false;
    }
    if (this.get('rippleInkColor')) {
      return this.get('rippleInkColor');
    }
    return "";
  }),

  didInsertElement() {
    this.rippleElement = this.$(this.get('rippleContainerSelector'));
    this.mousedown = false;
    this.ripples = [];
    this.timeout = null; // Stores a reference to the most-recent ripple timeout
    this.lastRipple = null;

    this._container = this.createContainer();

    this.rippleElement.addClass('md-ink-ripple');
    this.bindEvents();
  },
  autoCleanup(self, cleanupFn) {
    if (self.mousedown || self.lastRipple) {
      self.mousedown = false;
      self.get('util').nextTick(cleanupFn.bind(self), false);
    }
  },
  color(value) {
    var self = this;

    // If assigning a color value, apply it to background and the ripple color
    if (typeof value !== 'undefined') {
      self._color = self._parseColor(value);
    }

    // If color lookup, use assigned, defined, or inherited
    return self._color || self._parseColor(self.inkRipple()) || self._parseColor(getElementColor());

    /**
     * Finds the color element and returns its text color for use as default ripple color
     * @returns {string}
     */
    function getElementColor() {
      var items = self.get('colorElement') ? self.get('colorElement') : [];
      var elem = items.length ? items[0] : self.rippleElement[0];

      return elem ? window.getComputedStyle(elem).color : 'rgb(0,0,0)';
    }
  },
  calculateColor() {
    return this.color();
  },
  _parseColor(color, multiplier) {
    multiplier = multiplier || 1;

    if (!color) {
      return;
    }
    if (color.indexOf('rgba') === 0) {
      return color.replace(/\d?\.?\d*\s*\)\s*$/, (0.1 * multiplier).toString() + ')');
    }
    if (color.indexOf('rgb') === 0) {
      return rgbToRGBA(color);
    }
    if (color.indexOf('#') === 0) {
      return hexToRGBA(color);
    }

    /**
     * Converts hex value to RGBA string
     * @param color {string}
     * @returns {string}
     */
    function hexToRGBA(color) {
      var hex = color[0] === '#' ? color.substr(1) : color,
        dig = hex.length / 3,
        red = hex.substr(0, dig),
        green = hex.substr(dig, dig),
        blue = hex.substr(dig * 2);
      if (dig === 1) {
        red += red;
        green += green;
        blue += blue;
      }
      return 'rgba(' + parseInt(red, 16) + ',' + parseInt(green, 16) + ',' + parseInt(blue, 16) + ',0.1)';
    }

    /**
     * Converts an RGB color to RGBA
     * @param color {string}
     * @returns {string}
     */
    function rgbToRGBA(color) {
      return color.replace(')', ', 0.1)').replace('(', 'a(');
    }

  },
  bindEvents() {
    this.rippleElement.on('mousedown', this.handleMousedown.bind(this));
    this.rippleElement.on('mouseup touchend', this.handleMouseup.bind(this));
    this.rippleElement.on('mouseleave', this.handleMouseup.bind(this));
    this.rippleElement.on('touchmove', this.handleTouchmove.bind(this));
  },
  handleMousedown(event) {
    if (this.mousedown) {
      return;
    }

    // When jQuery is loaded, we have to get the original event
    if (event.hasOwnProperty('originalEvent')) {
      event = event.originalEvent;
    }
    this.mousedown = true;
    if (this.get('center')) {
      this.createRipple(this._container.prop('clientWidth') / 2, this._container.prop('clientWidth') / 2);
    } else {

      // We need to calculate the relative coordinates if the target is a sublayer of the ripple element
      if (event.srcElement !== this.rippleElement[0]) {
        var layerRect = this.rippleElement[0].getBoundingClientRect();
        var layerX = event.clientX - layerRect.left;
        var layerY = event.clientY - layerRect.top;

        this.createRipple(layerX, layerY);
      } else {
        this.createRipple(event.offsetX, event.offsetY);
      }
    }
  },
  handleMouseup() {
    this.autoCleanup(this, this.clearRipples);
  },
  handleTouchmove() {
    this.autoCleanup(this, this.deleteRipples);
  },
  deleteRipples() {
    for (var i = 0; i < this.ripples.length; i++) {
      this.ripples[i].remove();
    }
  },
  clearRipples() {
    for (var i = 0; i < this.ripples.length; i++) {
      this.fadeInComplete(this.ripples[i]);
    }
  },
  createContainer() {
    var container = Ember.$('<div class="md-ripple-container"></div>');
    this.rippleElement.append(container);
    return container;
  },
  clearTimeout() {
    if (this.timeout) {
      Ember.run.cancel(this.timeout);
      this.timeout = null;
    }
  },
  isRippleAllowed() {
    var element = this.rippleElement[0];
    do {
      if (!element.tagName || element.tagName === 'BODY') {
        break;
      }

      if (element && Ember.$.isFunction(element.hasAttribute)) {
        if (element.hasAttribute('disabled')) {
          return false;
        }
        if (this.inkRipple() === false) {
          return false;
        }
      }

    } while (element = element.parentNode);


    return true;
  },
  inkRipple() {
    return this.get('rippleInk');
  },
  createRipple(left, top) {
    if (!this.isRippleAllowed()) {
      return;
    }

    var ctrl = this;
    var ripple = Ember.$('<div class="md-ripple"></div>');
    var width = this.rippleElement.prop('clientWidth');
    var height = this.rippleElement.prop('clientHeight');
    var x = Math.max(Math.abs(width - left), left) * 2;
    var y = Math.max(Math.abs(height - top), top) * 2;
    var size = getSize(this.get('fitRipple'), x, y);
    var color = this.calculateColor();

    ripple.css({
      left: left + 'px',
      top: top + 'px',
      background: 'black',
      width: size + 'px',
      height: size + 'px',
      backgroundColor: rgbaToRGB(color),
      borderColor: rgbaToRGB(color)
    });
    this.lastRipple = ripple;

    // we only want one timeout to be running at a time
    this.clearTimeout();
    this.timeout = Ember.run.later(this, function () {
      ctrl.clearTimeout();
      if (!ctrl.mousedown) {
        ctrl.fadeInComplete(ripple);
      }
    }, {}, DURATION * 0.35);

    if (this.get('dimBackground')) {
      this._container.css({backgroundColor: color});
    }
    this._container.append(ripple);
    this.ripples.push(ripple);
    ripple.addClass('md-ripple-placed');

    this.get('util').nextTick(function () {

      ripple.addClass('md-ripple-scaled md-ripple-active');
      Ember.run.later(this, function () {
        ctrl.clearRipples();
      }, {}, DURATION);

    }, false);

    function rgbaToRGB(color) {
      return color ? color.replace('rgba', 'rgb').replace(/,[^\),]+\)/, ')') : 'rgb(0,0,0)';
    }

    function getSize(fit, x, y) {
      return fit ? Math.max(x, y) : Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }
  },
  fadeInComplete(ripple) {
    if (this.lastRipple === ripple) {
      if (!this.timeout && !this.mousedown) {
        this.removeRipple(ripple);
      }
    } else {
      this.removeRipple(ripple);
    }
  },
  removeRipple(ripple) {
    var ctrl = this;
    var index = this.ripples.indexOf(ripple);
    if (index < 0) {
      return;
    }
    this.ripples.splice(this.ripples.indexOf(ripple), 1);
    ripple.removeClass('md-ripple-active');
    if (this.ripples.length === 0) {
      this._container.css({backgroundColor: ''});
    }
    // use a 2-second timeout in order to allow for the animation to finish
    // we don't actually care how long the animation takes
    Ember.run.later(this, function () {
      ctrl.fadeOutComplete(ripple);
    }, {}, DURATION);
  },
  fadeOutComplete(ripple) {
    ripple.remove();
    this.lastRipple = null;
  }
});
