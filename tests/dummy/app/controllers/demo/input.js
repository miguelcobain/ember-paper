import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({

  // BEGIN-SNIPPET input.controller.multiple-constraints
  multipleConstraints: [{
    message: 'Value is not even',
    validate: (inputValue) => (+inputValue % 2) === 0
  }, {
    message: 'Value does not equal 4',
    validate: (inputValue) => +inputValue === 4
  }],
  // END-SNIPPET

  // BEGIN-SNIPPET input.controller.single-constraint
  singleContraint: [{
    message: 'Value does not equal 16',
    validate: (inputValue) => +inputValue === 16
  }],
  // END-SNIPPET

  // BEGIN-SNIPPET input.controller.email-validation
  emailValidation: [{
    message: 'Please provide email in a valid format',
    validate: (inputValue) => {
      let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(inputValue);
    }
  }],
  // END-SNIPPET

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
