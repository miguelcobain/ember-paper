import Ember from 'ember';
import ProxyMixin from './proxy-mixin';

export default Ember.Mixin.create({
  init(){
  	this._super(...arguments);
  	Ember.run(()=>{
  		Ember.run.scheduleOnce('afterRender', this, 'registerProxy');
  	});
	
  },
  registerProxy(){
  	let proxy = this.nearestOfType(ProxyMixin);
  	if (proxy) {
  	  proxy.register(this);
    }
  },
  processProxy: null
});
