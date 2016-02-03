import Ember from 'ember';

const DURATION = 450;

/**
 * Controller used by the ripple service in order to apply ripples
 * @ngInject
 */
function InkRippleCtrl($element, rippleOptions, $mdUtil) {
  this.$window = window;
  this.$mdUtil = $mdUtil;
  this.$element = $element;
  this.options = rippleOptions;
  this.mousedown = false;
  this.ripples = [];
  this.timeout = null; // Stores a reference to the most-recent ripple timeout
  this.lastRipple = null;

  this.container = this.createContainer();

  this.$element.addClass('md-ink-ripple');


  this.bindEvents();
}


/**
 * Either remove or unlock any remaining ripples when the user mouses off of the element (either by
 * mouseup or mouseleave event)
 */
function autoCleanup(self, cleanupFn) {

  if (self.mousedown || self.lastRipple) {
    self.mousedown = false;
    self.$mdUtil.nextTick(cleanupFn.bind(self), false);
  }

}


/**
 * Returns the color that the ripple should be (either based on CSS or hard-coded)
 * @returns {string}
 */
InkRippleCtrl.prototype.color = function (value) {
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
    var items = self.options && self.options.colorElement ? self.options.colorElement : [];
    var elem = items.length ? items[0] : self.$element[0];

    return elem ? self.$window.getComputedStyle(elem).color : 'rgb(0,0,0)';
  }
};

/**
 * Updating the ripple colors based on the current inkRipple value
 * or the element's computed style color
 */
InkRippleCtrl.prototype.calculateColor = function () {
  return this.color();
};


/**
 * Takes a string color and converts it to RGBA format
 * @param color {string}
 * @param [multiplier] {int}
 * @returns {string}
 */

InkRippleCtrl.prototype._parseColor = function parseColor(color, multiplier) {
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

};

/**
 * Binds events to the root element for
 */
InkRippleCtrl.prototype.bindEvents = function () {
  this.$element.on('mousedown', this.handleMousedown.bind(this));
  this.$element.on('mouseup touchend', this.handleMouseup.bind(this));
  this.$element.on('mouseleave', this.handleMouseup.bind(this));
  this.$element.on('touchmove', this.handleTouchmove.bind(this));
};

/**
 * Create a new ripple on every mousedown event from the root element
 * @param event {MouseEvent}
 */
InkRippleCtrl.prototype.handleMousedown = function (event) {
  if (this.mousedown) {
    return;
  }

  // When jQuery is loaded, we have to get the original event
  if (event.hasOwnProperty('originalEvent')) {
    event = event.originalEvent;
  }
  this.mousedown = true;
  if (this.options.center) {
    this.createRipple(this.container.prop('clientWidth') / 2, this.container.prop('clientWidth') / 2);
  } else {

    // We need to calculate the relative coordinates if the target is a sublayer of the ripple element
    if (event.srcElement !== this.$element[0]) {
      var layerRect = this.$element[0].getBoundingClientRect();
      var layerX = event.clientX - layerRect.left;
      var layerY = event.clientY - layerRect.top;

      this.createRipple(layerX, layerY);
    } else {
      this.createRipple(event.offsetX, event.offsetY);
    }
  }
};

/**
 * Either remove or unlock any remaining ripples when the user mouses off of the element (either by
 * mouseup, touchend or mouseleave event)
 */
InkRippleCtrl.prototype.handleMouseup = function () {
  autoCleanup(this, this.clearRipples);
};

/**
 * Either remove or unlock any remaining ripples when the user mouses off of the element (by
 * touchmove)
 */
InkRippleCtrl.prototype.handleTouchmove = function () {
  autoCleanup(this, this.deleteRipples);
};

/**
 * Cycles through all ripples and attempts to remove them.
 */
InkRippleCtrl.prototype.deleteRipples = function () {
  for (var i = 0; i < this.ripples.length; i++) {
    this.ripples[i].remove();
  }
};

