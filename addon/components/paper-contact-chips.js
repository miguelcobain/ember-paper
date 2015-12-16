import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-contact-chips',
  classNames: ['md-default-theme'],

  actions: {
    removeItem: function(item){
      this.sendAction('removeItem', item);
    },

    addItem(item){
      this.sendAction('addItem', item);
    },

    inputFocus(){
      this.set('isFocused', true);
    },

    inputBlur(){
      this.set('isFocused', false);
    }
  }
});
