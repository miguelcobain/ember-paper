/**
 * @module ember-paper
 */
import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { bind } from '@ember/runloop';
import { htmlSafe } from '@ember/string';
import template from './template';
import clamp from 'ember-paper/utils/clamp';
import { tagName, layout } from '@ember-decorators/component';

/* global Hammer */

/**
 * @class PaperSlider
 * @extends Ember.Component
 */
@tagName('')
@layout(template)
class PaperSlider extends Component {

  min = 0;
  max = 100;
  step = 1;
  tabindex = 0;

  active = false;
  dragging = false;
  focused = false;

  element = null;

  @computed('value', 'min', 'max')
  get percent() {
    let min = parseFloat(this.min, 10);
    let max = parseFloat(this.max, 10);

    return clamp((this.value - min) / (max - min), 0, 1);
  }

  @computed('percent')
  get activeTrackStyle() {
    let percent = this.percent || 0;
    return htmlSafe(`width: ${percent * 100}%`);
  }

  @computed('percent')
  get thumbContainerStyle() {
    let percent = this.percent || 0;
    return htmlSafe(`left: ${percent * 100}%`);
  }

  @computed('percent', 'min')
  get isMinimum() {
    return this.percent === this.min;
  }

  @action
  onDidInsert(element) {
    this.element = element;
    if (!this.disabled) {
      this._setupHammer();
    }
  }

  @action
  onDidUpdate() {
    if (!this.disabled && !this._hammer) {
      // if it is enabled and we didn't init hammer yet
      this._setupHammer();
    } else if (this.disabled && this._hammer) {
      // if it is disabled and we did init hammer already
      this._teardownHammer();
    }
  }

  @action
  onWillDestroy() {
    if (this._hammer) {
      this._teardownHammer();
    }
  }

  _setupHammer() {
    // Enable dragging the slider
    let containerManager = new Hammer.Manager(this.element);
    let pan = new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 10 });
    containerManager.add(pan);
    let tap = new Hammer.Tap();
    containerManager.add(tap);

    containerManager
      .on('panstart', bind(this, this.onDragStart))
      .on('panmove', bind(this, this.onDrag))
      .on('panend', bind(this, this.onDragEnd))
      .on('tap', bind(this, this.onTap));

    this._hammer = containerManager;
  }

  _teardownHammer() {
    this._hammer.destroy();
    delete this._hammer;
  }

  positionToPercent(x) {
    let { left, width } = this.sliderDimensions();
    return Math.max(0, Math.min(1, (x - left) / width));
  }

  percentToValue(x) {
    let min = parseFloat(this.min, 10);
    let max = parseFloat(this.max, 10);
    return (min + x * (max - min));
  }

  minMaxValidator(value) {
    let min = parseFloat(this.min, 10);
    let max = parseFloat(this.max, 10);
    return Math.max(min, Math.min(max, value));
  }

  stepValidator(value) {
    let step = parseFloat(this.step, 10);
    return Math.round(value / step) * step;
  }

  sliderDimensions() {
    return this.element.querySelector('.md-track-container').getBoundingClientRect();
  }

  setValueFromEvent(value) {
    let exactVal = this.percentToValue(this.positionToPercent(value));
    let closestVal = this.minMaxValidator(this.stepValidator(exactVal));

    if (this.onChange) {
      this.onChange(closestVal);
    }
  }

  onTap(event) {
    if (this.disabled) {
      return;
    }

    this.setValueFromEvent(event.center.x);
  }

  onDragStart(event) {
    if (this.disabled) {
      return;
    }

    this.set('active', true);
    this.set('dragging', true);
    this.element.focus();

    this.setValueFromEvent(event.center.x);
  }

  onDrag(event) {
    if (this.disabled || !this.dragging) {
      return;
    }

    this.setValueFromEvent(event.center.x);
  }

  onDragEnd() {
    if (this.disabled) {
      return;
    }

    this.set('active', false);
    this.set('dragging', false);
  }

  @action
  handleKeyDown(event) {
    if (this.disabled) {
      return;
    }

    let changeAmount, newValue;

    if (['ArrowLeft', 'Left'].includes(event.key)) {
      changeAmount = parseFloat(this.step) * -1;
    } else if (['ArrowRight', 'Right'].includes(event.key)) {
      changeAmount = parseFloat(this.step);
    }

    if (changeAmount) {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        changeAmount *= 4;
      }

      newValue = this.value + changeAmount;

      if (this.onChange) {
        this.onChange(this.minMaxValidator(newValue));
      }

      event.preventDefault();
      event.stopPropagation();
    }
  }

  @action
  handleFocusIn() {
    if (!this.disabled) {
      this.set('focused', true);
    }
  }

  @action
  handleFocusOut() {
    this.set('focused', false);
  }

}

export default PaperSlider;
