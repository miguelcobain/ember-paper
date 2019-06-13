// Taken from https://github.com/Modernizr/Modernizr/blob/master/feature-detects/dom/passiveeventlisteners.js
/* eslint-disable */
export const supportsPassiveEventListeners = (function() {
  var supportsPassiveOption = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassiveOption = true;
      }
    });
    var noop = function () {};
    window.addEventListener('testPassiveEventSupport', noop, opts);
    window.removeEventListener('testPassiveEventSupport', noop, opts);
  } catch (e) {}
  return supportsPassiveOption;
})();
