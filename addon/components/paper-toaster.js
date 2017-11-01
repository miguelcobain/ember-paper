import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/paper-toaster';

export default Component.extend({
  layout,
  tagName: '',
  paperToaster: service(),
  activeToast: reads('paperToaster.activeToast'),

  onClose(toast) {
    this.get('paperToaster').cancelToast(toast);
  }
});
