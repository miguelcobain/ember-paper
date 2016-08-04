/**
 * @module ember-paper
 */
import Ember from 'ember';

const {
  Component,
  computed,
  observer,
  isPresent
} = Ember;

export default Component.extend({
  tagName: 'md-fab-speed-dial',
  classNames: ['md-noop'],
  classNameBindings: [
    '_direction',
    '_animation',
    '_isOpen:md-is-open',
    '_align'
  ],

  direction: '',
  animation: '',
  verticalAlign: '',
  horizontalAlign: '',

  icon: 'menu',

  hover: computed.alias('on-hover'),

  _direction: computed('direction', {
    get() {
      return this.get('direction') ? `md-${this.get('direction')}` : 'md-up';
    }
  }),
  _animation: computed('animation', {
    get() {
      return this.get('animation') ? `md-${this.get('animation')}` : 'md-fling';
    }
  }),
  _isOpen: computed('is-open', {
    get() {
      return this.get('is-open');
    }
  }),
  _align: computed('verticalAlign', 'horizontalAlign', {
    get() {
      return (this.get('verticalAlign') && this.get('horizontalAlign')) ? `md-fab-${this.get('verticalAlign')}-${this.get('horizontalAlign')}` : '';
    }
  }),

  openObserver: observer('is-open', 'direction', function() {
      this.requestAnimation();
    }),
  animationObserver: observer('animation', function() {
    this.set('is-open', false);
  }),

  didInsertElement() {
    this._super(...arguments);

    this.requestAnimation();

    let trigger = this.$('md-fab-trigger');
    this.set('fabTrigger', trigger);
  },

  requestAnimation() {
    if (this.get('animation') === 'fling') {
      this.flingAnimation();
    } else {
      this.scaleAnimation();
    }
  },

  mouseLeave() {
    if (this.get('hover')) {
      this.set('is-open', false);
    }
  },

  flingAnimation() {
    let items = this.$('.md-fab-action-item');

    if (isPresent(items)) {
      // Grab our trigger element
      let triggerElement = document.querySelector('md-fab-trigger');

      // Grab our element which stores CSS variables
      let variablesElement = document.querySelector('._md-css-variables');

      let startZIndex = parseInt(window.getComputedStyle(variablesElement).zIndex);

      items.each((index, item) => {
        let styles = item.style;

        styles.transform = styles.webkitTransform = '';
        styles.transitionDelay = '';
        styles.opacity = 1;

        styles.zIndex = (items.length - index) + startZIndex;
      });

      // Set the trigger to be above all of the actions so they disappear behind it.
      triggerElement.style.zIndex = startZIndex + items.length + 1;

      // If the control is closed, hide the items behind the trigger
      if (!this.get('_isOpen')) {
        items.each((index, item) => {
            let newPosition, axis;

            let styles = item.style;

            switch (this.get('direction')) {
              case 'down':
                newPosition = -item.scrollHeight * (index + 1);
                axis = 'Y';
                break;
              case 'left':
                newPosition = item.scrollWidth * (index + 1);
                axis = 'X';
                break;
              case 'right':
                newPosition = -item.scrollWidth * (index + 1);
                axis = 'X';
                break;
              default: // up is default
                newPosition = item.scrollHeight * (index + 1);
                axis = 'Y';
                break;
            }

            let newTranslate = `translate${axis}(${newPosition}px)`;

            styles.transform = styles.webkitTransform = newTranslate;

          });
      }
    }
  },

  scaleAnimation() {
    let delay = 65;
    let items = this.$('.md-fab-action-item');

    // Always reset the items to their natural position/state
    items.each((index, item) => {

      let styles = item.style;
      let offsetDelay = index * delay;

      styles.opacity = this.get('_isOpen') ? 1 : 0;
      styles.transform = styles.webkitTransform = this.get('_isOpen') ? 'scale(1)' : 'scale(0)';
      styles.transitionDelay = this.get('_isOpen') ? offsetDelay : `${items.length - offsetDelay}ms`;
    });
  },
  actions: {
    mouseEnter() {
      if (this.get('hover')) {
        this.set('is-open', true);
      }
    },
    toggleOpen() {
      this.toggleProperty('is-open');
    }
  }

});
