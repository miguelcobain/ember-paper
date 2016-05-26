import Ember from 'ember';
const { Service, assert } = Ember;

export default Service.extend({
  init() {
    this._super(...arguments);
    this.sidenavs = {};
  },

  willDestroy() {
    this._super(...arguments);
    delete this.sidenavs;
  },

  register(name, sidenav) {
    if (!this.sidenavs[name]) {
      this.sidenavs[name] = [];
    }
    this.sidenavs[name].push({ name, sidenav });
  },

  unregister(name) {
    assert(`You tried to unregister a sidenav named '${name}' but no such sidenav is registered`, this.sidenavs[name] && this.sidenavs[name].length);
    let sidenavs = this.sidenavs[name] || [];
    this.sidenavs[name] = sidenavs.filter((s) => s.name !== name);
  },

  open(name = 'default') {
    assert(`You tried to open a sidenav named '${name}' but no such sidenav is registered`, this.sidenavs[name] && this.sidenavs[name].length);
    let sidenavs = this.sidenavs[name] || [];
    sidenavs.forEach((s) => s.sidenav.open());
  },

  close(name = 'default') {
    assert(`You tried to close a sidenav named '${name}' but no such sidenav is registered`, this.sidenavs[name] && this.sidenavs[name].length);
    let sidenavs = this.sidenavs[name] || [];
    sidenavs.forEach((s) => s.sidenav.close());
  },

  toggle(name = 'default') {
    assert(`You tried to toggle a sidenav named '${name}' but no such sidenav is registered`, this.sidenavs[name] && this.sidenavs[name].length);
    let sidenavs = this.sidenavs[name] || [];
    sidenavs.forEach((s) => s.sidenav.toggle());
  }
});
