/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-slider';
import FocusableMixin from 'ember-paper/mixins/focusable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
const { Component, computed, inject, run, String: { htmlSafe } } = Ember;
/* global Hammer */

/**
 * @class PaperSlider
 * @extends Ember.Component
 * @uses FocusableMixin
 * @uses ColorMixin
 */
export default Component.extend(FocusableMixin, ColorMixin, {
  layout,
  tagName: 'md-slider',

  attributeBindings: ['min', 'max', 'step', 'discrete:md-discrete', 'tabindex'],

  classNames: ['md-default-theme'],
  classNameBindings: ['isMinimum:md-min', 'active', 'dragging'],

  constants: inject.service(),

  min: 0,
  max: 100,
  step: 1,
  tabindex: 0,

  didInsertElement() {
    this._super(...arguments);

    this._setupSlider();
  },

  _setupSlider() {
    let thumbContainer = this.$('.md-thumb-container').get(0);
    let sliderHammer = new Hammer(thumbContainer);
    this._thumbContainerHammer = sliderHammer;

    // Enable dragging the slider
    sliderHammer.get('pan').set({ threshold: 1 });
    sliderHammer.on('panstart', run.bind(this, this._dragStart))
      .on('panmove', run.bind(this, this._drag))
      .on('panend', run.bind(this, this._dragEnd));
  },

  activeTrackStyle: computed('percent', function() {
    let percent = this.get('percent') || 0;
    return htmlSafe(`width: ${percent * 100}%`);
  }),

  thumbContainerStyle: computed('percent', function() {
    let percent = this.get('percent') || 0;
    return htmlSafe(`left: ${percent * 100}%`);
  }),

  isMinimum: computed('percent', 'min', function() {
    return this.get('percent') === this.get('min');
  }),

  percent: computed('value', 'min', 'max', function() {
    let min = parseInt(this.get('min'), 10);
    let max = parseInt(this.get('max'), 10);

    return (this.get('value') - min) / (max - min);
  }),

  positionToPercent(x) {
    let { left, width } = this.sliderDimensions();
    return Math.max(0, Math.min(1, (x - left) / width));
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
  enabled: computed.not('disabled'),

  sliderDimensions() {
    return this.$('.md-track-container').get(0).getBoundingClientRect();
  },

  click(event) {
    if (this.get('disabled')) {
      return;
    }

    this.setValueFromEvent(event);
  },

  setValueFromEvent(event) {
    let exactVal = this.percentToValue(this.positionToPercent(event.clientX || event.srcEvent.clientX));
    let closestVal = this.minMaxValidator(this.stepValidator(exactVal));

    this.sendAction('onChange', closestVal);
  },

  _dragStart(event) {
    if (this.get('disabled')) {
      return;
    }

    this.set('active', true);
    this.set('dragging', true);
    this.$().focus();

    this.setValueFromEvent(event);
  },

  _dragEnd() {
    if (this.get('disabled')) {
      return;
    }

    this.beginPropertyChanges();
    this.set('active', false);
    this.set('dragging', false);
    this.endPropertyChanges();
  },

  _drag(event) {
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

      this.sendAction('onChange', this.minMaxValidator(newValue));

      event.preventDefault();
      event.stopPropagation();
    }
  }

});
