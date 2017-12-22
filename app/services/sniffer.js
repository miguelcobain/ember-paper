/* globals FastBoot */
import Service from '@ember/service';

import { computed } from '@ember/object';

let isString = function(value) {
  return typeof value === 'string';
};

let lowercase = function(string) {
  return isString(string) ? string.toLowerCase() : string;
};

let toInt = function(str) {
  return parseInt(str, 10);
};

export default Service.extend({
  vendorPrefix: '',
  transitions: false,
  animations: false,
  _document: null,
  _window: null,

  android: computed('', function() {
    return toInt((/android (\d+)/.exec(lowercase((this.get('_window').navigator || {}).userAgent)) || [])[1]);
  }),

  init() {
    this._super(...arguments);
    if (typeof FastBoot !== 'undefined') {
      return;
    }

    let _document = document;
    let _window = window;

    this.setProperties({
      _document,
      _window
    });

    let bodyStyle = _document.body && _document.body.style;
    let vendorPrefix, match;
    let vendorRegex = /^(Moz|webkit|ms)(?=[A-Z])/;

    let transitions = false;
    let animations = false;

    if (bodyStyle) {
      for (let prop in bodyStyle) {
        match = vendorRegex.exec(prop);
        if (match) {
          vendorPrefix = match[0];
          vendorPrefix = vendorPrefix.substr(0, 1).toUpperCase() + vendorPrefix.substr(1);
          break;
        }
      }

      if (!vendorPrefix) {
        vendorPrefix = ('WebkitOpacity' in bodyStyle) && 'webkit';
      }

      transitions = !!(('transition' in bodyStyle) || (`${vendorPrefix}Transition` in bodyStyle));
      animations = !!(('animation' in bodyStyle) || (`${vendorPrefix}Animation` in bodyStyle));

      if (this.get('android') && (!transitions || !animations)) {
        transitions = isString(bodyStyle.webkitTransition);
        animations = isString(bodyStyle.webkitAnimation);
      }

    }

    this.set('transitions', transitions);
    this.set('animations', animations);

    this.set('vendorPrefix', vendorPrefix);
  }

});
