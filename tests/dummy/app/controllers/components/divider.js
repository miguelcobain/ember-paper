import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
  showSourceCodeFull: false,
  showSourceCodeInset: false,

  messages: A([{
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

  actions: {

    toggleSourceCodeFull() {
      this.toggleProperty('showSourceCodeFull');
    },

    toggleSourceCodeInset() {
      this.toggleProperty('showSourceCodeInset');
    }

  }
});
