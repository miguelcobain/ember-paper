const hasDOM = typeof document !== 'undefined';
const defaultWormhole = 'paper-wormhole';

export default function initialize() {
  if (!hasDOM) {
    return;
  }

  const application = arguments[1] || arguments[0];
  const rootElementSelector = application.rootElement || 'body';
  const rootElement = document.querySelector(rootElementSelector);

  let wormhole = document.createElement('div');
  wormhole.id = defaultWormhole;

  rootElement.appendChild(wormhole);
}
