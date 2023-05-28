/* eslint-disable ember/no-classic-components, ember/require-tagless-components, ember/no-component-lifecycle-hooks */
import Component from '@ember/component';
import { computed } from '@ember/object';
import { next } from '@ember/runloop';
import layout from '../templates/components/paper-speed-dial';
import { invokeAction } from 'ember-paper/utils/invoke-action';

export default Component.extend({
  layout,
  tagName: 'md-fab-speed-dial',

  classNameBindings: [
    'directionClass', 'open:md-is-open', 'animationClass',
    'shouldHideActions:md-animations-waiting', 'hoverFull:md-hover-full'
  ],

  open: false,

  animation: 'fling',
  animationClass: computed('animation', function() {
    return `md-${this.animation}`;
  }),

  direction: 'down',
  directionClass: computed('direction', function() {
    return `md-${this.direction}`;
  }),

  shouldHideActions: computed('animation', 'elementDidRender', function() {
    return this.animation === 'fling' && !this.elementDidRender;
  }),

  _mouseEnterHandler: undefined,
  _mouseLeaveHandler: undefined,

  didInsertElement() {
    this._super(...arguments);

    this._mouseEnterHandler = this.handleMouseEnter.bind(this);
    this._mouseLeaveHandler = this.handleMouseLeave.bind(this);

    this.element.addEventListener('mouseenter', this._mouseEnterHandler);
    this.element.addEventListener('mouseleave', this._mouseLeaveHandler);
  },

  willDestroyElement() {
    this._super(...arguments);

    this.element.removeEventListener('mouseenter', this._mouseEnterHandler);
    this.element.removeEventListener('mouseleave', this._mouseLeaveHandler);

    this._mouseEnterHandler = undefined;
    this._mouseLeaveHandler = undefined;
  },

  didRender() {
    this._super(...arguments);
    next(() => {
      if (!this.isDestroyed && !this.isDestroying) {
        this.set('elementDidRender', true);
      }
    });
  },

  handleMouseEnter() {
    invokeAction(this, 'onMouseEnter');
  },

  handleMouseLeave() {
    invokeAction(this, 'onMouseLeave');
  },

  toggle() {
    this.changeOpenValue(!this.open);
  },

  close() {
    this.changeOpenValue(false);
  },

  changeOpenValue(value) {
    // support non DDAU scenario
    if (this.onToggle) {
      invokeAction(this, 'onToggle', value);
    } else {
      this.set('open', value);
    }
  }
});
