import Ember from 'ember';
import ColorMixin from 'ember-paper/mixins/color-mixin';

const BASE_DIAMETER = 48;
const DEFAULT_PROGRESS_SIZE = 100;
const DEFAULT_SCALING = 0.5;

const MODE_DETERMINATE = 'determinate',
  MODE_INDETERMINATE = 'indeterminate';


export default Ember.Component.extend(ColorMixin, {
  tagName: 'md-progress-circular',

  classNames: ['md-default-theme'],
  attributeBindings: ['value', 'mode:md-mode', 'circleStyle:style'],

  mode: Ember.computed('value', function() {
    var value = this.get('value');
    return Ember.isPresent(value) ? MODE_DETERMINATE : MODE_INDETERMINATE;
  }),

  spinnerClass: Ember.computed('mode', function() {
    const mode = this.get('mode');

    switch (mode) {
      case MODE_DETERMINATE:
      case MODE_INDETERMINATE:
        return `md-mode-${mode}`;
      default:
        return `ng-hide`;
    }
  }),

  diameter: BASE_DIAMETER,

  constants: Ember.inject.service(),
  util: Ember.inject.service(),

  clampedValue: Ember.computed('value', function() {
    const value = this.get('value');
    return Math.max(0, Math.min(value || 0, 100));
  }),

  circleStyle: Ember.computed('diameterRatio', function() {
    return Ember.String.htmlSafe(`${this.get('constants.CSS.TRANSFORM')}: scale(${this.get('diameterRatio')})`);
  }),

  gapStyle: Ember.computed('clampedValue', function() {
    const value = this.get('clampedValue');
    const borderBottomColor = (value <= 50) ? 'transparent !important' : '',
      transition = (value <= 50) ? '' : 'borderBottomColor 0.1s linear';

    var style = '';

    if (borderBottomColor) {
      style = `border-bottom-color: ${borderBottomColor}; `;
    }

    if (transition) {
      style = style + `${this.get('constants.CSS.TRANSITION')}: ${transition}`;
    }

    return Ember.String.htmlSafe(style);
  }),

  leftStyle: Ember.computed('mode', 'clampedValue', function() {
    if (this.get('mode') !== MODE_DETERMINATE) {
      return Ember.String.htmlSafe('');
    }
    const value = this.get('clampedValue');
    const transition = (value <= 50) ? 'transform 0.1s linear' : '',
      transform = this.get('util').supplant('rotate({0}deg)', [value <= 50 ? 135 : (((value - 50) / 50 * 180) + 135)]);

    var style = '';

    if (transition) {
      style = `${this.get('constants.CSS.TRANSITION')}: ${transition}; `;
    }

    if (transform) {
      style = style + `${this.get('constants.CSS.TRANSFORM')}: ${transform}`;
    }

    return Ember.String.htmlSafe(style);
  }),

  rightStyle: Ember.computed('mode', 'clampedValue', function() {
    if (this.get('mode') !== MODE_DETERMINATE) {
      return Ember.String.htmlSafe('');
    }
    const value = this.get('clampedValue');
    const transition = (value >= 50) ? 'transform 0.1s linear' : '',
      transform = this.get('util').supplant('rotate({0}deg)', [value >= 50 ? 45 : (value / 50 * 180 - 135)]);

    var style = '';

    if (transition) {
      style = `${this.get('constants.CSS.TRANSITION')}: ${transition}; `;
    }

    if (transform) {
      style = style + `${this.get('constants.CSS.TRANSFORM')}: ${transform}`;
    }

    return Ember.String.htmlSafe(style);
  }),

  diameterRatio: Ember.computed('md-diameter', function() {
    if (!this.get('md-diameter')) {
      return DEFAULT_SCALING;
    }

    const match = /([0-9]*)%/.exec(this.get('md-diameter'));
    const value = Math.max(0, (match && match[1] / 100) || parseFloat(this.get('md-diameter')));

    // should return ratio; DEFAULT_PROGRESS_SIZE === 100px is default size
    return (value > 1) ? value / DEFAULT_PROGRESS_SIZE : value;
  })

});
