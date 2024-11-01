/* eslint-disable ember/no-classic-components, ember/no-get, ember/require-computed-property-dependencies */
/**
 * @module ember-paper
 */
import { inject as service } from '@ember/service';

import { computed } from '@ember/object';
import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import { htmlSafe } from '@ember/template';

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
 */
export default Component.extend({
  tagName: '',
  constants: service(),

  mode: computed('value', {
    get() {
      if (this._mode !== undefined) {
        return this._mode;
      }

      let value = this.value;
      let bufferValue = this.bufferValue;

      if (isPresent(value)) {
        if (isPresent(bufferValue)) {
          return MODE_BUFFER;
        } else {
          return MODE_DETERMINATE;
        }
      } else {
        return MODE_INDETERMINATE;
      }
    },
    set(key, value) {
      return (this._mode = value);
    },
  }),

  queryModeClass: computed('mode', function () {
    let mode = this.mode;
    if (
      [MODE_QUERY, MODE_BUFFER, MODE_DETERMINATE, MODE_INDETERMINATE].includes(
        mode
      )
    ) {
      return `md-mode-${mode}`;
    } else {
      return '';
    }
  }),

  bar1Style: computed('clampedBufferValue', function () {
    return htmlSafe(
      `${this.get('constants.CSS.TRANSFORM')}: ${makeTransform(
        this.clampedBufferValue
      )}`
    );
  }),

  bar2Style: computed('clampedValue', 'mode', function () {
    if (this.mode === MODE_QUERY) {
      return htmlSafe('');
    }

    return htmlSafe(
      `${this.get('constants.CSS.TRANSFORM')}: ${makeTransform(
        this.clampedValue
      )}`
    );
  }),

  clampedValue: computed('value', function () {
    let value = this.value;
    return Math.max(0, Math.min(value || 0, 100));
  }),

  clampedBufferValue: computed('bufferValue', function () {
    let value = this.bufferValue;
    return Math.max(0, Math.min(value || 0, 100));
  }),
});
