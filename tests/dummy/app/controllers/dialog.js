import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {

    /* Dialog with parent */
    openDialogWithParent(param, event) {
      this.set('dialogWithParentOrigin', Ember.$(event.currentTarget));
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

    toggleSourceCode() {
      this.toggleProperty('showSourceCode');
    }

  }
});
