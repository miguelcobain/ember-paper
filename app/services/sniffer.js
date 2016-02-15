import Ember from 'ember';

let isString = function(value) {
  return typeof value === 'string';
};

let lowercase = function(string) {
  return isString(string) ? string.toLowerCase() : string;
};

let toInt = function(str) {
  return parseInt(str, 10);
};


export default Ember.Service.extend({
  vendorPrefix: '',
  transitions: false,
  animations: false,
  document: document,
  window: window,

  android: Ember.computed('', function() {
    return toInt((/android (\d+)/.exec(lowercase((this.get('window').navigator || {}).userAgent)) || [])[1]);
  }),

  init() {
    this._super(...arguments);

    let bodyStyle = this.get('document').body && this.get('document').body.style;
    let vendorPrefix;
    let vendorRegex = /^(Moz|webkit|ms)(?=[A-Z])/;

    let transitions = false;
    let animations = false;
    let match;

    if (bodyStyle) {
      for (let prop in bodyStyle) {
        if (match = vendorRegex.exec(prop)) {
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
