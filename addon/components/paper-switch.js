import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';

export default BaseFocusable.extend(RippleMixin,{
  tagName:'md-switch',
  classNames:['paper-switch','md-default-theme'],
  classNameBindings:['checked:md-checked'],
  toggle:true,

  center: true,
  rippleContainerSelector:'.md-thumb',

  click:function(){
    if(!this.get('disabled')){
      this.toggleProperty('checked');
    }
  }
});
