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
    if ([MODE_QUERY, MODE_BUFFER, MODE_DETERMINATE, MODE_INDETERMINATE].includes(mode)) {
      return `md-mode-${mode}`;
    } else {
      return '';
    }
  }),

  bar1Style: computed('clampedBufferValue', function() {
    return htmlSafe(`${this.get('constants.CSS.TRANSFORM')}: ${makeTransform(this.get('clampedBufferValue'))}`);
  }),

  bar2Style: computed('clampedValue', 'mode', function() {
    if (this.get('mode') === MODE_QUERY) {
      return htmlSafe('');
    }

    return htmlSafe(`${this.get('constants.CSS.TRANSFORM')}: ${makeTransform(this.get('clampedValue'))}`);
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
