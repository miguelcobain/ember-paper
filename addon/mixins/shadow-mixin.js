import Ember from 'ember';

export default Ember.Mixin.create({
  classNameBindings:[
    'raised:md-raised'
  ],
  raised:false,
  animatedShadow:true,
  bottomShadowCSS:Ember.computed('z',function(){
    var raised = this.get('raised'),
      disabled = this.get('disabled');
    if(!raised || disabled){
      return;
    }
    var z = this.get('z');
    return z?'paper-shadow-bottom-z-'+z:'';
  })
});
