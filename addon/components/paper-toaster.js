/* eslint-disable ember/no-classic-components */
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  paperToaster: service(),
  activeToast: reads('paperToaster.activeToast'),

  onClose(toast) {
    this.paperToaster.cancelToast(toast);
  },
});
