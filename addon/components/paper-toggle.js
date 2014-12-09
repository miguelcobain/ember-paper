import BaseFocusable from './base-focusable';

export default BaseFocusable.extend({
  tagName:'md-switch',
  classNames:['md-switch','md-default-theme'],
  toggle:true,

  click:function(){
    if(!this.get('disabled')){
      this.toggleProperty('value');
    }
  }
});
