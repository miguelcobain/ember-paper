import Ember from 'ember';
import ColorMixin from 'ember-paper/mixins/color-mixin';

var BASE_DIAMETER = 48;

export default Ember.Component.extend(ColorMixin, {
  constants: Ember.inject.service(),

  classNames: ['md-default-theme'],

  tagName: 'md-progress-circular',

  attributeBindings: ['value', 'md-mode'],

  mdDiameter: BASE_DIAMETER,

  scale: Ember.computed('mdDiameter', function() {
    return this.get('mdDiameter') / BASE_DIAMETER;
  }),

  clampedValue: Ember.computed('value', function() {

    var value = this.get('value');

    return Math.max(0, Math.min(value || 0, 100));

  }),

  circleStyle: Ember.computed('scale', function() {
    return Ember.String.htmlSafe(this.get('constants.CSS.TRANSFORM') + ': ' + 'scale(' + this.get('scale').toString() + ')');
  })

});
