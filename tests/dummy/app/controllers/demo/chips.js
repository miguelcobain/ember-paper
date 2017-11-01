import { map, filter } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Controller.extend({
  fruitNames: A(['Apple', 'Banana', 'Orange']),

  customFruitNames: A(['Apple', 'Banana', 'Orange']),

  names: [
    'Marina Augustine',
    'Oddr Sarno',
    'Nick Giannopoulos',
    'Narayana Garner',
    'Anita Gros',
    'Megan Smith',
    'Tsvetko Metzger',
    'Hector Simek',
    'Some-guy withalongalastaname'
  ],

  contacts: map('names', function(c, index) {
    let [firstName, lastName] = c.split(' ');
    return {
      name: c,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      image: `http://lorempixel.com/50/50/people?${index}`
    };
  }),

  selectedContacts: filter('contacts', function(c) {
    return c.name.startsWith('N');
  }),

  remainingContacts: computed('contacts.[]', 'selectedContacts.[]', function() {
    return this.get('contacts').filter((c) => {
      return this.get('selectedContacts').indexOf(c) === -1;
    });
  }),

  altContacts: map('names', function(c, index) {
    let [firstName, lastName] = c.split(' ');
    let [lastInitial] = lastName; // Grab first letter of last name.
    return {
      shortName: `${firstName} ${lastInitial}`,
      emailAddress: `${firstName.toLowerCase()}.${lastInitial.toLowerCase()}@example.com`,
      profileImage: `http://lorempixel.com/50/50/abstract?${index}`
    };
  }),

  selectedAltContacts: filter('altContacts', function(c) {
    return c.shortName.startsWith('N');
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
