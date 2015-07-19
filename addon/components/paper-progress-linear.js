import Ember from 'ember';
import ColorMixin from 'ember-paper/mixins/color-mixin';

function makeTransform(value) {
  var scale = value / 100;
  var translateX = (value - 100) / 2;
  return 'translateX(' + translateX.toString() + '%) scale(' + scale.toString() + ', 1)';
}

export default Ember.Component.extend(ColorMixin, {
  tagName: 'md-progress-linear',

  attributeBindings: ['mode:md-mode', 'buffer-value:md-buffer-value'],
  classNames: ['md-default-theme'],

  constants: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.setupTransforms();
  },

  mode: 'indeterminate',

  transforms: new Array(101),

  setupTransforms() {
    for (var i = 0; i < 101; i++) {
      this.transforms[i] = makeTransform(i);
    }
  },

  bar1Style: Ember.computed('clampedBufferValue', function() {
    return new Ember.Handlebars.SafeString(this.get('constants.CSS.TRANSFORM') + ': ' + this.transforms[this.get('clampedBufferValue')]);
  }),

  bar2Style: Ember.computed('clampedValue', function() {

    if (this.get('mode') === 'query') {
      return new Ember.Handlebars.SafeString('');
    }

    return new Ember.Handlebars.SafeString(this.get('constants.CSS.TRANSFORM') + ': ' + this.transforms[this.get('clampedValue')]);
  }),

  clampedValue: Ember.computed('value', function() {

    var value = this.get('value');
    if (value > 100) {
      return 100;
    }

    if (value < 0) {
      return 0;
    }

    return Math.ceil(value || 0);
  }),

  clampedBufferValue: Ember.computed('buffer-value', function() {
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
