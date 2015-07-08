import Ember from 'ember';
import ProxyMixin from './proxy-mixin';

export default Ember.Mixin.create({
  didInsertElement: function() {
    this._super(...arguments);

    var proxy = this.nearestOfType(ProxyMixin);
    if (proxy) {
      proxy.register(this);
    }
  },

  processProxy: null
});
