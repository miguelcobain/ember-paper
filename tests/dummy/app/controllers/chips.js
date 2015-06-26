import Ember from 'ember';

export default Ember.Controller.extend({
  fruitNames: Ember.A(['Apple', 'Banana', 'Orange']),

  actions: {
    removeItem(item){
      this.get('fruitNames').removeObject(item);
    },

    addItem(item){
      this.get('fruitNames').pushObject(item);
    }
  }
});
