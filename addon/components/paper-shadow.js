import Ember from 'ember';

export default Ember.Component.extend({
  classNames:['paper-shadow'],
  classNameBindings:['topShadowCSS','bottomShadowCSS','animated:paper-shadow-animated'],
  topShadowCSS:Ember.computed('z',function(){
    var z = this.get('z');
    return z?'paper-shadow-top-z-'+z:'';
  }),
  bottomShadowCSS:Ember.computed('z',function(){
    var z = this.get('z');
    return z?'paper-shadow-bottom-z-'+z:'';
  })
});
