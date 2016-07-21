/**
 * @module ember-paper
 */
const hasDOM = typeof document !== 'undefined';
const defaultWormhole = 'paper-wormhole';

export default function initialize() {
  if (!hasDOM) {
    return;
  }

  let application = arguments[1] || arguments[0];
  let rootElementSelector = application.rootElement || 'body';
  let rootElement = document.querySelector(rootElementSelector);

  let wormhole = document.createElement('div');
  wormhole.id = defaultWormhole;

  rootElement.appendChild(wormhole);
}
