/* eslint-disable ember/no-actions-hash */
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  duration: 3000,
  positionX: 'left',
  positionY: 'bottom',
  toastText: 'Hello world',
  toastClass: '',

  paperToaster: service(),

  actions: {
    /* Toast */
    openToast() {
      this.set('showToast', true);
    },
    openToastWithout() {
      this.set('showToastWithout', true);
    },
    // BEGIN-SNIPPET toaster
    openServiceToast() {
      this.paperToaster.show(this.toastText, {
        duration: 4000,
        toastClass: this.toastClass
      });
    },

    openServiceActionToast() {
      this.paperToaster.show(this.toastText, {
        duration: 4000,
        toastClass: this.toastClass,
        action: {
          label: 'Undo',
          accent: true,
          onClick() {
            alert('toast action pressed');
          }
        }
      });
    },
    // END-SNIPPET
    cancelToast(toast) {
      this.paperToaster.cancelToast(toast);
    },
    closeToast() {
      this.set('showToast', false);
    },
    closeToastWithout() {
      this.set('showToastWithout', false);
    },
    toggleSourceCode() {
      this.toggleProperty('showSourceCode');
    },
    buttonAction() {
      alert('You have pressed the button!');
    }
  }
});
