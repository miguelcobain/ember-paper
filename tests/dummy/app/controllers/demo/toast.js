import Ember from 'ember';

const { inject, Controller } = Ember;

export default Controller.extend({
  duration: 3000,
  positionX: 'left',
  positionY: 'bottom',
  toastText: 'Hello world',
  toastClass: '',

  paperToaster: inject.service(),

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
      this.get('paperToaster').show(this.get('toastText'), {
        duration: 4000,
        toastClass: this.get('toastClass')
      });
    },

    openServiceActionToast() {
      this.get('paperToaster').show(this.get('toastText'), {
        duration: 4000,
        toastClass: this.get('toastClass'),
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
      this.get('paperToaster').cancelToast(toast);
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
