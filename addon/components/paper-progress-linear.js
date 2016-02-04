import Ember from 'ember';
import ColorMixin from 'ember-paper/mixins/color-mixin';
const {inject, computed, Component, isPresent} = Ember;


function makeTransform(value) {
  var scale = value / 100;
  var translateX = (value - 100) / 2;
  return 'translateX(' + translateX.toString() + '%) scale(' + scale.toString() + ', 1)';
}

const MODE_DETERMINATE = "determinate",
  MODE_INDETERMINATE = "indeterminate",
  MODE_BUFFER = "buffer",
  MODE_QUERY = "query";

export default Component.extend(ColorMixin, {
  tagName: 'md-progress-linear',

  attributeBindings: ['mode:md-mode', 'buffer-value:md-buffer-value'],
  classNames: ['md-default-theme'],

  constants: inject.service(),

  init() {
    this._super(...arguments);
    this.setupTransforms();
  },

  mode: computed('value', function() {
    var value = this.get('value');
    var bufferValue = this.get('buffer-value');

    if (isPresent(value)) {
      if (isPresent(bufferValue)) {
        return 'buffer';
      } else {
        return 'determinate';
      }
    } else {
      return 'indeterminate';
    }
  }),

  queryMode: computed('mode', function() {
    let mode = this.get('mode');

    switch (mode) {
      case MODE_QUERY:
      case MODE_BUFFER:
      case MODE_DETERMINATE:
      case MODE_INDETERMINATE:
        return `md-mode-${this.get('mode')}`;
      default:
        return ``;
    }


  }),

  transforms: new Array(101),

  setupTransforms() {
    for (var i = 0; i < 101; i++) {
      this.transforms[i] = makeTransform(i);
    }
  },

  bar1Style: computed('clampedBufferValue', function() {
    return Ember.String.htmlSafe(this.get('constants.CSS.TRANSFORM') + ': ' + this.transforms[this.get('clampedBufferValue')]);
  }),

  bar2Style: computed('clampedValue', function() {

    if (this.get('mode') === 'query') {
      return Ember.String.htmlSafe('');
    }

    return Ember.String.htmlSafe(this.get('constants.CSS.TRANSFORM') + ': ' + this.transforms[this.get('clampedValue')]);
  }),

  clampedValue: computed('value', function() {
    var value = this.get('value');
    if (value > 100) {
      return 100;
    }

    if (value < 0) {
      return 0;
    }

    return Math.ceil(value || 0);
  }),

  clampedBufferValue: computed('buffer-value', function() {
    var value = this.get('buffer-value');
    if (value > 100) {
      return 100;
    }

    if (value < 0) {
      return 0;
    }
    return Math.ceil(value || 0);
  })

});
