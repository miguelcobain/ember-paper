import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {

    /* Dialog with parent */
    openDialogWithParent(param, event) {
      this.set('dialogOrigin', Ember.$(event.currentTarget));
      this.set('showDialogWithParent', true);
    },

    closeDialogWithParent(result) {
      this.set('result', result);
      this.set('showDialogWithParent', false);
    },

    /* Dialog */
    openDialog(param, event) {
      this.set('dialogOrigin', Ember.$(event.currentTarget));
      this.set('showDialog', true);
    },

    closeDialog(result) {
      this.set('result', result);
      this.set('showDialog', false);
    },

    /* Prompt dialog */
    dogName: '',
    openPromptDialog(param, event) {
      this.set('dialogOrigin', Ember.$(event.currentTarget));
      this.set('showPromptDialog', true);
    },

    closePromptDialog(result, dogName) {
      if (result === 'ok') {
        result = `${result} and dog named ${dogName}`;
      }
      this.set('result', result);
      this.set('showPromptDialog', false);
    },

    toggleSourceCode() {
      this.toggleProperty('showSourceCode');
    }

  }
});
