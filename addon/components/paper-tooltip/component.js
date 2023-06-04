import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { later } from '@ember/runloop';
import { htmlSafe } from '@ember/string';
import { getOwner } from '@ember/application';
import { supportsPassiveEventListeners } from 'ember-paper/utils/browser-features';

export default class PaperTooltipComponent extends Component {
  @tracked hideTooltip = false;
  @tracked renderTooltip = false;
  @tracked anchorElement = false;

  wormholeSelector = '#paper-wormhole';

  get position() {
    return this.args.position ?? 'bottom';
  }

  get defaultedParent() {
    return this.args.parent ?? this.wormholeSelector;
  }

  // Calculate the id of the wormhole destination, setting it if need be. The
  // id is that of the 'parent', if provided, or 'paper-wormhole' if not.
  get destinationId() {
    const config = getOwner(this).resolveRegistration('config:environment');

    if (config.environment === 'test' && !this.args.parent) {
      return '#ember-testing';
    }
    const parent = this.defaultedParent;
    const parentEle =
      typeof parent === 'string' ? document.querySelector(parent) : parent;
    // If the parent isn't found, assume that it is an id, but that the DOM doesn't
    // exist yet. This only happens during integration tests or if entire application
    // route is a dialog.
    if (typeof parent === 'string' && parent.charAt(0) === '#') {
      return `#${parent.substring(1)}`;
    } else {
      let { id } = parentEle;
      if (!id) {
        id = `${this.elementId}-parent`;
        parentEle.id = id;
      }
      return `#${id}`;
    }
  }

  // Find the element referenced by destinationId
  get destinationEl() {
    return document.querySelector(this.destinationId);
  }

  get zIndex() {
    return this.args.zIndex ?? 100;
  }

  get containerStyle() {
    return htmlSafe(`pointer-events: none; z-index: ${this.zIndex};`);
  }

  setAnchorElement(dummyElement) {
    const { attachTo } = this;
    if (attachTo) {
      this.anchorElement = document.querySelector(attachTo);
    } else {
      this.anchorElement = dummyElement.parentNode;
    }

    dummyElement.remove();
  }

  @action
  didInsert(element) {
    this.setAnchorElement(element);

    const { anchorElement } = this;

    const leaveHandler = () => {
      if (!this.isDestroyed) {
        this.hideTooltip = true;
        later(() => {
          if (!this.isDestroyed) {
            this.renderTooltip = false;
          }
        }, 150);

        anchorElement.addEventListener('blur', leaveHandler);
        anchorElement.addEventListener('touchcancel', leaveHandler);
        anchorElement.addEventListener('mouseleave', leaveHandler);
      }
    };

    let enterEventHandler = () => {
      anchorElement.addEventListener('blur', leaveHandler);
      anchorElement.addEventListener('touchcancel', leaveHandler);
      anchorElement.addEventListener('mouseleave', leaveHandler);

      if (!this.isDestroyed) {
        this.renderTooltip = true;
        this.hideTooltip = false;
      }
    };

    anchorElement.addEventListener('focus', enterEventHandler);
    anchorElement.addEventListener('mouseenter', enterEventHandler);
    anchorElement.addEventListener(
      'touchstart',
      enterEventHandler,
      supportsPassiveEventListeners ? { passive: true } : false
    );

    window.addEventListener('scroll', leaveHandler);
    window.addEventListener('blur', leaveHandler);
    window.addEventListener('resize', leaveHandler);
    window.addEventListener('orientationchange', leaveHandler);
    this.leaveHandler = leaveHandler;
  }

  willDestroy() {
    super.willDestroy(...arguments);
    window.removeEventListener('scroll', this.leaveHandler);
    window.removeEventListener('blur', this.leaveHandler);
    window.removeEventListener('resize', this.leaveHandler);
    window.removeEventListener('orientationchange', this.leaveHandler);
  }
}
