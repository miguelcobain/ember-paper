/* eslint-disable ember/no-actions-hash */
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  validationApi: Object.freeze([
    ['message', 'string', 'The text you want to display to the user when there is an error.'],
    ['validate', 'function', "A validator that returns a falsy value when the validation message should be displayed. The function receives one argument: the input's value."]
  ]),

  usernameValidator: computed('model.username.length', function() {
    if (!this.model?.username?.length) {
      return [`This field can't be blank`];
    }

    return [];
  }),

  passwordValidator: computed('model.password.length', function() {
    if(!this.model?.password?.length) {
      return [`This field can't be blank`];
    }

    if(this.model?.password?.length < 4) {
      return [`This field is too short (minimum is 4 characters)`];
    }

    // FYI never do this, this is bad validation and just for demonstration
    // purposes ;)
    if(this.model?.password?.length > 8) {
      return [`This field is too long (maximum is 8 characters)`];
    }

    return [];
  }),

  emailValidator: computed('model.email.length', function() {
    if(!this.model?.email?.length) {
      return [`This field can't be blank`];
    }

    if(!this.model?.email?.match(/.+@.+\..+/)) {
      return [`This field must be a valid email address`];
    }


    return [];
  }),

  // https://github.com/ember-cli/eslint-plugin-ember/issues/782
  // eslint-disable-next-line ember/use-brace-expansion
  emailConfirmationValidator: computed('model.emailConfirmation.length', 'model.email', function() {
    if(!this.model?.emailConfirmation?.length) {
      return [`This field can't be blank`];
    }

    if(this.model?.email !== this.model?.emailConfirmation) {
      return [`Emails do not match`];
    }

    return [];
  }),

  /* eslint-disable ember/avoid-leaking-state-in-ember-objects */
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

  user: {},
  /* eslint-enable ember/avoid-leaking-state-in-ember-objects */

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
