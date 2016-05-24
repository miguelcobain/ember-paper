import Ember from 'ember';
const { Service, $, run, Object: EmObject, assert } = Ember;

export default Service.extend({
  init() {
    this._super(...arguments);
    this.set('sidenavs', EmObject.create());
  },

  didInsertElement() {
    this._super(...arguments);
    $(window).on('resize.sidenav-service', run.bind(this, 'updateLockedOpen'));
  },

  willDestroyElement() {
    this._super(...arguments);
    $(window).off('resize.sidenav-service', run.bind(this, 'updateLockedOpen'));
  },

  updateLockedOpen() {
    let sidenavs = this.get('sidenavs');
    Object.keys(sidenavs)
    .map((k) => sidenavs.get(k))
    .forEach((s) => {
      let lockedOpen = s.get('lockedOpen');
      let mediaQuery = this.get('constants').MEDIA[lockedOpen];
      let match = window.matchMedia(mediaQuery).matches;
      s.set('isLockedOpen', match);
      if (match) {
        s.set('closed', match);
      }
    });
  },

  register(name, lockedOpen) {
    assert(`You tried to register a sidenav named '${name}' but there is already a sidenav with that name registered`, !this.get('sidenavs').get(name));
    this.get('sidenavs').set(name, EmObject.create({
      open: false,
      isLockedOpen: false,
      lockedOpen
    }));
  },

  open(name = 'default') {
    assert(`You tried to open a sidenav named '${name}' but no such sidenav is registered`, this.get('sidenavs').get(name));
    this.get('sidenavs').get(name).set('open', true);
  },

  close(name = 'default') {
    assert(`You tried to close a sidenav named '${name}' but no such sidenav is registered`, this.get('sidenavs').get(name));
    this.get('sidenavs').get(name).set('open', false);
  },

  toggle() {
    assert(`You tried to toggle a sidenav named '${name}' but no such sidenav is registered`, this.get('sidenavs').get(name));
    this.get('sidenavs').get(name).toggleProperty(name);
  }
});
