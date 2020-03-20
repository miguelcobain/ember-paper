/**
 * @module ember-paper
 */
import Mixin from '@ember/object/mixin';

/**
 * @class EventsMixin
 * @extends Ember.Mixin
 */
export default Mixin.create({
  didInsertElement() {
    this._super(...arguments);
    // Avoid attaching mouse events directly to component and it has been deprecated due to performance issue.
    // Please check https://deprecations.emberjs.com/v3.x/#toc_action-mouseenter-leave-move
    this.element.addEventListener('mouseMove', this.handleMouseMove.bind(this));
    this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
  },
  willDestroyElement() {
    this._super(...arguments);
    this.element.removeEventListener('mouseMove', this.handleMouseMove.bind(this));
    this.element.removeEventListener('mouseleave', this.handleMouseLeave.bind(this));
  },
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
  handleMouseLeave(e) {
    return this.up(e);
  },
  up() {},
  down() {},
  contextMenu() {},

  /*
   * Move events
   */

  handleMouseMove(e) {
    return this.move(e);
  },

  touchMove(e) {
    return this.move(e);
  },

  pointerMove(e) {
    return this.move(e);
  },

  move() {}
});
