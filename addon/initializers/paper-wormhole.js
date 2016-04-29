import isBrowser from '../utils/is-browser';
const defaultWormhole = 'paper-wormhole';

export default function initialize() {
  if (!isBrowser()) {
    return;
  }

  let application = arguments[1] || arguments[0];
  let rootElementSelector = application.rootElement || 'body';
  let rootElement = document.querySelector(rootElementSelector);

  let wormhole = document.createElement('div');
  wormhole.id = defaultWormhole;

  rootElement.appendChild(wormhole);
}
