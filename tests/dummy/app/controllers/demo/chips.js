/* eslint-disable ember/require-computed-property-dependencies, ember/no-actions-hash */
import { filter } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { faker } from '@faker-js/faker';

export default Controller.extend({
  fruitNames: A(['Apple', 'Banana', 'Orange']),

  customFruitNames: A(['Apple', 'Banana', 'Orange']),

  numOfContacts: 10,

  contacts: computed('numOfContacts', function() {
    let contacts = [];
    let numOfContacts = this.numOfContacts;

    for (let i = 0; i < numOfContacts; i++) {
      contacts.push({
        name: faker.person.fullName(),
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
    return this.contacts.filter((c) => {
      return this.selectedContacts.indexOf(c) === -1;
    });
  }),

  altContacts: computed('numOfContacts', function() {
    let contacts = [];
    let numOfContacts = this.numOfContacts;

    for (let i = 0; i < numOfContacts; i++) {
      let firstName = faker.person.firstName();
      let lastName = faker.person.lastName();

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
    return this.altContacts.filter((c) => {
      return this.selectedAltContacts.indexOf(c) === -1;
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
    return this.allVegetables.filter((source) => {
      return !this.vegetables.any(function(myVegetable) {
        return source.name === myVegetable.name;
      });
    });
  }),

  vegeNames: A(['Broccoli']),

  allVegeNames: A(['Broccoli', 'Cabbage', 'Carrot', 'Lettuce', 'Spinach']),

  remainingVegeNames: computed('vegeNames.length', function() {
    return this.allVegeNames.filter((source) => {
      return !this.vegeNames.any(function(myVegeName) {
        return source === myVegeName;
      });
    });
  }),

  actions: {
    removeItem(item) {
      this.fruitNames.removeObject(item);
    },

    addItem(item) {
      this.fruitNames.pushObject(item);
    },

    removeCustomItem(item) {
      this.customFruitNames.removeObject(item);
    },

    addCustomItem(item) {
      this.customFruitNames.pushObject(item);
    },

    removeVegetable(item) {
      this.vegetables.removeObject(item);
    },

    addVegetable(item) {
      this.vegetables.pushObject(item);
    },

    removeVegeName(item) {
      this.vegeNames.removeObject(item);
    },

    addVegeName(item) {
      this.vegeNames.pushObject(item);
    },

    addContact(item) {
      this.selectedContacts.pushObject(item);
    },

    removeContact(item) {
      this.selectedContacts.removeObject(item);
    },

    addAltContact(item) {
      this.selectedAltContacts.pushObject(item);
    },

    removeAltContact(item) {
      this.selectedAltContacts.removeObject(item);
    }
  }
});
