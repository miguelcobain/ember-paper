/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-progress-circular';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import clamp from 'ember-paper/utils/clamp';
import { rAF, cAF } from 'ember-css-transitions/mixins/transition-mixin';

const { Component, computed, isPresent, String: { htmlSafe } } = Ember;

const MODE_DETERMINATE = 'determinate';
const MODE_INDETERMINATE = 'indeterminate';

const now = () => new Date().getTime();

function linearEase(t, b, c, d) {
  return c * t / d + b;
}

function materialEase(t, b, c, d) {
  // via http://www.timotheegroleau.com/Flash/experiments/easing_function_generator.htm
  // with settings of [0, 0, 1, 1]
  let ts = (t /= d) * t;
  let tc = ts * t;
  return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
}

/**
 * @class PaperProgressCircular
 * @extends Ember.Component
 * @uses ColorMixin
 */
export default Component.extend(ColorMixin, {
  layout,
  tagName: 'md-progress-circular',
  classNames: ['md-default-theme'],
  attributeBindings: ['value', 'mode:md-mode', 'containerStyle:style'],
  classNameBindings: ['spinnerClass', 'disabled:_md-progress-circular-disabled'],

  diameter: 50,
  strokeRatio: 0.1,

  durationIndeterminate: 1333,
  easeFnIndeterminate: materialEase,
  startIndeterminate: 1,
  endIndeterminate: 149,

  mode: computed('value', function() {
    let value = this.get('value');
    return isPresent(value) ? MODE_DETERMINATE : MODE_INDETERMINATE;
  }),

  spinnerClass: computed('mode', function() {
    let mode = this.get('mode');
    return mode === MODE_DETERMINATE || mode === MODE_INDETERMINATE ? `md-mode-${mode}` : 'ng-hide';
  }),

  isIndeterminate: computed.equal('mode', MODE_INDETERMINATE),

  strokeWidth: computed('strokeRatio', 'diameter', function() {
    return this.get('strokeRatio') * this.get('diameter');
  }),

  strokeDasharray: computed('mode', 'diameter', 'strokeWidth', function() {
    if (this.get('mode') === MODE_INDETERMINATE) {
      return (this.get('diameter') - this.get('strokeWidth')) * Math.PI * 0.75;
    } else {
      return (this.get('diameter') - this.get('strokeWidth')) * Math.PI;
    }
  }),

  d: computed('diameter', 'strokeWidth', 'isIndeterminate', function() {
    return this.getSvgArc(this.get('diameter'), this.get('strokeWidth'), this.get('isIndeterminate'));
  }),

  pathDiameter: computed('diameter', 'strokeWidth', function() {
    return this.get('diameter') - this.get('strokeWidth');
  }),

  containerStyle: computed('diameter', function() {
    let diameter = this.get('diameter');
    let width = `width: ${diameter}px`;
    let height = `height: ${diameter}px`;
    return htmlSafe([width, height].join('; '));
  }),

  svgStyle: computed('diameter', function() {
    let diameter = this.get('diameter');
    let width = `width: ${diameter}px`;
    let height = `height: ${diameter}px`;
    let transformOrigin = `transform-origin: ${diameter / 2}px ${diameter / 2}px ${diameter / 2}px`;
    return htmlSafe([width, height, transformOrigin].join('; '));
  }),

  pathStyle: computed('strokeWidth', function() {
    return htmlSafe(`stroke-width: ${this.get('strokeWidth')}px`);
  }),

  svgArc: computed('value', 'oldValue', 'diameter', function() {

  }),

  didInsertElement() {
    this._super(...arguments);

    if (this.get('mode') === MODE_INDETERMINATE) {
      this.startIndeterminateAnimation();
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);
    let newValue = clamp(this.get('value'), 0, 100);
    let newDisabled = this.get('disabled');

    if (this.oldValue !== newValue) {
      // value changed
      this.startDeterminateAnimation(this.oldValue, newValue);
      this.oldValue = newValue;
    }

    if (this.oldDisabled !== newDisabled) {
      // disabled changed
      if (newDisabled && this.lastDrawFrame) {
        cAF(this.lastDrawFrame);
      } else if (this.get('mode') === MODE_INDETERMINATE) {
        this.startIndeterminateAnimation();
      }
      this.oldValue = newValue;
    }
  },

  willDestroyElement() {
    this._super(...arguments);

    if (this.lastDrawFrame) {
      cAF(this.lastDrawFrame);
    }
  },

  startDeterminateAnimation(oldValue, newValue) {
    this.renderCircle(oldValue, newValue);
  },

  iterationCount: 0,
  startIndeterminateAnimation() {
    this.renderCircle(this.get('startIndeterminate'), this.get('endIndeterminate'),
      this.get('easeFnIndeterminate'), this.get('durationIndeterminate'), this.iterationCount, 75);

    // The % 4 technically isn't necessary, but it keeps the rotation
    // under 360, instead of becoming a crazy large number.
    this.iterationCount = ++this.iterationCount % 4;
  },

  lastAnimationId: 0,
  renderCircle(animateFrom, animateTo, ease = linearEase, animationDuration = 100, iterationCount = 0, dashLimit = 100) {
    let id = ++this.lastAnimationId;
    let startTime = now();
    let changeInValue = animateTo - animateFrom;
    let diameter = this.get('diameter');
    let strokeWidth = this.get('strokeWidth');
    let rotation = -90 * iterationCount;

    let renderFrame = (value, diameter, strokeWidth, dashLimit) => {
      if (!this.isDestroyed && !this.isDestroying) {
        this.$('path').attr('stroke-dashoffset', this.getDashLength(diameter, strokeWidth, value, dashLimit));
        this.$('path').attr('transform', `rotate(${rotation} ${diameter / 2} ${diameter / 2})`);
      }
    };

    // No need to animate it if the values are the same
    if (animateTo === animateFrom) {
      renderFrame(animateTo, diameter, strokeWidth, dashLimit);
    } else {
      let animation = () => {
        let currentTime = clamp(now() - startTime, 0, animationDuration);

        renderFrame(ease(currentTime, animateFrom, changeInValue, animationDuration), diameter, strokeWidth, dashLimit);

        // Do not allow overlapping animations
        if (id === this.lastAnimationId && currentTime < animationDuration) {
          this.lastDrawFrame = rAF(animation);
        }

        if (currentTime >= animationDuration && this.get('mode') === MODE_INDETERMINATE) {
          this.startIndeterminateAnimation();
        }
      };
      this.lastDrawFrame = rAF(animation);
    }
  },

  /**
   * Returns SVG path data for progress circle
   * Syntax spec: https://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands
   *
   * @param {number} diameter Diameter of the container.
   * @param {number} strokeWidth Stroke width to be used when drawing circle
   * @param {boolean} indeterminate Use if progress circle will be used for indeterminate
   *
   * @returns {string} String representation of an SVG arc.
   */
  getSvgArc(diameter, strokeWidth, indeterminate) {
    let radius = diameter / 2;
    let offset = strokeWidth / 2;
    let start = `${radius},${offset}`; // ie: (25, 2.5) or 12 o'clock
    let end = `${offset},${radius}`;   // ie: (2.5, 25) or  9 o'clock
    let arcRadius = radius - offset;

    /* eslint-disable */
    return 'M' + start
         + 'A' + arcRadius + ',' + arcRadius + ' 0 1 1 ' + end // 75% circle
         + (indeterminate ? '' : 'A' + arcRadius + ',' + arcRadius + ' 0 0 1 ' + start); // loop to start
    /* eslint-enable */
  },

  /**
   * Return stroke length for progress circle
   *
   * @param {number} diameter Diameter of the container.
   * @param {number} strokeWidth Stroke width to be used when drawing circle
   * @param {number} value Percentage of circle (between 0 and 100)
   * @param {number} limit Max percentage for circle
   *
   * @returns {number} Stroke length for progres circle
   */
  getDashLength(diameter, strokeWidth, value, limit) {
    return (diameter - strokeWidth) * Math.PI * ((3 * (limit || 100) / 100) - (value / 100));
  }
});
