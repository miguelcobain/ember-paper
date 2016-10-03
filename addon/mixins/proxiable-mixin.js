/**
 * @module ember-paper
 */
import Ember from 'ember';
import ProxyMixin from './proxy-mixin';

const { Mixin, computed, get, isEmpty, run } = Ember;

/**
 * @class ProxiableMixin
 * @extends Ember.Mixin
 */
export default Mixin.create({
  init() {
    this._super(...arguments);
    run.next(this, 'registerProxy');
  },

  registerProxy() {
    let proxy = this.nearestOfType(ProxyMixin);
    if (proxy) {
      proxy.register(this);
    }
  },

  processProxy: null,

  // Paper item secondary container class
  isSecondary: computed('class', function() {
    let cls = get(this, 'class');
    if (!isEmpty(cls)) {
      return cls.indexOf('md-secondary') !== -1;
    } else {
      return false;
    }
  }),
  isProxyHandlerSet: false
});
