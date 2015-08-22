import Ember from 'ember';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';
import PaperToastBounds from './paper-toast-bounds';

/*global Hammer*/

export default Ember.Component.extend(TransitionMixin, {
  tagName: 'md-toast',
  // ng-enter is in classNames on init to avoid delay of initial translate3d state.
  classNames: ['md-default-theme', 'ng-enter'],
  classNameBindings: [
    '_right:md-right',
    '_left:md-left',
    '_bottom:md-bottom',
    '_top:md-top',
    'capsule:md-capsule'
  ],

  toastBounds: Ember.computed(function() {
    return this.nearestOfType(PaperToastBounds);
  }),


  transitionClass: 'ng',
  addDestroyedElementClone(parent, index, clone) {
   parent.append(clone);
  },

  // right,left,bottom and top should only be given once. Therefor we use a computed for each so that they can
  // never change once initially provided.
  _right: Ember.computed(function () { return this.get('right'); }),
  _left: Ember.computed(function () { return this.get('left'); }),
  _bottom: Ember.computed(function () { return this.get('bottom'); }),
  _top: Ember.computed(function () { return this.get('top'); }),




  didInsertElement() {
    if (this.get('hide-delay')) {
      Ember.run.later(function () {
        this.sendAction('on-close');
      }.bind(this), this.get('hide-delay'));
    }

    var swipeHammer = new Hammer(this.get('element'));
    this.swipeHammer = swipeHammer;
    swipeHammer.on('swipeleft', Ember.run.bind(this, this.onSwipe));
    swipeHammer.on('swiperight', Ember.run.bind(this, this.onSwipe));

    // Add to parent to toast is open in it.
    if (this.get('toastBounds')) {
      Ember.run.scheduleOnce('afterRender', this, function () {
        this.get('toastBounds').send('toggleToast', (this.get('top') ? 'top' : 'bottom'));
      });
    }
  },

  onSwipe(ev) {
    //Add swipeleft/swiperight class to element so it can animate correctly
    this.$().addClass(`md-${ev.type}`);
    this.sendAction('on-close');
  },

  willDestroyElement() {
    if (this.swipeHammer) {
      this.swipeHammer.destroy();
    }
    if (this.get('toastBounds')) {
      Ember.run.scheduleOnce('afterRender', this, function () {
        this.get('toastBounds').send('toggleToast', (this.get('top') ? 'top' : 'bottom'));
      });
    }
  },

  actions: {
    buttonAction: function () {
      this.sendAction('on-button', this);
      this.sendAction('on-close');
    }
  }

});
