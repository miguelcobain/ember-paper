import Modifier from 'ember-modifier';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';

/**
 * @modifier mutation-observer
 *
 * This Ember modifier uses the MutationObserver API to observe changes in the
 * DOM of a given element. It initializes a MutationObserver, attaches it to
 * the provided DOM element, and invokes a callback whenever a mutation is detected.
 * The modifier also automatically cleans up the observer when the element is destroyed.
 *
 *
 * @param {Element} element - The DOM element to observe.
 * @param {Function} callback - The callback function to be called when mutations are observed.
 * @param {Object} config - Configuration options for MutationObserver, such as `{ childList: true, subtree: true }`.
 *
 * This modifier allows you to specify the DOM element you want to observe, a callback
 * function that gets executed whenever a mutation occurs on that element, and a configuration
 * object that defines what types of mutations to observe.
 *
 * The `config` parameter should be a JSON object that matches the options for
 * `MutationObserver.observe`, such as `{ childList: true, attributes: true, subtree: true }`.
 *
 * @example
 * ```hbs
 * <div {{mutation-observer this.handleMutation config=(hash childList=true subtree=true)}}>
 *   <!-- Content that might change -->
 * </div>
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 */
export default class MutationObserverModifier extends Modifier {
  observer;

  constructor(owner, args) {
    super(owner, args);
    // Register cleanup logic to disconnect the observer when destroyed
    registerDestructor(this, cleanup);
  }

  modify(element, [callback], { config = { childList: true } }) {
    assert(
      '{{mutation-observer}} requires a callback as the first parameter',
      typeof callback === 'function'
    );

    this.observer = new MutationObserver(callback);
    this.observer.observe(element, config);
  }
}

function cleanup(instance) {
  instance.observer?.disconnect();
}
