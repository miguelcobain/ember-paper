import Ember from 'ember';

export default Ember.Component.extend({
  browserCompatibility: Ember.inject.service('browser-compatibility'),

  classNames: ['md-default-theme'],

  tagName: 'md-progress-circular',

  attributeBindings: ['value', 'md-mode'],

  mdDiameter: 48,

  scale: Ember.computed('mdDiameter', function() {
    return this.get('mdDiameter') / 48;
  }),

  clampedValue: Ember.computed('value', function() {

    var value = this.get('value');

    return Math.max(0, Math.min(value || 0, 100));

  }),

  circleStyle: Ember.computed('scale', function() {
    return Ember.String.htmlSafe(this.get('browserCompatibility.CSS.TRANSFORM') + ': ' + 'scale(' + this.get('scale').toString() + ')');
  })

});
