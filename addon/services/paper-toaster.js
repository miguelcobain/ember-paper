import Ember from 'ember';
const { computed, assign, run, A, Service, tryInvoke, Object: EObject } = Ember;

const DEFAULT_PROPS = {
  duration: 3000,
  position: 'bottom left'
};

export default Service.extend({
  queue: A(),

  activeToast: computed.reads('queue.firstObject'),

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
    return assign({}, DEFAULT_PROPS, options);
  }
});
