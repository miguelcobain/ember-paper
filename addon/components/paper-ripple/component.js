import Component from '@ember/component';
import template from './template';
import { tagName, layout } from '@ember-decorators/component';
import { bind, later, cancel } from '@ember/runloop';
import { computed, action } from '@ember/object';
import { supportsPassiveEventListeners } from 'ember-paper/utils/browser-features';
import { nextTick } from 'ember-css-transitions/mixins/transition-mixin';

const DURATION = 400;

@tagName('')
@layout(template)
class PaperRipple extends Component {
  _parentFinder = self.document ? self.document.createTextNode('') : '';

  center = false;
  dimBackground = false;
  fitRipple = false;
  colorElement = false;
  noink = false;

  ripples = [];
  timeout = null; // Stores a reference to the most-recent ripple timeout
  lastRipple = null;
  mousedown = false;

  @computed('noink', 'rippleInkColor')
  get rippleInk() {
    if (this.noink) {
      return false;
    }

    if (this.rippleInkColor) {
      return this.rippleInkColor;
    }
    return '';
  }

  @action
  setupContainer(container) {
    this.parentNode = this._parentFinder.parentNode;

    this.rippleElement = this.parentNode;

    this._container = container;

    this.rippleElement.classList.add('md-ink-ripple');
    this.bindEvents();
  }

  clearTimeout() {
    if (this.timeout) {
      cancel(this.timeout);
      this.timeout = null;
    }
  }

  bindEvents() {
    let re = this.rippleElement;
    re.addEventListener('mousedown', bind(this, this.handleMousedown));
    re.addEventListener('mouseup', bind(this, this.handleMouseup));
    re.addEventListener('mouseleave', bind(this, this.handleMouseup));

    let options = supportsPassiveEventListeners ? { passive: true } : false;
    re.addEventListener('touchend', bind(this, this.handleMouseup), options);
    re.addEventListener('touchmove', bind(this, this.handleTouchmove), options);
  }

  handleMousedown(event) {
    if (this.mousedown) {
      return;
    }

    // When jQuery is loaded, we have to get the original event
    if (event.hasOwnProperty('originalEvent')) {
      event = event.originalEvent;
    }

    this.mousedown = true;

    if (this.center) {
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
  }

  async autoCleanup(cleanupFn) {
    if (this.mousedown || this.lastRipple) {
      this.mousedown = false;
      await nextTick();
      cleanupFn.bind(this)();
    }
  }

  color(value) {
    /*
     * Finds the color element and returns its text color for use as default ripple color
     * @returns {string}
     */
    let getElementColor = () => {
      let items = this.colorElement ? this.colorElement : [];
      let elem = items.length ? items[0] : this.rippleElement;

      return elem ? window.getComputedStyle(elem).color : 'rgb(0,0,0)';
    };

    // If assigning a color value, apply it to background and the ripple color
    if (typeof value !== 'undefined') {
      this._color = this._parseColor(value);
    }

    // If color lookup, use assigned, defined, or inherited
    return this._color || this._parseColor(this.rippleInk) || this._parseColor(getElementColor());
  }

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
  }

  handleMouseup() {
    this.autoCleanup(this.clearRipples);
  }

  handleTouchmove() {
    this.autoCleanup(this.deleteRipples);
  }

  deleteRipples() {
    for (let i = 0; i < this.ripples.length; i++) {
      this.ripples[i].remove();
    }
  }

  clearRipples() {
    for (let i = 0; i < this.ripples.length; i++) {
      this.fadeInComplete(this.ripples[i]);
    }
  }

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
        if (this.rippleInk === false) {
          return false;
        }
      }
      element = element.parentNode;
    } while (element);

    return true;
  }

  async createRipple(left, top) {
    if (!this.isRippleAllowed()) {
      return;
    }

    let ripple = document.createElement('div');
    ripple.classList.add('md-ripple');

    let width = this.rippleElement.clientWidth;
    let height = this.rippleElement.clientHeight;
    let x = Math.max(Math.abs(width - left), left) * 2;
    let y = Math.max(Math.abs(height - top), top) * 2;
    let size = getSize(this.get('fitRipple'), x, y);
    let color = this.color();

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
    this.timeout = later(() => {
      this.clearTimeout();
      if (!this.mousedown) {
        this.fadeInComplete(ripple);
      }
    }, DURATION * 0.35);

    if (this.dimBackground) {
      this._container.style.cssText = `background-color: ${color}`;
    }

    this._container.appendChild(ripple);
    this.ripples.push(ripple);
    ripple.classList.add('md-ripple-placed');

    await nextTick();
    ripple.classList.add('md-ripple-scaled', 'md-ripple-active');
    later(() => {
      this.clearRipples();
    }, DURATION);

    function rgbaToRGB(color) {
      return color ? color.replace('rgba', 'rgb').replace(/,[^),]+\)/, ')') : 'rgb(0,0,0)';
    }

    function getSize(fit, x, y) {
      return fit ? Math.max(x, y) : Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }
  }

  fadeInComplete(ripple) {
    if (this.lastRipple === ripple) {
      if (!this.timeout && !this.mousedown) {
        this.removeRipple(ripple);
      }
    } else {
      this.removeRipple(ripple);
    }
  }

  removeRipple(ripple) {
    let index = this.ripples.indexOf(ripple);

    if (index < 0) {
      return;
    }

    this.ripples.splice(this.ripples.indexOf(ripple), 1);
    ripple.classList.remove('md-ripple-active');
    ripple.classList.add('md-ripple-remove');

    if (this.ripples.length === 0) {
      this._container.style.cssText = 'backgroundColor: \'\'';
    }

    // use a 2-second timeout in order to allow for the animation to finish
    // we don't actually care how long the animation takes
    later(() => {
      this.fadeOutComplete(ripple);
    }, DURATION);
  }

  fadeOutComplete(ripple) {
    ripple.parentNode.removeChild(ripple);
    this.lastRipple = null;
  }
}

export default PaperRipple;
