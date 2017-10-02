import Ember from 'ember';
const { computed, assign, run, A, Service, tryInvoke, Object: EObject, getOwner } = Ember;

export default Service.extend({
  queue: A(),

  activeToast: computed.reads('queue.firstObject'),

  defaultsOptions: {
    duration: 3000,
    position: 'bottom left'
  },

  init() {
    this._super(...arguments);
    let ENV = getOwner(this).factoryFor('config:environment').class;
    if (ENV['ember-paper'] && ENV['ember-paper']['paper-toaster']) {
      let defaultsAppOptions = ENV['ember-paper']['paper-toaster'];
      ['duration', 'position'].forEach((optKey) => {
        let value = defaultsAppOptions[optKey];
        if (value) {
          this.set(`defaultsOptions.${optKey}`, value);
        }
      });
    }
  },

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
    return assign({}, this.get('defaultsOptions'), options);
  }
});
