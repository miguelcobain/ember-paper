import Ember from 'ember';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';
import PaperToastBounds from './paper-toast-bounds';
const {
  Component,
  computed,
  run
} = Ember;
const {
  later,
  scheduleOnce
} = run;

/*global Hammer*/

export default Component.extend(TransitionMixin, {
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

  transitionClass: 'ng',

  toastBounds: computed(function() {
    return this.nearestOfType(PaperToastBounds);
  }),

  // right,left,bottom and top should only be given once.
  // Therefore we use a computed for each so that they can
  // never change once initially provided.
  _right: computed(function () {
    return this.get('right');
  }),

  _left: computed(function () {
    return this.get('left');
  }),

  _bottom: computed(function () {
    return this.get('bottom');
  }),

  _top: computed(function () {
    return this.get('top');
  }),

  didInsertElement() {
    if (this.get('hide-delay')) {
      later( ()=> {
        this.sendAction('on-close');
      }, this.get('hide-delay'));
    }

    const swipeHammer = new Hammer(this.get('element'));
    this.swipeHammer = swipeHammer;
    swipeHammer.on('swipeleft', run.bind(this, this.onSwipe));
    swipeHammer.on('swiperight', run.bind(this, this.onSwipe));

    // Add to parent to toast is open in it.
    if (this.get('toastBounds')) {
      scheduleOnce('afterRender', this, function() {
        this.get('toastBounds').send('toggleToast', (this.get('top') ? 'top' : 'bottom'));
      });
    }
  },

  addDestroyedElementClone(parent, index, clone) {
   parent.append(clone);
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
      scheduleOnce('afterRender', this, function () {
        this.get('toastBounds').send('toggleToast', (this.get('top') ? 'top' : 'bottom'));
      });
    }
  },

  actions: {
    buttonAction() {
      this.sendAction('on-button', this);
      this.sendAction('on-close');
    }
  }
});
