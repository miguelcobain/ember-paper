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
    assert(`You tried to register a sidenav named '${name}' but there is already a sidenav with that name registered`, !this.sidenavs[name]);
    this.sidenavs[name] = sidenav;
  },

  unregister(name) {
    assert(`You tried to unregister a sidenav named '${name}' but no such sidenav is registered`, this.sidenavs[name]);
    delete this.sidenavs[name];
  },

  open(name = 'default') {
    assert(`You tried to open a sidenav named '${name}' but no such sidenav is registered`, this.sidenavs[name]);
    this.get('sidenavs').get(name).open();
  },

  close(name = 'default') {
    assert(`You tried to close a sidenav named '${name}' but no such sidenav is registered`, this.sidenavs[name]);
    this.sidenavs[name].close();
  },

  toggle(name = 'default') {
    assert(`You tried to toggle a sidenav named '${name}' but no such sidenav is registered`, this.sidenavs[name]);
    this.sidenavs[name].toggle(name);
  }
});
