import Ember from 'ember';

export default Ember.Controller.extend({
  listData: Ember.A([{
    face: 'tomster.png',
    who: 'tomster 1',
    what: 'a message for you',
    notes: 'this is a message for you about ember'
  }, {
    face: 'tomster.png',
    who: 'tomster 2',
    what: 'a message for you',
    notes: 'this is a message for you about ember'
  }, {
    face: 'tomster.png',
    who: 'tomster 3',
    what: 'a message for you',
    notes: 'this is a message for you about ember'
  }, {
    face: 'tomster.png',
    who: 'tomster 4',
    what: 'a message for you',
    notes: 'this is a message for you about ember'
  }, {
    face: 'tomster.png',
    who: 'tomster 5',
    what: 'a message for you',
    notes: 'this is a message for you about ember'
  }]),

  messageData: Ember.A([{
    message: 'Message A'
  }, {
    message: 'Message B'
  }, {
    message: 'Message C'
  }]),

  actions: {
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
      alert(`Imagine you transition to the person full view for '${person.who}' here.`);
    },
    secondaryPersonClick(person) {
      alert(`'${person.who}'. Secondary actions can be used for one click actions.`);
    },
    transitionToDataUsage() {
      alert('Imagine you would be taken to data-usage.');
    }
  }

});
