import Ember from 'ember';

const { Component, inject, assert } = Ember;

export default Component.extend({
  constants: inject.service(),

  /* `isOpen` true when toggleMenu action is called, but only turns false when animation to hide the wrapper is done. */
  isOpen: false,

  /* Supports `getItems` that can return a promise, menu is not opened before this promise is resolved by the origin. */
  getItems: null,

  /* async: is true if promise was not resolved. */
  isLoading: false,

  /* cache async requests */
  cache: true,

  preventMenuOpen: false,

  setOpen(newState) {
    this.set('isOpen', newState);
    this.sendAction(newState ? 'onOpenMenu' : 'onCloseMenu');
  },

  actions: {

    toggleMenu() {
      if (this.get('isOpen')) {
        this.get('activeWrapper').hideWrapper().then(() => {
          this.setOpen(false);
        });
      } else {
        if (this.get('preventMenuOpen')) {
          return;
        }
        if (this.get('getItems') && (!this.get('items') || !this.get('cache'))) {
          this.set('activeWrapper', null);
          this.set('isLoading', true);
          this.setOpen(true);
          let promise = this.get('getItems').call(this);
          promise.then((data) => {
            this.set('items', data);
            this.set('isLoading', false);
          }, () => {
            this.set('items', Ember.A([]));
            this.setOpen(false);
            this.set('isLoading', false);
          });
        } else {
          this.set('activeWrapper', null);
          this.setOpen(true);
        }
      }
    }
  },

  didReceiveAttrs() {
    Ember.run.scheduleOnce('afterRender', () => {
      let wrapper = this.get('activeWrapper');
      if (wrapper && !wrapper.get('isDestroyed') && !wrapper.get('isDestroying')) {
        this.positionMenu(wrapper.$());
      }
    });
  },

  registerWrapper(component) {
    this.set('activeWrapper', component);
    this.positionMenu(component.$());
  },

  positionMenu(el) {
    assert(`Override positionMenu to create custom animation for the menu component: ${el} ${this.get('activeWrapper')}`);
  }

});
