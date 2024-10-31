/**
 * @module ember-paper
 */
import Focusable from './-focusable';
import { action } from '@ember/object';

/**
 * @class PaperButton
 * @extends Focusable
 */
export default class PaperButton extends Focusable {
  get tag() {
    if (this.args.href) {
      return 'a';
    }

    return 'button';
  }

  get type() {
    if (this.args.type) {
      return this.args.type;
    }

    return 'button';
  }

  get fab() {
    return this.args.fab || this.args.mini;
  }

  @action handleClick(e) {
    if (this.args.onClick) {
      this.args.onClick(e);
    }

    // Prevent bubbling, if specified. If undefined, the event will bubble.
    if (this.args.bubbles === undefined) {
      return true;
    }

    return this.args.bubbles;
  }
}
