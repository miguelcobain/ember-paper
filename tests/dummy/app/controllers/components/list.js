import Controller from '@ember/controller';
import { action } from '@ember/object';
import faker from 'faker';

export default class extends Controller {
  numOfRows = 3;

  get listData() {
    let contacts = [];

    for (let i = 0; i < this.numOfRows; i++) {
      contacts.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        img: faker.internet.avatar()
      });
    }

    return contacts;
  }

  phoneNumbers = Object.freeze([
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
  ]);

  toppings = Object.freeze([
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
  ]);

  messageData = Object.freeze([{
    message: 'Message A'
  }, {
    message: 'Message B'
  }, {
    message: 'Message C'
  }]);

  @action
  transitionTo(value) {
    alert(`Imagine you transition to "${value}" here.`);
  }

  @action
  transitionToWifiMenu() {
    alert('Imagine you transition to wifi settings here.');
  }

  @action
  transitionToBluetoothMenu() {
    alert('Imagine you transition to Bluetooth settings here.');
  }

  @action
  secondaryMessageClick() {
    alert('Secondary actions can be used for one click actions.');
  }

  @action
  goToPerson(person) {
    alert(`Imagine you transition to the person full view for '${person.name}' here.`);
  }

  @action
  secondaryPersonClick(person) {
    alert(`'${person.name}'. Secondary actions can be used for one click actions.`);
  }

  @action
  transitionToDataUsage() {
    alert('Imagine you would be taken to data-usage.');
  }

}
