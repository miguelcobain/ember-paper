import Ember from 'ember';
const { $ } = Ember;

export default Ember.Controller.extend({
  api: [
    ['parent', 'jQuery object, element or selector', 'Existing element where the modal and backdrop will be rendered'],
    ['origin', 'jQuery object, element, or selector', 'If present, the dialog will use it as openFrom and closeTo. Also, focus will be returned to this element once the dialog closes.'],
    ['closeTo', 'jQuery object, element or selector', 'Target for closing the dialog with a transition.'],
    ['fullscreen', 'boolean', 'Causes the dialog to become fullscreen at smaller breakpoints.'],
    ['clickOutsideToClose', 'boolean', 'Causes clicking on the backdrop to trigger the `onClose` handler.'],
    ['focusOnOpen', 'boolean', 'Causes the initial focus to be on an inner element with the autofocus attribute, rather than the last button inside `{{paper-dialog-actions}}`. Defaults to `true`.'],
    ['escapeToClose', 'boolean', 'Causes pressing escape to close the dialog. Defaults to `true`.']
  ],
  actionsApi: [
    ['', '', 'Actions'],
    ['onClose', 'action', 'An action to be executed when the dialog is closed, e.g. by pressing escape.']
  ],

  actions: {

    /* Dialog with parent */
    openDialogWithParent(event) {
      this.set('dialogOrigin', $(event.currentTarget));
      this.set('showDialogWithParent', true);
    },

    closeDialogWithParent(result) {
      this.set('result', result);
      this.set('showDialogWithParent', false);
    },

    /* Dialog */
    openDialog(event) {
      this.set('dialogOrigin', $(event.currentTarget));
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
    }

  }
});
