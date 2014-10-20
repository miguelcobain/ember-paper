import Ember from 'ember';
import BaseFocusable from './base-focusable';

export default BaseFocusable.extend({
  classNames:['paper-checkbox'],
  classNameBindings:['checked'],
  toggle:true,
  checked:Ember.computed.alias('active'),
  didInsertElement:function(){
    this._super();
    this.$('.paper-checkbox-mark').on('animationend MSAnimationEnd webkitAnimationEnd',
      Ember.$.proxy(this.checkboxAnimationEnd,this));
  },
  willDestroyElement:function(){
    this._super();
    this.$('.paper-checkbox-mark').off('animationend MSAnimationEnd webkitAnimationEnd');
  },
  checkedDidChange:Ember.observer('checked',function(){
    this.setProperties({
      checkmark: !this.get('checked'),
      box: this.get('checked')
    });
  }).on('didInsertElement'),
  checkboxAnimationEnd:function(){
    this.setProperties({
      checkmark: this.get('checked'),
      box: !this.get('checked')
    });
  }
});
