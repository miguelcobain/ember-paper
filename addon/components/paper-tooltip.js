import Ember from 'ember';
import layout from '../templates/components/paper-tooltip';
import $ from 'jquery';
import getParent from 'ember-paper/utils/get-parent';
const { Component, computed, testing, run, String: { htmlSafe } } = Ember;

export default Component.extend({
  tagName: '',
  layout,

  position: 'bottom',

  wormholeSelector: '#paper-wormhole',
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

  zIndex: 100,

  containerStyle: computed('zIndex', function() {
    return htmlSafe(`pointer-events: none; z-index: ${this.get('zIndex')};`);
  }),

  anchorElement: computed('attachTo', function() {
    let attachTo = this.get('attachTo');
    if (attachTo) {
      return $(attachTo).get(0);
    } else {
      return getParent(this);
    }
  }),

  didInsertElement() {
    this._super(...arguments);
    let anchorElement = this.get('anchorElement');

    let leaveHandler = () => {
      this.set('hideTooltip', true);
      run.later(() => {
        if (!this.isDestroyed) {
          this.set('renderTooltip', false);
        }
      }, 150);

      anchorElement.addEventListener('blur', leaveHandler);
      anchorElement.addEventListener('touchcancel', leaveHandler);
      anchorElement.addEventListener('mouseleave', leaveHandler);
    };

    let enterEventHandler = () => {
      anchorElement.addEventListener('blur', leaveHandler);
      anchorElement.addEventListener('touchcancel', leaveHandler);
      anchorElement.addEventListener('mouseleave', leaveHandler);

      this.set('renderTooltip', true);
      this.set('hideTooltip', false);
    };

    anchorElement.addEventListener('focus', enterEventHandler);
    anchorElement.addEventListener('touchstart', enterEventHandler);
    anchorElement.addEventListener('mouseenter', enterEventHandler);

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
