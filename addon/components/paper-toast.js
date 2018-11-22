/**
 * @module ember-paper
 */
import { inject as service } from '@ember/service';

import { or } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import { guidFor } from '@ember/object/internals';
import { getOwner } from '@ember/application';
import layout from '../templates/components/paper-toast';
import { invokeAction } from 'ember-invoke-action';

/**
 * @class PaperToast
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: '',
  escapeToClose: false,
  swipeToClose: true,
  capsule: false,
  duration: 3000,

  position: 'bottom left',

  left: computed('position', function() {
    let [, x] = this.get('position').split(' ');
    return x === 'left';
  }),

  top: computed('position', function() {
    let [y] = this.get('position').split(' ');
    return y === 'top';
  }),

  // Calculate a default that is always valid for the parent of the backdrop.
  wormholeSelector: '#paper-toast-fab-wormhole',
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
        id = `${this.uniqueId}-parent`;
        parentEle.id = id;
      }
      return `#${id}`;
    }
  }),

  // Find the element referenced by destinationId
  destinationEl: computed('destinationId', function() {
    return document.querySelector(this.get('destinationId'));
  }),

  constants: service(),

  _destroyMessage() {
    if (!this.isDestroyed) {
      invokeAction(this, 'onClose');
    }
  },

  init() {
    this._super(...arguments);
    this.uniqueId = guidFor(this);
  },

  willInsertElement() {
    this._super(...arguments);
    document.querySelector(this.get('destinationId')).classList.add('md-toast-animating');
  },

  didInsertElement() {
    this._super(...arguments);

    if (this.get('duration') !== false) {
      run.later(this, '_destroyMessage', this.get('duration'));
    }

    if (this.get('escapeToClose')) {
      // Adding Listener to body tag, FIXME
      this._escapeToClose = run.bind(this, (e) => {
        if (e.keyCode === this.get('constants.KEYCODE.ESCAPE') && this.get('onClose')) {
          this._destroyMessage();
        }
      });
      document.body.addEventListener('keydown', this._escapeToClose);
    }

    let y = this.get('top') ? 'top' : 'bottom';

    document.querySelector(this.get('destinationId')).classList.add(`md-toast-open-${y}`);
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.get('escapeToClose')) {
      document.body.removeEventListener('keydown', this._escapeToClose);
      this._escapeToClose = null;
    }

    let y = this.get('top') ? 'top' : 'bottom';
    document.querySelector(this.get('destinationId')).classList.remove(`md-toast-open-${y}`, 'md-toast-animating');
  },

  swipeAction()  {
    if (this.get('swipeToClose')) {
      invokeAction(this, 'onClose');
    }
  }
});
