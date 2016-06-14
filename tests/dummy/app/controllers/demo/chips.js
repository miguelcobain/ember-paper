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

    addContact(item) {
      this.get('contacts').pushObject(item);
    },

    removeContact(item) {
      this.get('contacts').removeObject(item);
    }
  }
});
