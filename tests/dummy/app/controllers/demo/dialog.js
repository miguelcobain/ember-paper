import Controller from '@ember/controller';

export default Controller.extend({
  actions: {

    /* Dialog with parent */
    openDialogWithParent(event) {
      this.set('dialogOrigin', event.currentTarget);
      this.set('showDialogWithParent', true);
    },

    closeDialogWithParent(result) {
      this.set('result', result);
      this.set('showDialogWithParent', false);
    },

    /* Dialog */
    openDialog(event) {
      this.set('dialogOrigin', event.currentTarget);
      this.set('showDialog', true);
    },

    closeDialog(result) {
      this.set('result', result);
      this.set('showDialog', false);
    },

    /* Prompt dialog */
    dogName: '',
    openPromptDialog(/* param, event */) {
      this.set('dialogOrigin', null);
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
    },

    /* Animated dialog */
    openAnimatedDialog() {
      this.set('showAnimatedDialog', true);
    },

    closeAnimatedDialog() {
      this.set('showAnimatedDialog', false);
    }

  }
});
