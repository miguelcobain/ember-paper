import Ember from 'ember';
import BaseFocusable from './base-focusable';
import ShadowMixin from '../mixins/shadow-mixin';
import RippleMixin from '../mixins/ripple-mixin';

export default BaseFocusable.extend(ShadowMixin,RippleMixin,{
  attributeBindings: ['target', 'action'],
  tagName:'button',
  classNames:['md-button','md-default-theme'],

  /* RippleMixin overrides */
  center: false,
  dimBackground: true,

  /* ShadowMixin properties */
  z:1,

  defaultZ:1,
  activeZ:2,
  disabledZ:0,

  /*
   * Function that handles button state changes.
   * Changes z and sends action.
   */
  stateDidChange:Ember.observer('active','focus','disabled','hover',function(){
    var active = this.get('active'),
      disabled = this.get('disabled'),
      hover = this.get('hover'),
      focus = this.get('focus');
    if (active || focus || hover) {
      this.set('z',this.get('activeZ'));
    } else if (disabled) {
      this.set('z',this.get('disabledZ'));
    } else {
      this.set('z',this.get('defaultZ'));
    }
  }),

  click:function(){
    var target = this.get('target');

    if (target) {
      this.get('target').send(this.get('action'));

      if (typeof this.get('bubbles') !== 'undefined' && !this.get('bubbles')) {
        return;
      }
    }

    this.sendAction();
  }
});
