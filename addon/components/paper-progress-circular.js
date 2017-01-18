/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-progress-circular';
import ColorMixin from 'ember-paper/mixins/color-mixin';

const { Component, computed, isPresent, inject, String: { htmlSafe } } = Ember;

const DEFAULT_PROGRESS_SIZE = 100;
const DEFAULT_SCALING = 0.5;

const MODE_DETERMINATE = 'determinate';
const MODE_INDETERMINATE = 'indeterminate';

/**
 * @class PaperProgressCircular
 * @extends Ember.Component
 * @uses ColorMixin
 */
export default Component.extend(ColorMixin, {
  layout,
  tagName: 'md-progress-circular',
  classNames: ['md-default-theme'],
  attributeBindings: ['value', 'mode:md-mode', 'circleStyle:style'],

  constants: inject.service(),

  mode: computed('value', function() {
    let value = this.get('value');
    return isPresent(value) ? MODE_DETERMINATE : MODE_INDETERMINATE;
  }),

  spinnerClass: computed('mode', function() {
    let mode = this.get('mode');
    return mode === MODE_DETERMINATE || mode === MODE_INDETERMINATE ? `md-mode-${mode}` : 'ng-hide';
  }),

  clampedValue: computed('value', function() {
    let value = this.get('value');
    return Math.max(0, Math.min(value || 0, 100));
  }),

  circleStyle: computed('diameterRatio', function() {
    let diameterRatio = this.get('diameterRatio');

    let width = `width: ${100 * diameterRatio}px`;
    let height = `height: ${100 * diameterRatio}px`;

    return htmlSafe([width, height].join(';'));
  }),

  scaleWrapperStyle: computed('diameterRatio', function() {
    let diameterRatio = this.get('diameterRatio');

    let transform = `${this.get('constants.CSS.TRANSFORM')}: translate(-50%, -50%) scale(${diameterRatio})`;

    return htmlSafe(transform);
  }),

  diameterRatio: computed('diameter', function() {
    let diameter = this.get('diameter');
    if (!diameter) {
      return DEFAULT_SCALING;
    }

    let match = /([0-9]*)%/.exec(diameter);
    let value = Math.max(0, (match && match[1] / 100) || parseFloat(diameter));

    return (value > 1) ? value / DEFAULT_PROGRESS_SIZE : value;
  }),

  gapStyle: computed('mode', 'clampedValue', function() {
    if (this.get('mode') !== MODE_DETERMINATE) {
      return htmlSafe('');
    }

    let value = this.get('clampedValue');
    let borderBottomColor = (value <= 50) ? 'border-bottom-color: transparent !important' : null;
    let transition = (value <= 50) ? null : `${this.get('constants.CSS.TRANSITION')}: borderBottomColor 0.1s linear`;

    return htmlSafe([borderBottomColor, transition].filter((i) => !!i).join(';'));
  }),

  leftStyle: computed('mode', 'clampedValue', function() {
    if (this.get('mode') !== MODE_DETERMINATE) {
      return htmlSafe('');
    }

    let value = this.get('clampedValue');
    let transition = (value <= 50) ? `${this.get('constants.CSS.TRANSITION')}: transform 0.1s linear` : '';
    let transform = `${this.get('constants.CSS.TRANSFORM')}: rotate(${value <= 50 ? 135 : (((value - 50) / 50 * 180) + 135)}deg)`;

    return htmlSafe([transition, transform].filter((i) => !!i).join(';'));
  }),

  rightStyle: computed('mode', 'clampedValue', function() {
    if (this.get('mode') !== MODE_DETERMINATE) {
      return htmlSafe('');
    }

    let value = this.get('clampedValue');
    let transition = (value >= 50) ? `${this.get('constants.CSS.TRANSITION')}: transform 0.1s linear` : '';
    let transform = `${this.get('constants.CSS.TRANSFORM')}: rotate(${value >= 50 ? 45 : (value / 50 * 180 - 135)}deg)`;

    return htmlSafe([transition, transform].filter((i) => !!i).join(';'));
  })

});
