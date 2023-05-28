/* eslint-disable ember/no-classic-components, ember/no-component-lifecycle-hooks */
/**
 * @module ember-paper
 */
/* globals FastBoot */
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import layout from '../templates/components/paper-sidenav-inner';
import { computed } from '@ember/object';
import { bind } from '@ember/runloop';
import { invokeAction } from 'ember-paper/utils/invoke-action';

/**
 * @class PaperSidenavInner
 * @extends Ember.Component
 * @uses TransitionMixin
 */
export default Component.extend({
  tagName: '',
  layout,

  constants: service(),
  paperSidenav: service(),

  name: 'default',
  position: 'left',
  lockedOpen: 'gt-sm',
  closed: true,
  closeOnClick: true,
  tabindex: -1,

  positionClass: computed('position', function() {
    return `md-sidenav-${this.position}`;
  }),

  init() {
    // need to updateLockedOpen() first because otherwise the transition classes
    // would be applied due to transition mixin's `init`
    if (typeof FastBoot === 'undefined') {
      this.updateLockedOpen();
    }
    this._super(...arguments);
    this.paperSidenav.register(this.name, this);
  },

  didInsertElement() {
    this._super(...arguments);
    this._updateOnResize = bind(this, this.updateLockedOpen);
    window.addEventListener('resize', this._updateOnResize);
    this.updateLockedOpen();
  },

  didReceiveAttrs() {
    this._super(...arguments);
    if (typeof FastBoot === 'undefined') {
      this.updateLockedOpen();
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    window.removeEventListener('resize', this._updateOnResize);
    this.paperSidenav.unregister(this.name, this);
    this._updateOnResize = null;
  },

  updateLockedOpen() {

    let lockedOpen = this.lockedOpen;
    let isLockedOpen;

    // if `true` or `false` is specified, always/never "lock open"
    // otherwise proceed with normal matchMedia test
    if (typeof lockedOpen === 'boolean') {
      isLockedOpen = lockedOpen;
    } else {
      let mediaQuery = this.constants.MEDIA[lockedOpen] || lockedOpen;
      isLockedOpen = window.matchMedia(mediaQuery).matches;
    }

    let coercedIsLockedOpen = !!this.isLockedOpen;

    if (coercedIsLockedOpen !== isLockedOpen) {
      this.set('isLockedOpen', isLockedOpen);

      // if sidenav is open and we enter lockedOpen,
      // make the sidenav enter the "closed" state
      if (!this.closed && isLockedOpen) {
        invokeAction(this, 'onToggle', false);
      }
    }
  },

  handleClick(closeOnClick, isLockedOpen, onToggle) {
    if (onToggle && closeOnClick && !isLockedOpen) {
      onToggle(false);
    }
  },

  open() {
    if (this.closed && this.isLockedOpen) {
      invokeAction(this, 'onToggle', true);
    }
  },

  close() {
    if (!this.closed && !this.isLockedOpen) {
      invokeAction(this, 'onToggle', false);
    }
  },

  toggle() {
    if (!this.isLockedOpen) {
      invokeAction(this, 'onToggle', this.closed);
    }
  }
});
