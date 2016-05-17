import Ember from 'ember';
import PaperNavContainer from './paper-nav-container';
import isBrowser from '../utils/is-browser';

export default Ember.Component.extend({
  constants: Ember.inject.service(),
  tagName: 'md-sidenav',

  'locked-open': 'gt-sm',
  closed: true,
  closeOnClick: true,

  navContainer: Ember.computed(function() {
    return this.nearestOfType(PaperNavContainer);
  }),

  attributeBindings: ['tabindex'],
  classNameBindings: ['isLockedOpen:md-locked-open', 'closed:md-closed'],
  tabindex: -1,

  _init: Ember.on('init', function() {
    if (!isBrowser()) {
      return;
    }

    let _self = this;
    if (this.get('navContainer')) {
      this.get('navContainer').set('sideBar', this);
    }

    this.matchMedia();
    this.set('__resizeWindow', function() {
      _self.matchMedia();
    });
  }),

  _observeClosedState: Ember.observer('closed', function() {
    if (this.get('closed')) {
      Ember.$('body').css('overflow', 'inherit');
    } else {
      Ember.$('body').css('overflow', 'hidden');
    }
  }),

  didInsertElement() {
    Ember.$(window).on('resize', this.get('__resizeWindow'));
  },
  willDestroyElement() {
    Ember.$(window).off('resize', this.get('__resizeWindow'));
  },

  matchMedia() {
    let mediaQuery = this.get('constants').MEDIA[this.get('locked-open')];
    this.set('isLockedOpen', window.matchMedia(mediaQuery).matches);
    if (this.get('isLockedOpen')) {
      this.set('closed', true);
    }
  },

  actions: {
    toggleMenu() {
      if (!this.get('isLockedOpen')) {
        this.toggleProperty('closed');
      }
    }
  },

  click() {
    if (!this.get('closeOnClick') || this.get('isLockedOpen')) {
      return;
    }

    let _self = this;
    Ember.run.next(function() {
      _self.set('closed', true);
    });
  }

});
