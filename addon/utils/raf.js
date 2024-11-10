/**
 * @module ember-paper
 */

/**
 * debounce manages debouncing function calls based on request animation frame.
 * This limits computation to the number of frames drawn per second as reported
 * by the browser.
 *
 * @param rafId - The ID value returned by the call to window.requestAnimationFrame() that requested the callback.
 * @param callback - The function to call when it's time to update your animation for the next repaint.
 * @returns {number} - A long integer value, the request ID, that uniquely identifies the entry in the callback list.
 */
export function debounce(rafId, callback) {
  if (rafId) {
    window.cancelAnimationFrame(rafId);
  }
  return window.requestAnimationFrame(callback);
}
