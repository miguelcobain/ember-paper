/**
 * @module ember-paper
 */
/* globals FastBoot */
import Ember from 'ember';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';

const { Component, inject, computed, $, run } = Ember;

/**
 * @class PaperSidenavInner
 * @extends Ember.Component
 * @uses TransitionMixin
 */
export default Component.extend(TransitionMixin, {
  tagName: 'md-sidenav',
  attributeBindings: ['tabindex'],
  classNameBindings: ['positionClass'],
  transitionClassNameBindings: ['isLockedOpen:md-locked-open', 'closed:md-closed'],

  constants: inject.service(),
  paperSidenav: inject.service(),

  name: 'default',
  position: 'left',
  lockedOpen: 'gt-sm',
  closed: true,
  closeOnClick: true,
  tabindex: -1,

  positionClass: computed('position', function() {
    return `md-sidenav-${this.get('position')}`;
  }),

  init() {
    // need to updateLockedOpen() first because otherwise the transition classes
    // would be applied due to transition mixin's `init`
    if (typeof FastBoot === 'undefined') {
      this.updateLockedOpen();
    }
    this._super(...arguments);
    this.get('paperSidenav').register(this.get('name'), this);
  },

  didInsertElement() {
    this._super(...arguments);
    $(window).on(`resize.${this.elementId}`, run.bind(this, 'updateLockedOpen'));
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
    $(window).off(`resize.${this.elementId}`);
    this.get('paperSidenav').unregister(this.get('name'), this);
  },

  updateLockedOpen() {
    let lockedOpen = this.get('lockedOpen');
    let isLockedOpen;

    // if `true` or `false` is specified, always/never "lock open"
    // otherwise proceed with normal matchMedia test
    if (typeof lockedOpen === 'boolean') {
      isLockedOpen = lockedOpen;
    } else {
      let mediaQuery = this.get('constants').MEDIA[lockedOpen] || lockedOpen;
      isLockedOpen = window.matchMedia(mediaQuery).matches;
    }

    let coercedIsLockedOpen = !!this.get('isLockedOpen');

    if (coercedIsLockedOpen !== isLockedOpen) {
      this.set('isLockedOpen', isLockedOpen);

      // if sidenav is open and we enter lockedOpen,
      // make the sidenav enter the "closed" state
      if (!this.get('closed') && isLockedOpen) {
        this.sendAction('onToggle', false);
      }
    }
  },

  click() {
    if (this.get('closeOnClick') && !this.get('isLockedOpen')) {
      this.sendAction('onToggle', false);
    }
  },

  open() {
    if (this.get('closed') && this.get('isLockedOpen')) {
      this.sendAction('onToggle', true);
    }
  },

  close() {
    if (!this.get('closed') && !this.get('isLockedOpen')) {
      this.sendAction('onToggle', false);
    }
  },

  toggle() {
    if (!this.get('isLockedOpen')) {
      this.sendAction('onToggle', this.get('closed'));
    }
  }
});
