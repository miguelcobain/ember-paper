import Ember from 'ember';

export default Ember.Mixin.create({
  touchStart(e) {
    return this.down(e);
  },
  mouseDown(e) {
    this.down(e);
  },
  touchEnd(e) {
    return this.up(e);
  },
  mouseUp(e) {
    return this.up(e);
  },
  touchCancel(e) {
    return this.up(e);
  },
  mouseLeave(e) {
    return this.up(e);
  },
  up: Ember.K,
  down: Ember.K,
  contextMenu: Ember.K
});
