/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-slider';
import FocusableMixin from 'ember-paper/mixins/focusable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import clamp from 'ember-paper/utils/clamp';
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
  classNameBindings: ['isMinimum:md-min', 'active:md-active', 'dragging:md-dragging'],

  constants: inject.service(),

  min: 0,
  max: 100,
  step: 1,
  tabindex: 0,

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
    let min = parseFloat(this.get('min'), 10);
    let max = parseFloat(this.get('max'), 10);

    return clamp((this.get('value') - min) / (max - min), 0, 1);
  }),

  didInsertElement() {
    this._super(...arguments);
    if (!this.get('disabled')) {
      this._setupHammer();
    }
  },

  didUpdateAttrs() {
    this._super(...arguments);

    if (!this.get('disabled') && !this._hammer) {
      // if it is enabled and we didn't init hammer yet
      this._setupHammer();
    } else if (this.get('disabled') && this._hammer) {
      // if it is disabled and we did init hammer already
      this._teardownHammer();
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this._hammer) {
      this._teardownHammer();
    }
  },

  _setupHammer() {
    // Enable dragging the slider
    let containerManager = new Hammer.Manager(this.element);
    let pan = new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 10 });
    containerManager.add(pan);
    let tap = new Hammer.Tap();
    containerManager.add(tap);

    containerManager.on('panstart', run.bind(this, this.dragStart))
      .on('panmove', run.bind(this, this.drag))
      .on('panend', run.bind(this, this.dragEnd))
      .on('tap', run.bind(this, this.tap));

    this._hammer = containerManager;
  },

  _teardownHammer() {
    this._hammer.destroy();
    delete this._hammer;
  },

  positionToPercent(x) {
    let { left, width } = this.sliderDimensions();
    return Math.max(0, Math.min(1, (x - left) / width));
  },

  percentToValue(x) {
    let min = parseFloat(this.get('min'), 10);
    let max = parseFloat(this.get('max'), 10);
    return (min + x * (max - min));
  },

  minMaxValidator(value) {
    let min = parseFloat(this.get('min'), 10);
    let max = parseFloat(this.get('max'), 10);
    return Math.max(min, Math.min(max, value));
  },

  stepValidator(value) {
    let step = parseFloat(this.get('step'), 10);
    return Math.round(value / step) * step;
  },

  active: false,
  dragging: false,
  enabled: computed.not('disabled'),

  sliderDimensions() {
    return this.element.querySelector('.md-track-container').getBoundingClientRect();
  },

  setValueFromEvent(value) {
    let exactVal = this.percentToValue(this.positionToPercent(value));
    let closestVal = this.minMaxValidator(this.stepValidator(exactVal));

    this.sendAction('onChange', closestVal);
  },

  tap(event) {
    if (this.get('disabled')) {
      return;
    }

    this.setValueFromEvent(event.center.x);
  },

  dragStart(event) {
    if (this.get('disabled')) {
      return;
    }

    this.set('active', true);
    this.set('dragging', true);
    this.element.focus();

    this.setValueFromEvent(event.center.x);
  },

  drag(event) {
    if (this.get('disabled') || !this.get('dragging')) {
      return;
    }

    this.setValueFromEvent(event.center.x);
  },

  dragEnd() {
    if (this.get('disabled')) {
      return;
    }

    this.setProperties({
      active: false,
      dragging: false
    });
  },

  keyDown(event) {
    if (this.get('disabled')) {
      return;
    }

    let changeAmount, newValue;

    if (event.keyCode === this.get('constants.KEYCODE.LEFT_ARROW')) {
      changeAmount = parseFloat(this.get('step')) * -1;
    } else if (event.keyCode === this.get('constants.KEYCODE.RIGHT_ARROW')) {
      changeAmount = parseFloat(this.get('step'));
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
