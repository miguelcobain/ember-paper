import Modifier from 'ember-modifier';
import { bind } from '@ember/runloop';

/* global Hammer */

export default class ToastHammer extends Modifier {
  enabled = false;
  onClose = null;

  setupHammer() {
    if (this.enabled) {
      // Enable dragging the slider
      let containerManager = new Hammer.Manager(this.element, {
        dragLockToAxis: true,
        dragBlockHorizontal: true
      });
      let swipe = new Hammer.Swipe({ direction: Hammer.DIRECTION_ALL, threshold: 10 });
      let pan = new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 10 });
      containerManager.add(swipe);
      containerManager.add(pan);
      containerManager
        .on('panstart', bind(this, this.dragStart))
        .on('panmove', bind(this, this.drag))
        .on('panend', bind(this, this.dragEnd))
        .on('swiperight swipeleft', bind(this, this.dragEnd));
      this.hammer = containerManager;
    }
  }

  setXPosition(event) {
    this.element.style.transform = `translate(${event}px, 0)`;
  }

  dragStart(event) {
    this.element.classList.add('md-dragging');
    this.element.focus();
    this.setXPosition(event.center.x);
  }

  drag(event) {
    if (!this.element.classList.contains('md-dragging')) { return }

    this.setXPosition(event.deltaX);
  }

  dragEnd() {
    this.element.classList.remove('md-dragging');
    if (this.onClose) { this.onClose() }
  }

  teardownHammer() {
    this.hammer.destroy();
    delete this.hammer;
  }

  didReceiveArguments() {
    this.enabled = this.args.named.enabled;
    this.onClose = this.args.named.onClose;

    if (this.enabled && !this.hammer) {
      // if it is enabled and we didn't init hammer yet
      this.setupHammer();
    } else if (!this.enabled && this.hammer) {
      // if it is disabled and we did init hammer already
      this.teardownHammer();
    }
  }

  willDestroy() {
    if (this.hammer) {
      this.teardownHammer();
    }
  }
}
