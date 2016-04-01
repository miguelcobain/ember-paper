import Ember from 'ember';
const { $, inject, run } = Ember;

export default Ember.Component.extend({
  tagName: 'md-sidenav',

  constants: inject.service(),
  paperSidenav: inject.service('paper-sidenav'),

  setupToggleListener() {
    this.get('paperSidenav').on('toggle', this, 'onToggle');
  },

  onToggle(id) {
    if (id === this.elementId && !this.get('isLockedOpen')) {
      this.toggleProperty('closed');
    }
  },

  /* Defaults */
  lockedOpen: 'gt-sm',
  closed: true,
  closeOnClick: true,

  /* Bindings */
  attributeBindings: ['tabindex'],
  classNameBindings: [
    'isLockedOpen:md-locked-open',
    'closed:md-closed'],
  tabindex: -1,

  init() {
    this._super(...arguments);
    let _self = this;

    this.matchMedia();
    this.set('__resizeWindow', function() {
      _self.matchMedia();
    });

    this.setupToggleListener();
  },

  _observeClosedState: Ember.observer('closed', function() {
    if (this.get('closed')) {
      $('body').css('overflow', 'inherit');
    } else {
      $('body').css('overflow', 'hidden');
    }
  }),

  didInsertElement() {
    $(window).on('resize', this.get('__resizeWindow'));
  },

  willDestroyElement() {
    $(window).off('resize', this.get('__resizeWindow'));
  },

  matchMedia() {
    let mediaQuery = this.get('constants').MEDIA[this.get('lockedOpen')];
    this.set('isLockedOpen', window.matchMedia(mediaQuery).matches);
    if (this.get('isLockedOpen')) {
      this.set('closed', true);
    }
  },

  click() {
    if (!this.get('closeOnClick') || this.get('isLockedOpen')) {
      return;
    }

    let _self = this;
    run.next(function() {
      _self.set('closed', true);
    });
  },

  actions: {
    toggle() {
      this.onToggle();
    }
  }

});
