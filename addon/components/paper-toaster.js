import Ember from 'ember';
import layout from '../templates/components/paper-toaster';

const { computed, inject, Component } = Ember;

export default Component.extend({
  layout,
  tagName: '',
  paperToaster: inject.service(),
  activeToast: computed.reads('paperToaster.activeToast'),

  onClose(toast) {
    this.get('paperToaster').cancelToast(toast);
  }
});
