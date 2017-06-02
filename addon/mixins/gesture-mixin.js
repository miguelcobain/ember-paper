/**
 * @module ember-paper
 */

// based on node_modules/angular-material-source/src/core/services/gesture/gesture.js

import Ember from 'ember';
import EventsMixin from './events-mixin';

const { Mixin } = Ember;

/**
 * @class GestureMixin
 * @extends Ember.Mixin
 * @uses EventsMixin
 */
export default Mixin.create(EventsMixin, {
  pointer: null,
  lastPointer: null,
  mouseDown: false,
  SwipeOptions: {
    minVelocity: 0.0065,
    minDistance: 10
  },
  swipeLeft() {
  },
  swipeRight() {
  },
  swipeDown() {
  },
  swipeUp() {
  },
  typesMatch(ev, pointer) {
    return ev && pointer && ev.type.charAt(0) === pointer.type;
  },
  getEventPoint(ev) {
    ev = ev.originalEvent || ev; // support jQuery events
    return (ev.touches && ev.touches[0])
    || (ev.changedTouches && ev.changedTouches[0])
    || ev;
  },
  makeStartPointer(ev) {
    let point = this.getEventPoint(ev);
    let startPointer = {
      startTime: +Date.now(),
      target: ev.target,
      // 'p' for pointer events, 'm' for mouse, 't' for touch
      type: ev.type.charAt(0)
    };
    startPointer.startX = startPointer.x = point.pageX;
    startPointer.startY = startPointer.y = point.pageY;
    return startPointer;
  },
  down(ev) {
    if (this.pointer != null) {
      return;
    }
    // iOS & old android bug: after a touch event, a click event is sent 350 ms later.
    // If <400ms have passed, don't allow an event of a different type than the previous event
    if (this.lastPointer && !this.typesMatch(ev, this.lastPointer) && (Date.now() - this.lastPointer.endTime < 1500)) {
      return;
    }
    this.mouseDown = true;
    this.pointer = this.makeStartPointer(ev);
  },
  click(ev) {
    this.down(ev);
  },
  updatePointerState(ev, pointer) {
    let point = this.getEventPoint(ev);
    let x = pointer.x = point.pageX;
    let y = pointer.y = point.pageY;
    pointer.distanceX = x - pointer.startX;
    pointer.distanceY = y - pointer.startY;
    pointer.distance = Math.sqrt(
      pointer.distanceX * pointer.distanceX + pointer.distanceY * pointer.distanceY
    );

    pointer.directionX = pointer.distanceX > 0 ? 'right' : pointer.distanceX < 0 ? 'left' : '';
    pointer.directionY = pointer.distanceY > 0 ? 'down' : pointer.distanceY < 0 ? 'up' : '';

    pointer.duration = +Date.now() - pointer.startTime;
    pointer.velocityX = pointer.distanceX / pointer.duration;
    pointer.velocityY = pointer.distanceY / pointer.duration;
  },
  move(ev) {
    // mouse should be down
    if (!this.mouseDown) {
      return;
    }
    this.updatePointerState(ev, this.pointer);
  },
  onSwipeEnd(ev, pointer) {
    if (Math.abs(pointer.velocityX) > this.SwipeOptions.minVelocity
    && Math.abs(pointer.distanceX) > this.SwipeOptions.minDistance) {
      if (pointer.directionX == 'left') {
        this.swipeLeft();
      }
      if (pointer.directionX == 'right') {
        this.swipeRight();
      }
    } else if (Math.abs(pointer.velocityY) > this.SwipeOptions.minVelocity
    && Math.abs(pointer.distanceY) > this.SwipeOptions.minDistance) {
      if (pointer.directionY == 'up') {
        this.swipeUp();
      }
      if (pointer.directionY == 'down') {
        this.swipeDown();
      }
    }
  },
  up(ev) {
    // Mouseup event
    if (this.mouseDown) {
      this.onSwipeEnd(ev, this.pointer);
      this.mouseDown = false;
    }
    this.lastPointer = this.pointer;
    this.pointer = null;
  }
});
