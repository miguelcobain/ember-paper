import Controller from '@ember/controller';
import { computed } from '@ember/object';
import faker from 'faker';

export default Controller.extend({
  numOfRows: 3,

  listData: computed('numOfRows', function() {
    let contacts = [];
    let numOfRows = this.get('numOfRows');

    for (let i = 0; i < numOfRows; i++) {
      contacts.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        img: faker.internet.avatar()
      });
    }

    return contacts;
  }),

  phoneNumbers: Object.freeze([
    {
      number: '(555) 251-1234',
      type: 'Home'
    },
    {
      number: '(555) 786-9841',
      type: 'Mobile'
    },
    {
      number: '(555) 314-1592',
      type: 'Office'
    }
  ]),

  toppings: Object.freeze([
    {
      name: 'Pepperoni',
      enabled: false
    }, {
      name: 'Sausage',
      enabled: false
    }, {
      name: 'Black Olives',
      enabled: true
    }, {
      name: 'Green Peppers',
      enabled: false
    }
  ]),

  messageData: Object.freeze([{
    message: 'Message A'
  }, {
    message: 'Message B'
  }, {
    message: 'Message C'
  }]),

  actions: {
    transitionTo(value) {
      alert(`Imagine you transition to "${value}" here.`);
    },
    transitionToWifiMenu() {
      alert('Imagine you transition to wifi settings here.');
    },
    transitionToBluetoothMenu() {
      alert('Imagine you transition to Bluetooth settings here.');
    },
    secondaryMessageClick() {
      alert('Secondary actions can be used for one click actions.');
    },
    goToPerson(person) {
      alert(`Imagine you transition to the person full view for '${person.name}' here.`);
    },
    secondaryPersonClick(person) {
      alert(`'${person.name}'. Secondary actions can be used for one click actions.`);
    },
    transitionToDataUsage() {
      alert('Imagine you would be taken to data-usage.');
    }
  }

});
