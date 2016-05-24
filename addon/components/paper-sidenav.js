import Ember from 'ember';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';
import PaperSidenavContainer from './paper-sidenav-container';

const { Component, inject, computed, $, run } = Ember;

export default Component.extend(TransitionMixin, {
  tagName: 'md-sidenav',
  attributeBindings: ['tabindex'],
  classNameBindings: ['positionClass'],
  transitionTriggers: ['isLockedOpen:md-locked-open', 'closed:md-closed'],

  constants: inject.service(),
  paperSidenav: inject.service(),

  name: 'default',
  position: 'left',
  lockedOpen: 'gt-sm',
  closed: true,
  closeOnClick: true,
  tabindex: -1,

  navContainer: computed(function() {
    return this.nearestOfType(PaperSidenavContainer);
  }),

  positionClass: computed('position', function() {
    return `md-sidenav-${this.get('position')}`;
  }),

  init() {
    this.updateLockedOpen();

    this._super(...arguments);

    /*if (this.get('navContainer')) {
      this.get('navContainer').set('sideBar', this);
    }*/

    this.get('paperSidenav').register(this.get('name'));
  },

  didInsertElement() {
    this._super(...arguments);
    $(window).on(`resize.${this.elementId}`, run.bind(this, 'updateLockedOpen'));
  },

  willDestroyElement() {
    this._super(...arguments);
    $(window).off(`resize.${this.elementId}`, run.bind(this, 'updateLockedOpen'));
  },

  updateLockedOpen() {
    let mediaQuery = this.get('constants').MEDIA[this.get('lockedOpen')];
    let isLockedOpen = window.matchMedia(mediaQuery).matches;
    this.set('isLockedOpen', isLockedOpen);
    if (isLockedOpen) {
      this.set('closed', true);
    }
  },

  click() {
    if (this.get('closeOnClick') && !this.get('isLockedOpen')) {
      this.set('closed', true);
    }
  },

  actions: {
    toggleMenu() {
      if (!this.get('isLockedOpen')) {
        this.toggleProperty('closed');
      }
    }
  }

});
