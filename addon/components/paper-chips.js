import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-chips',
  classNames: ['md-default-theme'],

  actions: {
    removeItem: function(item){
      this.sendAction('removeItem', item);
    },

    addItem(){
      if(this.get('newItem.length')){
        this.sendAction('addItem', this.get('newItem'));
        this.set('newItem', '');
      }
    },

    inputFocus(){
      this.set('isFocused', true);
    },

    inputBlur(){
      this.set('isFocused', false);
    }
  }
});
