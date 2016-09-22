import Ember from 'ember';

export default Ember.Controller.extend({
  fruitNames: Ember.A(['Apple', 'Banana', 'Orange']),

  customFruitNames: Ember.A(['Apple', 'Banana', 'Orange']),

  contacts: Ember.A([{
    name: 'James',
    email: 'james@ember.com',
    image: 'tomster.png'
  }]),

  allContacts: Ember.A([{
    name: 'James',
    email: 'james@ember.com',
    image: 'tomster.png'
  }, {
    name: 'Chris',
    email: 'chris@ember.com',
    image: 'tomster.png'
  }]),

  remainingContacts: Ember.computed('allContacts.@each.email', 'contacts.@each.email', function() {
    return this.get('allContacts').filter((source) => {
      return !this.get('contacts').any(function(myContact) {
        return source.email === myContact.email;
      });
    });
  }),

  vegetables: Ember.A([{
    name: 'Broccoli',
    family: 'Brassica'
  }]),

  allVegetables: Ember.A([{
    name: 'Broccoli',
    family: 'Brassica'
  }, {
    name: 'Cabbage',
    family: 'Brassica'
  }, {
    name: 'Carrot',
    family: 'Umbelliferous'
  }, {
    name: 'Lettuce',
    family: 'Composite'
  }, {
    name: 'Spinach',
    family: 'Goosefoot'
  }]),

  remainingVegetables: Ember.computed('allVegetables.@each.name', 'vegetables.@each.name', function() {
    return this.get('allVegetables').filter((source) => {
      return !this.get('vegetables').any(function(myVegetable) {
        return source.name === myVegetable.name;
      });
    });
  }),

  vegeNames: Ember.A(['Broccoli']),

  allVegeNames: Ember.A(['Broccoli', 'Cabbage', 'Carrot', 'Lettuce', 'Spinach']),

  remainingVegeNames: Ember.computed('vegeNames.length', function() {
    return this.get('allVegeNames').filter((source) => {
      return !this.get('vegeNames').any(function(myVegeName) {
        return source === myVegeName;
      });
    });
  }),

  actions: {
    removeItem(item) {
      this.get('fruitNames').removeObject(item);
    },

    addItem(item) {
      this.get('fruitNames').pushObject(item);
    },

    removeCustomItem(item) {
      this.get('customFruitNames').removeObject(item);
    },

    addCustomItem(item) {
      this.get('customFruitNames').pushObject(item);
    },

    removeVegetable(item) {
      this.get('vegetables').removeObject(item);
    },

    addVegetable(item) {
      this.get('vegetables').pushObject(item);
    },

    removeVegeName(item) {
      this.get('vegeNames').removeObject(item);
    },

    addVegeName(item) {
      this.get('vegeNames').pushObject(item);
    },

    addContact(item) {
      this.get('contacts').pushObject(item);
    },

    removeContact(item) {
      this.get('contacts').removeObject(item);
    }
  }
});
