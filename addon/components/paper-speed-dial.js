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

  didInsertElement() {
    this._super(...arguments);
    this.element.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
  },
  willDestroyElement() {
    this._super(...arguments);
    this.element.removeEventListener('mouseenter', this.handleMouseEnter.bind(this));
    this.element.removeEventListener('mouseleave', this.handleMouseLeave.bind(this));
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
