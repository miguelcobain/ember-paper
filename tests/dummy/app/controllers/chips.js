import Ember from 'ember';

export default Ember.Controller.extend({
  fruitNames: Ember.A(['Apple', 'Banana', 'Orange']),

  customFruitNames: Ember.A(['Apple', 'Banana', 'Orange']),

  actions: {
    removeItem(item){
      this.get('fruitNames').removeObject(item);
    },

    addItem(item){
      this.get('fruitNames').pushObject(item);
    },

    removeCustomItem(item){
      this.get('customFruitNames').removeObject(item);
    },

    addCustomItem(item){
      this.get('customFruitNames').pushObject(item);
    }
  }
});
