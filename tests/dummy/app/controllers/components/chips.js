import Controller from '@ember/controller';
import { action } from '@ember/object';
import { A } from '@ember/array';
import faker from 'faker';

function getContacts(amount) {
  let contacts = [];

  for (let i = 0; i < amount; i++) {
    contacts.push({
      name: faker.name.findName(),
      email: faker.internet.email(),
      image: faker.internet.avatar()
    });
  }

  return contacts;
}

function getAltContacts(numOfContacts) {
  let contacts = [];

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
}

export default class extends Controller {
  numOfContacts = 10;

  contacts = getContacts(10);

  selectedContacts = A(this.contacts.filter((c, index) => index % 2 === 0));

  altContacts = getAltContacts(10);

  selectedAltContacts = A(this.altContacts.filter((c, index) => index % 2 === 0));

  fruitNames = A(['Apple', 'Banana', 'Orange']);

  customFruitNames = A(['Apple', 'Banana', 'Orange']);

  vegetables = A([{
    name: 'Broccoli',
    family: 'Brassica'
  }]);

  allVegetables = A([{
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
  }]);

  vegeNames = A(['Broccoli']);

  allVegeNames = A(['Broccoli', 'Cabbage', 'Carrot', 'Lettuce', 'Spinach']);

  get remainingContacts() {
    return this.contacts.filter((c) => {
      return this.selectedContacts.indexOf(c) === -1;
    });
  }

  get remainingAltContacts() {
    return this.altContacts.filter((c) => {
      return this.selectedAltContacts.indexOf(c) === -1;
    });
  }

  get remainingVegetables() {
    return this.allVegetables.filter((source) => {
      return !this.vegetables.some(function(myVegetable) {
        return source.name === myVegetable.name;
      });
    });
  }

  get remainingVegeNames() {
    return this.allVegeNames.filter((source) => {
      return !this.vegeNames.some(function(myVegeName) {
        return source === myVegeName;
      });
    });
  }

  @action
  removeItem(item) {
    this.fruitNames.removeObject(item);
  }

  @action
  addItem(item) {
    this.fruitNames.pushObject(item);
  }

  @action
  removeCustomItem(item) {
    this.customFruitNames.removeObject(item);
  }

  @action
  addCustomItem(item) {
    this.customFruitNames.pushObject(item);
  }

  @action
  removeVegetable(item) {
    this.vegetables.removeObject(item);
  }

  @action
  addVegetable(item) {
    this.vegetables.pushObject(item);
  }

  @action
  removeVegeName(item) {
    this.vegeNames.removeObject(item);
  }

  @action
  addVegeName(item) {
    this.vegeNames.pushObject(item);
  }

  @action
  addContact(item) {
    this.selectedContacts.pushObject(item);
  }

  @action
  removeContact(item) {
    this.selectedContacts.removeObject(item);
  }

  @action
  addAltContact(item) {
    this.selectedAltContacts.pushObject(item);
  }

  @action
  removeAltContact(item) {
    this.selectedAltContacts.removeObject(item);
  }
}
