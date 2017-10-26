import Ember from 'ember';
import layout from '../templates/components/paper-speed-dial';
const { Component, computed, run } = Ember;

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

  didRender() {
    this._super(...arguments);
    run.next(() => {
      if (!this.isDestroyed && !this.isDestroying) {
        this.set('elementDidRender', true);
      }
    });
  },

  mouseEnter() {
    this.sendAction('onMouseEnter');
  },

  mouseLeave() {
    this.sendAction('onMouseLeave');
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
      this.sendAction('onToggle', value);
    } else {
      this.set('open', value);
    }
  }
});
