/**
 * @module ember-paper
 */
import Ember from 'ember';

import FocusableMixin from 'ember-paper/mixins/focusable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import FlexMixin from 'ember-paper/mixins/flex-mixin';

const { Component } = Ember;

/**
 * @class PaperSlider
 * @extends Ember.Component
 * @uses FocusableMixin
 * @uses ColorMixin
 * @uses FlexMixin
 */
export default Component.extend(FocusableMixin, FlexMixin, ColorMixin, {

  tagName: 'md-slider',

  attributeBindings: ['min', 'max', 'step', 'discrete:md-discrete', 'tabindex'],

  classNames: ['md-default-theme'],
  classNameBindings: ['isMinimum:md-min', 'active', 'dragging'],

  constants: Ember.inject.service(),

  min: 0,
  max: 100,
  step: 1,
  tabindex: 0,

  trackContainer: Ember.computed(function() {
    return this.$('.md-track-container');
  }),

  activeTrackStyle: Ember.computed('percent', function() {
    let percent = this.get('percent') || 0;
    return Ember.String.htmlSafe(`width: ${percent * 100}%`);
  }),

  thumbContainerStyle: Ember.computed('percent', function() {
    let percent = this.get('percent') || 0;
    return Ember.String.htmlSafe(`left: ${percent * 100}%`);
  }),

  isMinimum: Ember.computed('percent', 'min', function() {
    return this.get('percent') === this.get('min');
  }),

  percent: Ember.computed('value', 'min', 'max', function() {
    let min = parseInt(this.get('min'), 10);
    let max = parseInt(this.get('max'), 10);

    return (this.get('value') - min) / (max - min);
  }),

  positionToPercent(x) {
    return Math.max(0, Math.min(1, (x - this.get('sliderDimensions.left')) / this.get('sliderDimensions.width')));
  },

  percentToValue(x) {
    let min = parseInt(this.get('min'), 10);
    let max = parseInt(this.get('max'), 10);
    return (min + x * (max - min));
  },

  minMaxValidator(value) {
    let min = parseInt(this.get('min'), 10);
    let max = parseInt(this.get('max'), 10);
    return Math.max(min, Math.min(max, value));
  },

  stepValidator(value) {
    let step = parseInt(this.get('step'), 10);
    return Math.round(value / step) * step;
  },

  active: false,
  dragging: false,

  sliderDimensions: Ember.computed(function() {
    return this.get('trackContainer')[0].getBoundingClientRect();
  }),

  setValueFromEvent(event) {
    // let exactVal = this.percentToValue(this.positionToPercent(event.deltaX || event.clientX));
    let exactVal = this.percentToValue(this.positionToPercent(event.clientX || event.originalEvent.touches[0].clientX));
    let closestVal = this.minMaxValidator(this.stepValidator(exactVal));

    this.set('value', closestVal);
  },

  down(event) {
    if (this.get('disabled')) {
      return;
    }

    this.set('active', true);
    this.set('dragging', true);
    this.$().focus();

    this.get('sliderDimensions');

    this.setValueFromEvent(event);
  },

  up(event) {
    if (this.get('disabled')) {
      return;
    }

    event.stopPropagation();

    this.beginPropertyChanges();
    this.set('active', false);
    this.set('dragging', false);
    this.endPropertyChanges();
  },

  move(event) {
    if (this.get('disabled') || !this.get('dragging')) {
      return;
    }

    this.setValueFromEvent(event);

  },

  keyDown(event) {
    if (this.get('disabled')) {
      return;
    }

    let changeAmount, newValue;

    if (event.keyCode === this.get('constants.KEYCODE.LEFT_ARROW')) {
      changeAmount = parseInt(this.get('step')) * -1;
    } else if (event.keyCode === this.get('constants.KEYCODE.RIGHT_ARROW')) {
      changeAmount = parseInt(this.get('step'));
    }

    if (changeAmount) {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        changeAmount *= 4;
      }

      newValue = this.get('value') + changeAmount;

      this.set('value', this.minMaxValidator(newValue));

      event.preventDefault();
      event.stopPropagation();
    }
  }

});
