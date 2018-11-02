/**
 * @module ember-paper
 */
import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';
import { run } from '@ember/runloop';
import { supportsPassiveEventListeners } from 'ember-paper/utils/browser-features';
import { nextTick } from 'ember-css-transitions/mixins/transition-mixin';

/* global window */

const DURATION = 400;


/**
 * @class RippleMixin
 * @extends Ember.Mixin
 */
export default Mixin.create({
  rippleContainerSelector: '.md-container',

  center: false,
  dimBackground: false,
  fitRipple: false,
  colorElement: false,
  noink: false,

  rippleInk: computed('noink', 'rippleInkColor', function() {
    if (this.get('noink')) {
      return false;
    }
    if (this.get('rippleInkColor')) {
      return this.get('rippleInkColor');
    }
    return '';
  }),

  didInsertElement() {
    this._super(...arguments);

    let rippleContainerSelector = this.get('rippleContainerSelector');

    if (rippleContainerSelector) {
      this.rippleElement = this.element.querySelector(rippleContainerSelector);
    } else {
      this.rippleElement = this.element;
    }
    this.mousedown = false;
    this.ripples = [];
    this.timeout = null; // Stores a reference to the most-recent ripple timeout
    this.lastRipple = null;

    this._container = this.createContainer();

    this.rippleElement.classList.add('md-ink-ripple');
    this.bindEvents();
  },

  autoCleanup(self, cleanupFn) {
    if (self.mousedown || self.lastRipple) {
      self.mousedown = false;
      nextTick().then(() => {
        cleanupFn.bind(self)();
      });
    }
  },

  color(value) {
    let self = this;

    // If assigning a color value, apply it to background and the ripple color
    if (typeof value !== 'undefined') {
      self._color = self._parseColor(value);
    }

    // If color lookup, use assigned, defined, or inherited
    return self._color || self._parseColor(self.get('rippleInk')) || self._parseColor(getElementColor());

    /*
     * Finds the color element and returns its text color for use as default ripple color
     * @returns {string}
     */
    function getElementColor() {
      let items = self.get('colorElement') ? self.get('colorElement') : [];
      let elem = items.length ? items[0] : self.rippleElement;

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
      return color.replace(/\d?\.?\d*\s*\)\s*$/, `${(0.1 * multiplier).toString()})`);
    }
    if (color.indexOf('rgb') === 0) {
      return rgbToRGBA(color);
    }
    if (color.indexOf('#') === 0) {
      return hexToRGBA(color);
    }

    /*
     * Converts hex value to RGBA string
     * @param color {string}
     * @returns {string}
     */
    function hexToRGBA(color) {
      let hex = color[0] === '#' ? color.substr(1) : color;
      let dig = hex.length / 3;
      let red = hex.substr(0, dig);
      let green = hex.substr(dig, dig);
      let blue = hex.substr(dig * 2);
      if (dig === 1) {
        red += red;
        green += green;
        blue += blue;
      }
      return `rgba(${parseInt(red, 16)}, ${parseInt(green, 16)}, ${parseInt(blue, 16)}, 0.1)`;
    }

    /*
     * Converts an RGB color to RGBA
     * @param color {string}
     * @returns {string}
     */
    function rgbToRGBA(color) {
      return color.replace(')', ', 0.1)').replace('(', 'a(');
    }

  },
  bindEvents() {
    let re = this.rippleElement;
    re.addEventListener('mousedown', run.bind(this, this.handleMousedown));
    re.addEventListener('mouseup', run.bind(this, this.handleMouseup));
    re.addEventListener('mouseleave', run.bind(this, this.handleMouseup));

    let options = supportsPassiveEventListeners ? { passive: true } : false;
    re.addEventListener('touchend', run.bind(this, this.handleMouseup), options);
    re.addEventListener('touchmove', run.bind(this, this.handleTouchmove), options);
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
      this.createRipple(this._container.clientWidth / 2, this._container.clientWidth / 2);
    } else {

      // We need to calculate the relative coordinates if the target is a sublayer of the ripple element
      if (event.srcElement !== this.rippleElement) {
        let layerRect = this.rippleElement.getBoundingClientRect();
        let layerX = event.clientX - layerRect.left;
        let layerY = event.clientY - layerRect.top;

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
    for (let i = 0; i < this.ripples.length; i++) {
      this.ripples[i].remove();
    }
  },
  clearRipples() {
    for (let i = 0; i < this.ripples.length; i++) {
      this.fadeInComplete(this.ripples[i]);
    }
  },
  createContainer() {
    let container = document.createElement('div');
    container.classList.add('md-ripple-container');
    this.rippleElement.appendChild(container);
    return container;
  },
  clearTimeout() {
    if (this.timeout) {
      run.cancel(this.timeout);
      this.timeout = null;
    }
  },
  isRippleAllowed() {
    let element = this.rippleElement;

    do {
      if (!element.tagName || element.tagName === 'BODY') {
        break;
      }

      if (element && typeof element.hasAttribute === 'function') {
        if (element.hasAttribute('disabled')) {
          return false;
        }
        if (this.get('rippleInk') === false) {
          return false;
        }
      }
      element = element.parentNode;
    } while (element);

    return true;
  },
  createRipple(left, top) {
    if (!this.isRippleAllowed()) {
      return;
    }

    let ctrl = this;
    let ripple = document.createElement('div');
    ripple.classList.add('md-ripple');

    let width = this.rippleElement.clientWidth;
    let height = this.rippleElement.clientHeight;
    let x = Math.max(Math.abs(width - left), left) * 2;
    let y = Math.max(Math.abs(height - top), top) * 2;
    let size = getSize(this.get('fitRipple'), x, y);
    let color = this.calculateColor();

    let rippleCss = `
      left: ${left}px;
      top: ${top}px;
      background: 'black';
      width: ${size}px;
      height: ${size}px;
      background-color: ${rgbaToRGB(color)};
      border-color: ${rgbaToRGB(color)}
    `;

    ripple.style.cssText = rippleCss;

    this.lastRipple = ripple;

    // we only want one timeout to be running at a time
    this.clearTimeout();
    this.timeout = run.later(this, function() {
      ctrl.clearTimeout();
      if (!ctrl.mousedown) {
        ctrl.fadeInComplete(ripple);
      }
    }, {}, DURATION * 0.35);

    if (this.get('dimBackground')) {
      this._container.style.cssText = `background-color: ${color}`;
    }
    this._container.appendChild(ripple);
    this.ripples.push(ripple);
    ripple.classList.add('md-ripple-placed');

    nextTick().then(() => {
      ripple.classList.add('md-ripple-scaled', 'md-ripple-active');
      run.later(this, function() {
        ctrl.clearRipples();
      }, {}, DURATION);
    });

    function rgbaToRGB(color) {
      return color ? color.replace('rgba', 'rgb').replace(/,[^),]+\)/, ')') : 'rgb(0,0,0)';
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
    let ctrl = this;
    let index = this.ripples.indexOf(ripple);

    if (index < 0) {
      return;
    }
    this.ripples.splice(this.ripples.indexOf(ripple), 1);
    ripple.classList.remove('md-ripple-active');
    ripple.classList.add('md-ripple-remove');
    if (this.ripples.length === 0) {
      this._container.style.cssText = `backgroundColor: ''`;
    }
    // use a 2-second timeout in order to allow for the animation to finish
    // we don't actually care how long the animation takes
    run.later(this, function() {
      ctrl.fadeOutComplete(ripple);
    }, {}, DURATION);
  },
  fadeOutComplete(ripple) {
    ripple.parentNode.removeChild(ripple);
    this.lastRipple = null;
  }
});
