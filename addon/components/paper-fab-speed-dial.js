import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-fab-speed-dial',
  classNames: ['md-noop'],
  classNameBindings: [
    '_direction',
    '_animation',
    '_isOpen',
    '_align'
  ],


  direction: '',
  animation: '',
  verticalAlign: '',
  horizontalAlign: '',

  icon: 'menu',

  _direction: Ember.computed('direction', {
    get() {
        return this.get('direction') ? 'md-' + this.get('direction') : 'md-up';
    }
  }),
  _animation: Ember.computed('animation', {
    get() {
      return this.get('animation') ? 'md-'+this.get('animation') : 'md-fling';
    }
  }),
  _isOpen: Ember.computed('is-open', {
    get() {
      return this.get('is-open') ? 'md-is-open' : '';
    }
  }),
  _align: Ember.computed('verticalAlign', 'horizontalAlign', {
    get() {
      return (this.get('verticalAlign') && this.get('horizontalAlign')) ? 'md-fab-'+this.get('verticalAlign')+'-'+this.get('horizontalAlign') : '';
    }
  }),

  didInsertElement() {
    this._super(...arguments);

    this.flingAnimation();

    let trigger = this.$('md-fab-trigger');
    this.set('fabTrigger', trigger);

    if(this.get('on-hover')) {

      this.get('fabTrigger').on('mouseenter', () => {
        this.set('is-open', true);
      });
    }
  },

  mouseLeave() {
    this.set('is-open', false);
  },

  flingAnimation() {
    let items = this.$('.md-fab-action-item');

    if (Ember.isPresent(items)) {
      // Grab our trigger element
      let triggerElement = document.querySelector('md-fab-trigger');

      // Grab our element which stores CSS variables
      let variablesElement = document.querySelector('.md-css-variables');


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
      if(!this.get('_isOpen')) {
        items.each((index, item) => {
            var newPosition, axis;

            var styles = item.style;

            switch (this.get('direction')) {
              case 'down':
                newPosition = -item.scrollHeight * (index + 1);
                axis = 'Y';
                break;
              case 'left':
                console.log('Position left');
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

            var newTranslate = 'translate' + axis + '(' + newPosition + 'px)';

            styles.transform = styles.webkitTransform = newTranslate;

        });
      }
    }
  },

  animationObserver: Ember.observer('is-open', function() {
    this.flingAnimation();
  }),

  /***************TMP FUNCTION *************/
  // click(){
  //   this.toggleProperty('is-open');
  // },
  /*****************************************/
  actions: {
    toggleOpen() {
      this.toggleProperty('is-open');
    }
  }

});
