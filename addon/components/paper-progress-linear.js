/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-progress-linear';
import ColorMixin from 'ember-paper/mixins/color-mixin';

const { inject, computed, Component, isPresent, String: { htmlSafe } } = Ember;

function makeTransform(value) {
  let scale = value / 100;
  let translateX = (value - 100) / 2;
  return `translateX(${translateX.toString()}%) scale(${scale.toString()}, 1)`;
}

const MODE_DETERMINATE = 'determinate';
const MODE_INDETERMINATE = 'indeterminate';
const MODE_BUFFER = 'buffer';
const MODE_QUERY = 'query';

/**
 * @class PaperProgressLinear
 * @extends Ember.Component
 * @uses ColorMixin
 */
export default Component.extend(ColorMixin, {
  layout,
  tagName: 'md-progress-linear',

  attributeBindings: ['mode:md-mode', 'bufferValue:md-buffer-value'],
  classNames: ['md-default-theme'],

  constants: inject.service(),

  init() {
    this._super(...arguments);
    this.setupTransforms();
  },

  mode: computed('value', function() {
    let value = this.get('value');
    let bufferValue = this.get('bufferValue');

    if (isPresent(value)) {
      if (isPresent(bufferValue)) {
        return MODE_BUFFER;
      } else {
        return MODE_DETERMINATE;
      }
    } else {
      return MODE_INDETERMINATE;
    }
  }),

  queryModeClass: computed('mode', function() {
    let mode = this.get('mode');

    switch (mode) {
      case MODE_QUERY:
      case MODE_BUFFER:
      case MODE_DETERMINATE:
      case MODE_INDETERMINATE:
        return `md-mode-${mode}`;
      default:
        return '';
    }
  }),

  transforms: new Array(101),

  setupTransforms() {
    for (let i = 0; i < 101; i++) {
      this.transforms[i] = makeTransform(i);
    }
  },

  bar1Style: computed('clampedBufferValue', function() {
    return htmlSafe(`${this.get('constants.CSS.TRANSFORM')}: ${this.transforms[this.get('clampedBufferValue')]}`);
  }),

  bar2Style: computed('clampedValue', 'mode', function() {
    if (this.get('mode') === MODE_QUERY) {
      return htmlSafe('');
    }

    return htmlSafe(`${this.get('constants.CSS.TRANSFORM')}: ${this.transforms[this.get('clampedValue')]}`);
  }),

  clampedValue: computed('value', function() {
    let value = this.get('value');
    return Math.max(0, Math.min(value || 0, 100));
  }),

  clampedBufferValue: computed('bufferValue', function() {
    let value = this.get('bufferValue');
    return Math.max(0, Math.min(value || 0, 100));
  })

});
