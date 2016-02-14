import Ember from 'ember';

export default Ember.Component.extend({
  constants: Ember.inject.service(),

  'is-open': false,

  /* this is true when toggleMenu action is called, but only turns false when animation to hide the wrapper is done. */
  isOpen: Ember.computed.alias('is-open'),

  /* Supports a on-open that can return a promise, menu is not opened before this promise is resolved by the origin. */
  onOpen: Ember.computed.alias('on-open'),

  /* async: is true if promise was not resolved. */
  isLoading: false,

  /* cache async requests */
  cache: true,

  preventMenuOpen: false,

  itemLabelCallback: Ember.computed.alias('item-label-callback'),

  actions: {

    toggleMenu() {
      let _self = this;
      if (this.get('isOpen')) {
        this.get('activeWrapper').hideWrapper().then(function() {
          _self.set('isOpen', false);
        });
      } else {
        if (this.get('preventMenuOpen')) {
          return;
        }
        if (this.get('onOpen') && (!this.get('items') || this.get('cache') === false)) {
          _self.set('activeWrapper', null);
          _self.set('isLoading', true);
          _self.set('isOpen', true);
          let promise = this.get('onOpen').call(this);
          promise.then(function(data) {
            _self.set('items', data);
            _self.set('isLoading', false);
          }, function() {
            _self.set('items', Ember.A([]));
            _self.set('isOpen', false);
            _self.set('isLoading', false);
          });
        } else {
          this.set('activeWrapper', null);
          this.set('isOpen', true);
        }
      }
    }
  },

  _itemObserver: Ember.observer('items', function() {
    let _self = this;
    Ember.run.scheduleOnce('afterRender', function() {
      if (_self.get('activeWrapper')) {
        _self.positionMenu(_self.get('activeWrapper').$());
      }
    });
  }),

  registerWrapper(component) {
    this.set('activeWrapper', component);
    this.positionMenu(component.$());
  },

  positionMenu(el) {
    console.error('Could not use positionMenu, you will need to override this to create custom animation for the menu component', el,  this.get('activeWrapper'));
  }

});
