/**
 * @module ember-paper
 */
/* globals FastBoot */
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';
import { invokeAction } from 'ember-invoke-action';

/**
 * @class PaperSidenavInner
 * @extends Ember.Component
 * @uses TransitionMixin
 */
export default Component.extend(TransitionMixin, {
  tagName: 'md-sidenav',
  attributeBindings: ['tabindex'],
  classNameBindings: ['positionClass'],
  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  transitionClassNameBindings: ['isLockedOpen:md-locked-open', 'closed:md-closed'],

  constants: service(),
  paperSidenav: service(),

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
    this._updateOnResize = run.bind(this, this.updateLockedOpen);
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
    this.get('paperSidenav').unregister(this.get('name'), this);
    this._updateOnResize = null;
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
        invokeAction(this, 'onToggle', false);
      }
    }
  },

  click() {
    if (this.get('closeOnClick') && !this.get('isLockedOpen')) {
      invokeAction(this, 'onToggle', false);
    }
  },

  open() {
    if (this.get('closed') && this.get('isLockedOpen')) {
      invokeAction(this, 'onToggle', true);
    }
  },

  close() {
    if (!this.get('closed') && !this.get('isLockedOpen')) {
      invokeAction(this, 'onToggle', false);
    }
  },

  toggle() {
    if (!this.get('isLockedOpen')) {
      invokeAction(this, 'onToggle', this.get('closed'));
    }
  }
});
