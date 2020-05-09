import Component from '@ember/component';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import layout from '../templates/components/paper-speed-dial';
import { invokeAction } from 'ember-invoke-action';

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
    return `md-${this.get('animation')}`;
  }),

  direction: 'down',
  directionClass: computed('direction', function() {
    return `md-${this.get('direction')}`;
  }),

  shouldHideActions: computed('animation', 'elementDidRender', function() {
    return this.get('animation') === 'fling' && !this.get('elementDidRender');
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
    run.next(() => {
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
    this.changeOpenValue(!this.get('open'));
  },

  close() {
    this.changeOpenValue(false);
  },

  changeOpenValue(value) {
    // support non DDAU scenario
    if (this.get('onToggle')) {
      invokeAction(this, 'onToggle', value);
    } else {
      this.set('open', value);
    }
  }
});
