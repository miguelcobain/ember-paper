import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Controller {
  @service paperToaster;

  @tracked duration = 3000;
  @tracked positionX = 'left';
  @tracked positionY = 'bottom';
  @tracked toastText = 'Hello world';
  @tracked toastClass = '';

  @action
  openToast() {
    this.showToast = true;
  }

  @action
  openToastWithout() {
    this.showToastWithout = true;
  }

  // BEGIN-SNIPPET toast.programatic
  @action
  openServiceToast() {
    this.paperToaster.show(this.toastText, {
      duration: 4000,
      toastClass: this.toastClass
    });
  }

  @action
  openServiceActionToast() {
    console.log({
      duration: 4000,
      toastClass: this.toastClass,
      position: 'top right',
    });
    this.paperToaster.show(this.toastText, {
      duration: 4000,
      toastClass: this.toastClass,
      position: 'top right',
      action: {
        label: 'Undo',
        accent: true,
        onClick() {
          alert('toast action pressed');
        }
      }
    });
  }
  // END-SNIPPET

  @action
  cancelToast(toast) {
    this.paperToaster.cancelToast(toast);
  }

  @action
  closeToast() {
    this.showToast = false;
  }

  @action
  closeToastWithout() {
    this.showToastWithout = false;
  }

  @action
  buttonAction() {
    alert('You have pressed the button!');
  }
}
