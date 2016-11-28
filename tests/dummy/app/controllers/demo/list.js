import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  names: [
    'Marina Augustine',
    'Oddr Sarno',
    'Nick Giannopoulos'
  ],

  listData: computed.map('names', function(c, index) {
    let [firstName, lastName] = c.split(' ');
    return {
      name: c,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      img: `http://lorempixel.com/50/50/people?${index}`
    };
  }),

  phoneNumbers: [
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
  ],

  toppings: [
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
  ],

  messageData: [{
    message: 'Message A'
  }, {
    message: 'Message B'
  }, {
    message: 'Message C'
  }],

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
