import Ember from 'ember';

export default Ember.Mixin.create({
  classNames:['paper-shadow'],
  classNameBindings:['bottomShadowCSS','animatedShadow:paper-shadow-animated','raised:paper-raised'],
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
