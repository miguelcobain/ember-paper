/**
 * @module ember-paper
 */
import { or } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import layout from '../templates/components/paper-dialog';
import { invokeAction } from 'ember-invoke-action';

/**
 * @class PaperDialog
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: '',

  escapeToClose: true,
  focusOnOpen: true,
  opaque: true,

  // Calculate a default that is always valid for the parent of the backdrop.
  wormholeSelector: '#paper-wormhole',
  defaultedParent: or('parent', 'wormholeSelector'),

  // Calculate a default that is always valid where the opening transition should originate.
  defaultedOpenFrom: or('openFrom', 'origin', 'parent'),

  // Calculate a default that is always valid where the closing transition should terminate.
  defaultedCloseTo: or('closeTo', 'origin', 'parent'),

  // Calculate the id of the wormhole destination, setting it if need be. The
  // id is that of the 'parent', if provided, or 'paper-wormhole' if not.
  destinationId: computed('defaultedParent', function() {
    let config = getOwner(this).resolveRegistration('config:environment');

    if (config.environment === 'test' && !this.get('parent')) {
      return '#ember-testing';
    }
    let parent = this.get('defaultedParent');
    let parentEle = typeof parent === 'string' ? document.querySelector(parent) : parent;
    // If the parentEle isn't found, assume that it is an id, but that the DOM doesn't
    // exist yet. This only happens during integration tests or if entire application
    // route is a dialog.
    if (typeof parent === 'string' && parent.charAt(0) === '#') {
      return `#${parent.substring(1)}`;
    } else {
      let id = parentEle.getAttribute('id');
      if (!id) {
        id = `${this.elementId}-parent`;
        parentEle.setAttribute('id', id);
      }
      return `#${id}`;
    }

  }),

  // Find the element referenced by destinationId
  destinationEl: computed('destinationId', function() {
    return document.querySelector(this.get('destinationId'));
  }),

  didInsertElement() {
    this._super(...arguments);
    if (this.get('escapeToClose')) {

      this._destinationEle = document.querySelector(this.get('destinationId'));
      this._onKeyDown = (e) => {
        if (e.keyCode === 27 && this.get('onClose')) {
          invokeAction(this, 'onClose');
        }
      };
      this._destinationEle.addEventListener('keydown', this._onKeyDown);

    }
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.get('escapeToClose') && this._destinationEle) {
      this._destinationEle.removeEventListener('keydown', this._onKeyDown);
      this._onKeyDown = null;
    }
  },

  actions: {
    outsideClicked() {
      if (this.get('clickOutsideToClose') && this.get('onClose')) {
        invokeAction(this, 'onClose');
      }
    }
  }
});

