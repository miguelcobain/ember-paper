import Ember from 'ember';

export default Ember.Mixin.create({
  classNameBindings: ['animated:ng-enter'],

  /**
   * Wait for redraw so we can add add animation classes
   * See CSS redraw / repaint for more details.
   */
    reDraw (element) {
    return new Ember.RSVP.Promise(function (resolve) {
      setTimeout(function() {
        // These are just meant to be called so browser to a repaint.
        /* jshint ignore:start */
        element[0].offsetHeight;
        element[0].getComputedStyle;
        /* jshint ignore:end */
        resolve(element);
      },0);
    });
  },

  _animateOnInsert: Ember.on('didInsertElement', function () {
    var _self = this;
    this.reDraw(this.$()).then(function () {
      _self.$().addClass('ng-enter-active');
    });
  }),

  _animateOnDestroy: Ember.on('willDestroyElement', function () {
    var old = this.$().clone().addClass('ng-leave').removeClass('ng-enter ng-enter-active').appendTo(this.$().parent());
    this.reDraw(old).then(function () {
      old.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function () {
        old.remove();
      });
      old.addClass('ng-leave-active');
    });
  })


});
