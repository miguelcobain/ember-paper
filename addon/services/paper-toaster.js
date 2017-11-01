import { reads } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import { run } from '@ember/runloop';
import { A } from '@ember/array';
import Service from '@ember/service';
import { tryInvoke } from '@ember/utils';
import EObject from '@ember/object';
import config from 'ember-get-config';

const DEFAULT_PROPS = {
  duration: 3000,
  position: 'bottom left'
};

export default Service.extend({
  queue: A(),

  activeToast: reads('queue.firstObject'),

  show(text, options) {
    let t = EObject.create(assign({ text, show: true }, this.buildOptions(options)));
    this.get('queue').pushObject(t);
    return t;
  },

  showComponent(componentName, options) {
    let t = EObject.create(assign({ componentName, show: true }, this.buildOptions(options)));
    this.get('queue').pushObject(t);
    return t;
  },

  cancelToast(toast) {
    toast.set('show', false);

    if (this.get('activeToast') === toast) {
      run.later(() => {
        tryInvoke(toast, 'onClose');
        this.get('queue').removeObject(toast);
      }, 400);
    } else {
      tryInvoke(toast, 'onClose');
      this.get('queue').removeObject(toast);
    }
  },

  buildOptions(options) {
    let toasterOptions = {};
    if (config['ember-paper'] && config['ember-paper']['paper-toaster']) {
      toasterOptions = config['ember-paper']['paper-toaster'];
    }
    return assign({}, DEFAULT_PROPS, toasterOptions, options);
  }
});
