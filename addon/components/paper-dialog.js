import Ember from 'ember';
import { toJQuery } from '../mixins/translate3d-mixin';

const {
  Component,
  computed,
  inject: { service },
  isEmpty,
  guidFor
} = Ember;

export default Component.extend({
  tagName: '',

  escapeToClose: true,
  focusOnOpen: true,

  // Calculate a default that is always valid for the parent of the backdrop.
  wormholeSelector: '#paper-wormhole',
  defaultedParent: computed.or('parent', 'wormholeSelector'),

  // Calculate a default that is always valid where the opening transition should originate.
  defaultedOpenFrom: computed.or('openFrom', 'origin', 'parent'),

  // Calculate a default that is always valid where the closing transition should terminate.
  defaultedCloseTo: computed.or('closeTo', 'origin', 'parent'),

  // Calculate the id of the wormhole destination, setting it if need be. The
  // id is that of the 'parent', if provided, or 'paper-wormhole' if not.
  destinationId: computed('defaultedParent', function() {
    let parent = this.get('defaultedParent');
    let $parent = toJQuery(parent);
    // If the parent isn't found, assume that it is an id, but that the DOM doesn't
    // exist yet. This only happens during integration tests or if entire application
    // route is a dialog.
    if (isEmpty($parent) && parent.charAt(0) === '#') {
      return parent.substring(1);
    }
    let id = $parent.attr('id');
    if (!id) {
      id = guidFor(this);
      $parent.get(0).id = id;
    }
    return id;
  }),

  constants: service(),

  didInsertElement() {
    if (this.get('escapeToClose')) {
      toJQuery(this.get('defaultedParent')).on(`keydown.${this.elementId}`, (e) => {
        if (e.keyCode === this.get('constants.KEYCODE.ESCAPE') && this.get('onClose')) {
          this.get('onClose')();
        }
      });
    }
  },

  willDestroyElement() {
    if (this.get('escapeToClose')) {
      toJQuery(this.get('defaultedParent')).off(`keydown.${this.elementId}`);
    }
  },

  actions: {
    outsideClicked() {
      if (this.get('clickOutsideToClose') && this.get('onClose')) {
        this.get('onClose')();
      }
    }
  }
});
