import { or } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import { htmlSafe } from '@ember/string';
import { getOwner } from '@ember/application';
import layout from '../templates/components/paper-tooltip';
import getParent from 'ember-paper/utils/get-parent';
import { supportsPassiveEventListeners } from 'ember-paper/utils/browser-features';

export default Component.extend({
  tagName: '',
  layout,

  position: 'bottom',

  wormholeSelector: '#paper-wormhole',
  defaultedParent: or('parent', 'wormholeSelector'),

  // Calculate the id of the wormhole destination, setting it if need be. The
  // id is that of the 'parent', if provided, or 'paper-wormhole' if not.
  destinationId: computed('defaultedParent', function() {
    let config = getOwner(this).resolveRegistration('config:environment');

    if (config.environment === 'test' && !this.get('parent')) {
      return '#ember-testing';
    }
    let parent = this.get('defaultedParent');
    let parentEle = typeof parent === 'string'
      ? document.querySelector(parent)
      : parent;
    // If the parent isn't found, assume that it is an id, but that the DOM doesn't
    // exist yet. This only happens during integration tests or if entire application
    // route is a dialog.
    if (typeof parent === 'string' && parent.charAt(0) === '#') {
      return `#${parent.substring(1)}`;
    } else {
      let { id } = parentEle;
      if (!id) {
        id = `${this.elementId}-parent`;
        parentEle.id = id;
      }
      return `#${id}`;
    }
  }),

  // Find the element referenced by destinationId
  destinationEl: computed('destinationId', function() {
    return document.querySelector(this.get('destinationId'));
  }),

  zIndex: 100,

  containerStyle: computed('zIndex', function() {
    return htmlSafe(`pointer-events: none; z-index: ${this.get('zIndex')};`);
  }),

  anchorElement: computed('attachTo', function() {
    let attachTo = this.get('attachTo');
    if (attachTo) {
      return document.querySelector(attachTo);
    } else {
      return getParent(this);
    }
  }),

  didInsertElement() {
    this._super(...arguments);
    let anchorElement = this.get('anchorElement');

    let leaveHandler = () => {
      if (!this.isDestroyed) {
        this.set('hideTooltip', true);
        run.later(() => {
          if (!this.isDestroyed) {
            this.set('renderTooltip', false);
          }
        }, 150);

        anchorElement.addEventListener('blur', leaveHandler);
        anchorElement.addEventListener('touchcancel', leaveHandler);
        anchorElement.addEventListener('mouseleave', leaveHandler);
      }
    };

    let enterEventHandler = () => {
      anchorElement.addEventListener('blur', leaveHandler);
      anchorElement.addEventListener('touchcancel', leaveHandler);
      anchorElement.addEventListener('mouseleave', leaveHandler);

      if (!this.isDestroyed) {
        this.set('renderTooltip', true);
        this.set('hideTooltip', false);
      }
    };

    anchorElement.addEventListener('focus', enterEventHandler);
    anchorElement.addEventListener('mouseenter', enterEventHandler);
    anchorElement.addEventListener('touchstart',
      enterEventHandler,
      supportsPassiveEventListeners ? { passive: true } : false);

    window.addEventListener('scroll', leaveHandler);
    window.addEventListener('blur', leaveHandler);
    window.addEventListener('resize', leaveHandler);
    window.addEventListener('orientationchange', leaveHandler);
    this.leaveHandler = leaveHandler;
  },

  willDestroyElement() {
    this._super(...arguments);
    window.removeEventListener('scroll', this.leaveHandler);
    window.removeEventListener('blur', this.leaveHandler);
    window.removeEventListener('resize', this.leaveHandler);
    window.removeEventListener('orientationchange', this.leaveHandler);
  }
});
