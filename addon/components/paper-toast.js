import Ember from 'ember';
import AnimateMixin from 'ember-paper/mixins/animate-mixin';

/*global Hammer*/

export default Ember.Component.extend(AnimateMixin, {
  tagName: 'md-toast',
  classNames: ['md-default-theme'],
  classNameBindings: ['_right:md-right', '_left:md-left', '_bottom:md-bottom', '_top:md-top'],
  animated: true,
  'align-fab': true,

  // right,left,bottom and top should only be given once. Therefor we use a computed for each so that they can
  // never change once initially provided.
  _right: Ember.computed(function () { return this.get('right'); }),
  _left: Ember.computed(function () { return this.get('left'); }),
  _bottom: Ember.computed(function () { return this.get('bottom'); }),
  _top: Ember.computed(function () { return this.get('top'); }),




  didInsertElement () {
    if (this.get('hide-delay')) {
      Ember.run.later(function () {
        this.sendAction('on-close');
      }.bind(this), this.get('hide-delay'));
    }
    // Add to parent to toast is open in it.
    this.runParentClass();

    var swipeHammer = new Hammer(this.get('element'));
    this.swipeHammer = swipeHammer;
    swipeHammer.on('swipeleft', Ember.run.bind(this, this._swipe));
    swipeHammer.on('swiperight', Ember.run.bind(this, this._swipe));
  },

  _swipe (ev) {
    //Add swipeleft/swiperight class to element so it can animate correctly
    this.$().addClass('md-' + ev.type);
    this.sendAction('on-close');
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.swipeHammer) {
      this.swipeHammer.destroy();
    }
    // Remove toast open.
    this.runParentClass(true);
  },

  runParentClass (destroy) {
    if (!this.get('align-fab')) {
      return;
    }
    var el,
        className = 'md-toast-open-' + (this.get('top') ? 'top' : 'bottom');
    if (this.get('parent-selector')) {
      el = this.$().closest(this.get('parent-selector'));
    } else {
      el = this.$().parent();
    }
    if (destroy) {
      el.removeClass(className);
    } else {
      el.addClass(className);
    }
  },

  actions: {
    buttonAction: function () {
      this.sendAction('on-button', this);
      this.sendAction('on-close');
    }
  }

});
