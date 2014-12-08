import BaseFocusable from './base-focusable';

export default BaseFocusable.extend({
  classNames:['paper-toggle'],
  toggle:true,

  click:function(){
    if(!this.get('disabled')){
      this.toggleProperty('value');
    }
  }
});
