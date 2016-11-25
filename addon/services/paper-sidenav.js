/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Service, assert } = Ember;

/**
 * @class PaperSidenav
 * @extends Ember.Service
 */
export default Service.extend({
  init() {
    this._super(...arguments);
    this._sidenavs = {};
  },

  willDestroy() {
    this._super(...arguments);
    delete this._sidenavs;
  },

  register(name, sidenav) {
    if (!this._sidenavs[name]) {
      this._sidenavs[name] = [];
    }
    this._sidenavs[name].push({ name, sidenav });
  },

  unregister(name, sidenav) {
    assert(`You tried to unregister a sidenav named '${name}' but no such sidenav is registered`, this._sidenavs[name] && this._sidenavs[name].length);
    let sidenavs = this._sidenavs[name] || [];
    this._sidenavs[name] = sidenavs.filter((s) => s.sidenav !== sidenav);
  },

  open(name = 'default') {
    assert(`You tried to open a sidenav named '${name}' but no such sidenav is registered`, this._sidenavs[name] && this._sidenavs[name].length);
    let sidenavs = this._sidenavs[name] || [];
    sidenavs.forEach((s) => s.sidenav.open());
  },

  close(name = 'default') {
    assert(`You tried to close a sidenav named '${name}' but no such sidenav is registered`, this._sidenavs[name] && this._sidenavs[name].length);
    let sidenavs = this._sidenavs[name] || [];
    sidenavs.forEach((s) => s.sidenav.close());
  },

  toggle(name = 'default') {
    assert(`You tried to toggle a sidenav named '${name}' but no such sidenav is registered`, this._sidenavs[name] && this._sidenavs[name].length);
    let sidenavs = this._sidenavs[name] || [];
    sidenavs.forEach((s) => s.sidenav.toggle());
  }
});
