import { filter } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import faker from 'faker';

export default Controller.extend({
  fruitNames: A(['Apple', 'Banana', 'Orange']),

  customFruitNames: A(['Apple', 'Banana', 'Orange']),

  numOfContacts: 10,

  contacts: computed('numOfContacts', function() {
    let contacts = [];
    let numOfContacts = this.get('numOfContacts');

    for (let i = 0; i < numOfContacts; i++) {
      contacts.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        image: faker.internet.avatar()
      });
    }

    return contacts;
  }),

  selectedContacts: filter('contacts', function(c, index) {
    return index % 2 === 0;
  }),

  remainingContacts: computed('contacts.[]', 'selectedContacts.[]', function() {
    return this.get('contacts').filter((c) => {
      return this.get('selectedContacts').indexOf(c) === -1;
    });
  }),

  altContacts: computed('numOfContacts', function() {
    let contacts = [];
    let numOfContacts = this.get('numOfContacts');

    for (let i = 0; i < numOfContacts; i++) {
      let firstName = faker.name.firstName();
      let lastName = faker.name.lastName();

      contacts.push({
        shortName: `${firstName} ${lastName[0]}`,
        emailAddress: `${firstName.toLowerCase()}.${lastName[0].toLowerCase()}@example.com`,
        profileImage: faker.internet.avatar()
      });
    }

    return contacts;
  }),

  selectedAltContacts: filter('altContacts', function(c, index) {
    return index % 2 === 0;
  }),

  remainingAltContacts: computed('altContacts.[]', 'selectedAltContacts.[]', function() {
    return this.get('altContacts').filter((c) => {
      return this.get('selectedAltContacts').indexOf(c) === -1;
    });
  }),

  vegetables: A([{
    name: 'Broccoli',
    family: 'Brassica'
  }]),

  allVegetables: A([{
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

  remainingVegetables: computed('allVegetables.@each.name', 'vegetables.@each.name', function() {
    return this.get('allVegetables').filter((source) => {
      return !this.get('vegetables').any(function(myVegetable) {
        return source.name === myVegetable.name;
      });
    });
  }),

  vegeNames: A(['Broccoli']),

  allVegeNames: A(['Broccoli', 'Cabbage', 'Carrot', 'Lettuce', 'Spinach']),

  remainingVegeNames: computed('vegeNames.length', function() {
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
      this.get('selectedContacts').pushObject(item);
    },

    removeContact(item) {
      this.get('selectedContacts').removeObject(item);
    },

    addAltContact(item) {
      this.get('selectedAltContacts').pushObject(item);
    },

    removeAltContact(item) {
      this.get('selectedAltContacts').removeObject(item);
    }
  }
});
