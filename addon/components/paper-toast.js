/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-toast';

const { $, Component, computed, inject, testing, run } = Ember;
/**
 * @class PaperToast
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'div',
  escapeToClose: true,
  capsule: false,
  hideDelay: 3000,

  position: 'bottom left',

  left: computed('position', function() {
    let [, x] = this.get('position').split(' ');
    return x === 'left';
  }),

  top: computed('position', function() {
    let [y] = this.get('position').split(' ');
    return y === 'top';
  }),

  classNameBindings: ['capsule:md-capsule'],

  // Calculate a default that is always valid for the parent of the backdrop.
  wormholeSelector: '#paper-toast-fab-wormhole',
  defaultedParent: computed.or('parent', 'wormholeSelector'),

  // Calculate the id of the wormhole destination, setting it if need be. The
  // id is that of the 'parent', if provided, or 'paper-wormhole' if not.
  destinationId: computed('defaultedParent', function() {
    if (testing && !this.get('parent')) {
      return 'ember-testing';
    }
    let parent = this.get('defaultedParent');
    let $parent = $(parent);
    // If the parent isn't found, assume that it is an id, but that the DOM doesn't
    // exist yet. This only happens during integration tests or if entire application
    // route is a dialog.
    if ($parent.length === 0 && parent.charAt(0) === '#') {
      return parent.substring(1);
    } else {
      let id = $parent.attr('id');
      if (!id) {
        id = `${this.elementId}-parent`;
        $parent.get(0).id = id;
      }
      return id;
    }
  }),

  constants: inject.service(),

  _destroyMessage() {
    this.sendAction('onClose');
  },

  willInsertElement() {
    this._super(...arguments);
    $(`#${this.get('destinationId')}`).addClass(`md-toast-animating`);
  },

  didInsertElement() {
    this._super(...arguments);

    if (this.get('hideDelay') !== false) {
      run.later(this, '_destroyMessage', this.get('hideDelay'));
    }

    if (this.get('escapeToClose')) {
      // Adding Listener to body tag, FIXME
      $('body').on(`keydown.${this.elementId}`, (e) => {
        if (e.keyCode === this.get('constants.KEYCODE.ESCAPE') && this.get('onClose')) {
          this._destroyMessage();
        }
      });
    }

    let y = this.get('top') ? 'top' : 'bottom';
    $(`#${this.get('destinationId')}`).addClass(`md-toast-open-${y}`);
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.get('escapeToClose')) {
      $('body').off(`keydown.${this.elementId}`);
    }

    let y = this.get('top') ? 'top' : 'bottom';
    $(`#${this.get('destinationId')}`).removeClass(`md-toast-open-${y} md-toast-animating`);
  },

  swipe()  {
    if (this.get('swipeToClose')) {
      this.sendAction('onClose');
    }
  }
});
