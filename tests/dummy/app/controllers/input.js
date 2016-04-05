import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({

  multipleConstraints: [
    {
      'errorMessage': 'Value is not even',
      'isError': (inputValue) => {
        return (+inputValue % 2) === 1;
      }
    },
    {
      'errorMessage': 'Value does not equal 4',
      'isError': (inputValue) => {
        return +inputValue !== 4;
      }
    }
  ],

  singleContraint: {
    'errorMessage': 'Value does not equal 16',
    'isError': (inputValue) => {
      return +inputValue !== 16;
    }
  },

  emailValidation: {
    'errorMessage': 'Please provide email in a valid format',
    'isError': (inputValue) => {
      let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return !emailPattern.test(inputValue);
    }
  },

  eventName: '',
  actions: {
    focusReceived() {
      this.set('eventName', 'focus');
    },

    blurReceived() {
      this.set('eventName', 'blur');
    },

    keyDownReceived() {
      this.set('eventName', 'keyDown');
    },

    enterReceived() {
      this.set('eventName', 'enter');
    }

  }
});
