import Ember from 'ember';

//TODO Move to constants?
var ITEM_HEIGHT = 41,
  MAX_HEIGHT = 5.5 * ITEM_HEIGHT,
  MENU_PADDING = 8;

export default Ember.Component.extend({
  util: Ember.inject.service(),

  tagName: 'ul',
  classNames: ['md-default-theme', 'md-autocomplete-suggestions', 'md-whiteframe-z1'],
  attributeNameBindings: ['role'],
  role: 'presentation',
  stickToElement: null,

  init () {
    this._super(...arguments);

    this._resizeWindowEvent = Ember.run.bind(this, this.resizeWindowEvent);
  },

  mouseEnter() {
    this.sendAction('mouse-enter');
  },

  mouseLeave() {
    this.sendAction('mouse-leave');
  },

  mouseUp() {
    this.sendAction('mouse-up');
  },

  //TODO reafactor into a computed property that binds directly to dropdown's `style`
  positionDropdown() {
    var hrect  = Ember.$('#' + this.get('wrapToElementId'))[0].getBoundingClientRect(),
      vrect  = hrect,
      root   = document.body.getBoundingClientRect(),
      top    = vrect.bottom - root.top,
      bot    = root.bottom - vrect.top,
      left   = hrect.left - root.left,
      width  = hrect.width,
      styles = {
        left: left + 'px',
        minWidth: width + 'px',
        maxWidth: Math.max(hrect.right - root.left, root.right - hrect.left) - MENU_PADDING + 'px'
      },
      ul = this.$();

    if (top > bot && root.height - hrect.bottom - MENU_PADDING < MAX_HEIGHT) {
      styles.top = 'auto';
      styles.bottom = bot + 'px';
      styles.maxHeight = Math.min(MAX_HEIGHT, hrect.top - root.top - MENU_PADDING) + 'px';
    } else {
      styles.top = top + 'px';
      styles.bottom = 'auto';
      styles.maxHeight = Math.min(MAX_HEIGHT, root.bottom - hrect.bottom - MENU_PADDING) + 'px';
    }
    ul.css(styles);
    correctHorizontalAlignment();

    /**
     * Makes sure that the menu doesn't go off of the screen on either side.
     */
    function correctHorizontalAlignment () {
      var dropdown = ul[0].getBoundingClientRect(),
        styles = {};
      if (dropdown.right > root.right - MENU_PADDING) {
        styles.left = (hrect.right - dropdown.width) + 'px';
      }
      ul.css(styles);
    }
  },

  observeIndex: Ember.observer('selectedIndex', function() {
    var suggestions = this.get('suggestions');
    if (!suggestions || !suggestions.objectAt(this.get('selectedIndex'))) {
      return;
    }

    var ul = this.$(),
      li  = ul.find('li:eq('+this.get('selectedIndex')+')')[0],
      top = li.offsetTop,
      bot = top + li.offsetHeight,
      hgt = ul[0].clientHeight;
    if (top < ul[0].scrollTop) {
      ul[0].scrollTop = top;
    } else if (bot > ul[0].scrollTop + hgt) {
      ul[0].scrollTop = bot - hgt;
    }
  }),

  resizeWindowEvent () {
    this.positionDropdown();
  },

  didInsertElement() {
    this._super(...arguments);

    //TODO refactor using ember-wormhole?
    var ul = this.$().detach();
    Ember.$('body').append(ul);
    Ember.$(window).on('resize', this._resizeWindowEvent);
    this.get('util').disableScrollAround(this.$());
    this.positionDropdown();
  },

  willDestroyElement() {
    Ember.$(window).off('resize', this._resizeWindowEvent);
    this.get('util').enableScrolling();
  }

});
