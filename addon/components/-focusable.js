/**
 * @module ember-paper
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

/**
 * @class Focusable
 * @extends @glimmer/component
 *
 * When extending from Focusable it is expected that md-focused be implemented
 * on the top level tag along with setting tabindex and disabled. This component
 * listens to a large number of events, therefore render listener register
 * functions have been created to ease usage. Clearly, this is non-optimal and
 * only the listeners that are required should be added using the `on` modifier.
 *
 * Use the following as a base:
 * ```hbs
 * <myTag class='{{if this.focused " md-focused"}}' disabled={{this.disabled}} tabindex={{if this.disabled "-1" "0"}} {{did-insert this.registerListeners}} {{will-destroy this.unregisterListeners}} ...attributes>
 * </myTag>
 * ```
 */
export default class Focusable extends Component {
  @tracked pressed = false;
  @tracked active = false;
  @tracked focused = false;
  @tracked hover = false;

  // classNameBindings: ['focused:md-focused'],
  // attributeBindings: ['tabindex', 'disabledAttr:disabled'],

  get disabled() {
    return this.args.disabled || false;
  }

  toggle = false;

  // Only render the "focused" state if the element gains focus due to
  // keyboard navigation.
  get focusOnlyOnKey() {
    return this.args.focusOnlyOnKey || false;
  }

  @action registerListeners(element) {
    element.addEventListener('focusin', this.handleFocusIn);
    element.addEventListener('focusout', this.handleFocusOut);
    element.addEventListener('mousedown', this.handleMouseDown);
    element.addEventListener('mouseenter', this.handleMouseEnter);
    element.addEventListener('mouseleave', this.handleMouseLeave);
    element.addEventListener('mousemove', this.handleMouseMove);
    element.addEventListener('mouseup', this.handleMouseUp);
    element.addEventListener('pointermove', this.handlePointerMove);
    // Set all touch events as passive listeners to remove scroll jank on
    // mobile devices.
    // refer: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
    element.addEventListener('touchcancel', this.handleTouchCancel, {
      passive: true,
    });
    element.addEventListener('touchend', this.handleTouchEnd, {
      passive: true,
    });
    element.addEventListener('touchmove', this.handleTouchMove, {
      passive: true,
    });
    element.addEventListener('touchstart', this.handleTouchStart, {
      passive: true,
    });
  }

  @action unregisterListeners(element) {
    element.removeEventListener('focusin', this.handleFocusIn);
    element.removeEventListener('focusout', this.handleFocusOut);
    element.removeEventListener('mousedown', this.handleMouseDown);
    element.removeEventListener('mouseenter', this.handleMouseEnter);
    element.removeEventListener('mouseleave', this.handleMouseLeave);
    element.removeEventListener('mousemove', this.handleMouseMove);
    element.removeEventListener('mouseup', this.handleMouseUp);
    element.removeEventListener('pointermove', this.handlePointerMove);
    element.removeEventListener('touchcancel', this.handleTouchCancel);
    element.removeEventListener('touchend', this.handleTouchEnd);
    element.removeEventListener('touchmove', this.handleTouchMove);
    element.removeEventListener('touchstart', this.handleTouchStart);
  }

  /*
   * Listen to `focusIn` and `focusOut` events instead of `focus` and `blur`.
   * This way we don't need to explicitly bubble the events.
   * They bubble by default.
   */
  @action handleFocusIn(e) {
    if (this.disabled) {
      // elements should not be able to be focused if disabled.
      return;
    }

    if ((!this.disabled && !this.focusOnlyOnKey) || !this.pressed) {
      this.focused = true;
      if (this.args.onFocusIn) {
        this.args.onFocusIn(e);
      }
    }
  }

  @action handleFocusOut(e) {
    this.focused = false;
    if (this.args.onFocusOut) {
      this.args.onFocusOut(e);
    }
  }

  @action handleMouseDown(e) {
    this.down(e);
    if (this.args.onMouseDown) {
      this.args.onMouseDown(e);
    }
  }

  @action handleMouseEnter(e) {
    this.hover = true;
    if (this.args.onMouseEnter) {
      this.args.onMouseEnter(e);
    }
  }

  @action handleMouseLeave(e) {
    this.hover = false;
    this.up(e);
    if (this.args.onMouseLeave) {
      this.args.onMouseLeave(e);
    }
  }

  @action handleMouseMove(e) {
    return this.move(e);
  }

  @action handleMouseUp(e) {
    return this.up(e);
  }

  @action handlePointerMove(e) {
    return this.move(e);
  }

  @action handleTouchCancel(e) {
    return this.up(e);
  }

  @action handleTouchEnd(e) {
    return this.up(e);
  }

  @action handleTouchMove(e) {
    return this.move(e);
  }

  @action handleTouchStart(e) {
    return this.down(e);
  }

  @action up() {
    this.pressed = false;
    if (!this.toggle) {
      this.active = false;
    }
  }

  @action down() {
    this.pressed = true;
    if (this.toggle) {
      this.active = !this.active;
    } else {
      this.active = true;
    }
  }

  move() {}
}