/**
 * Cycles through all ripples and attempts to remove them with fade.
 * Depending on logic within `fadeInComplete`, some removals will be postponed.
 */
InkRippleCtrl.prototype.clearRipples = function () {
  for (var i = 0; i < this.ripples.length; i++) {
    this.fadeInComplete(this.ripples[i]);
  }
};

/**
 * Creates the ripple container element
 * @returns {*}
 */
InkRippleCtrl.prototype.createContainer = function () {
  var container = Ember.$('<div class="md-ripple-container"></div>');
  this.$element.append(container);
  return container;
};

InkRippleCtrl.prototype.clearTimeout = function () {
  if (this.timeout) {
    Ember.run.cancel(this.timeout);
    this.timeout = null;
  }
};

InkRippleCtrl.prototype.isRippleAllowed = function () {
  var element = this.$element[0];
  do {
    if (!element.tagName || element.tagName === 'BODY') {
      break;
    }

    if (element && Ember.$.isFunction(element.hasAttribute)) {
      if (element.hasAttribute('disabled')) {
        return false;
      }
      if (this.inkRipple() === 'false' || this.inkRipple() === '0') {
        return false;
      }
    }

  } while (element = element.parentNode);
  return true;
};

/**
 * The attribute `md-ink-ripple` may be a static or interpolated
 * color value OR a boolean indicator (used to disable ripples)
 */
InkRippleCtrl.prototype.inkRipple = function () {
  return this.$element.attr('md-ink-ripple');
};

/**
 * Creates a new ripple and adds it to the container.  Also tracks ripple in `this.ripples`.
 * @param left
 * @param top
 */
InkRippleCtrl.prototype.createRipple = function (left, top) {
  if (!this.isRippleAllowed()) {
    return;
  }

  var ctrl = this;
  var ripple = Ember.$('<div class="md-ripple"></div>');
  var width = this.$element.prop('clientWidth');
  var height = this.$element.prop('clientHeight');
  var x = Math.max(Math.abs(width - left), left) * 2;
  var y = Math.max(Math.abs(height - top), top) * 2;
  var size = getSize(this.options.fitRipple, x, y);
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

  if (this.options.dimBackground) {
    this.container.css({backgroundColor: color});
  }
  this.container.append(ripple);
  this.ripples.push(ripple);
  ripple.addClass('md-ripple-placed');

  this.$mdUtil.nextTick(function () {

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
};


/**
 * After fadeIn finishes, either kicks off the fade-out animation or queues the element for removal on mouseup
 * @param ripple
 */
InkRippleCtrl.prototype.fadeInComplete = function (ripple) {
  if (this.lastRipple === ripple) {
    if (!this.timeout && !this.mousedown) {
      this.removeRipple(ripple);
    }
  } else {
    this.removeRipple(ripple);
  }
};

/**
 * Kicks off the animation for removing a ripple
 * @param ripple {Element}
 */
InkRippleCtrl.prototype.removeRipple = function (ripple) {
  var ctrl = this;
  var index = this.ripples.indexOf(ripple);
  if (index < 0) {
    return;
  }
  this.ripples.splice(this.ripples.indexOf(ripple), 1);
  ripple.removeClass('md-ripple-active');
  if (this.ripples.length === 0) {
    this.container.css({backgroundColor: ''});
  }
  // use a 2-second timeout in order to allow for the animation to finish
  // we don't actually care how long the animation takes
  Ember.run.later(this, function () {
    ctrl.fadeOutComplete(ripple);
  }, {}, DURATION);
};

/**
 * Removes the provided ripple from the DOM
 * @param ripple
 */
InkRippleCtrl.prototype.fadeOutComplete = function (ripple) {
  ripple.remove();
  this.lastRipple = null;
};

export default Ember.Service.extend({
  util: Ember.inject.service(),
  attach (element, options) {
    return new InkRippleCtrl(element, options, this.get('util'));
  }
});
