import Ember from 'ember';
import ColorMixin from 'ember-paper/mixins/color-mixin';

var BASE_DIAMETER = 48;

export default Ember.Component.extend(ColorMixin, {
  tagName: 'md-progress-circular',

  classNames: ['md-default-theme'],
  attributeBindings: ['value', 'mode:md-mode'],

  diameter: BASE_DIAMETER,

  constants: Ember.inject.service(),

  scale: Ember.computed('diameter', function() {
    return this.get('diameter') / BASE_DIAMETER;
  }),

  clampedValue: Ember.computed('value', function() {

    var value = this.get('value');

    return Math.max(0, Math.min(value || 0, 100));

  }),

  circleStyle: Ember.computed('scale', function() {
    return Ember.String.htmlSafe(this.get('constants.CSS.TRANSFORM') + ': ' + 'scale(' + this.get('scale').toString() + ')');
  })

});
