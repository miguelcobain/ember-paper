import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';

var KEY_CODE_SPACE = 32;

export default BaseFocusable.extend(RippleMixin,{
  classNames:['paper-checkbox'],
  classNameBindings:['checked:paper-checked'],

  //Alow element to be focusable by supplying a tabindex 0
  attributeBindings:['tabindex'],
  tabindex:function(){
    return this.get('disabled') ? '-1' : '0';
  }.property('disabled'),
  checked:false,

  toggle:true,
  rippleContainerSelector:'.paper-container',

  center: true,
  animationDuration: 300,
  mousedownPauseTime: 180,
  animationName: 'inkRippleCheckbox',
  animationTimingFunction: 'linear',

  click:function(){
    if(!this.get('disabled')){
      this.toggleProperty('checked');
    }
  },
  keyPress:function(ev){
    if(ev.which === KEY_CODE_SPACE) {
      this.click();
    }
  }
});
