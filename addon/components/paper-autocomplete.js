import Ember from 'ember';
import HasBlockMixin from '../mixins/hasblock-mixin';
import constants from '../utils/constants';

/* global jQuery */

var ITEM_HEIGHT = 41,
  MAX_HEIGHT = 5.5 * ITEM_HEIGHT,
  MENU_PADDING = 8;


function isString (item) {
  return typeof item === 'string' || item instanceof String;
}

export default Ember.Component.extend(HasBlockMixin, {
  tagName: 'md-autocomplete',
  classNameBindings: ['notFloating:md-default-theme'],


  suggestions: Ember.A([]),
  loading: false,
  hidden: null,
  index: null,
  messages: [],
  disabled: null,
  required: null,
  lookupKey: null,
  noBlur: false,
  hasFocus: false,
  placeholder: '',

  hadKeyDown: false,
  minLength: 1,

  noCache: false,
  itemCache: {},


  attributeBindings: ['floating:md-floating-label', 'showDisabled:disabled'],

  notFloating: Ember.computed.not('floating'),
  notHidden: Ember.computed.not('hidden'),
  notDisabled:  Ember.computed.not('disabled'),

  /**
   * Needed because of false = disabled="false".
   */
  showDisabled: Ember.computed('disabled', function () {
    if (this.get('disabled')) {
      return true;
    }
  }),


  wrapperClasses: Ember.computed('notFloating', 'notHidden', function () {
    var classes = '';
    if (this.get('notFloating')) {
      classes += ' md-whiteframe-z1';
    }
    if (this.get('notHidden')) {
      classes += ' md-menu-showing';
    }
    return classes;
  }),




  valueObserver: Ember.observer('model',function () {
    var value;
    if (this.get('model')) {
      if (isString(this.get('model'))) {
        value = this.get('model');
      }else {
        value = this.get('model')[this.get('lookupKey')];
      }
    } else {
      value = '';
    }
    this.set('hadKeyDown', false);
    this.set('searchText', value);
    this.set('hidden', true);
  }),

  hideSuggestionObserver: Ember.observer('hidden', function () {
    if (!this.get('ulContainer')) {
      return;
    }
    if (this.get('hidden') === true) {
      this.get('ulContainer').$().hide();
    } else {
      this.get('ulContainer').$().show();
    }
  }),

  observeSuggestions: Ember.observer('suggestions', function () {
    if (this.get('suggestions').length) {
      this.positionDropdown();
    }
  }),


  searchTextObserver: Ember.observer('searchText',function() {
    var text = this.get('searchText');
    if (typeof text === 'undefined' || !this.get('hadKeyDown')) {
      return;
    }

    var wait = parseInt(this.get('delay'), 10) || 0;
    Ember.run.debounce(this, this.handleSearchText, wait);
  }),

  indexObserver: Ember.observer('index', function () {
    var suggestions = this.get('suggestions');
    if (!suggestions[this.get('index')]) {
      return;
    }
    var ul = this.get('ulContainer').$(),
      li  = ul.find('li:eq('+this.get('index')+')')[0],
      top = li.offsetTop,
      bot = top + li.offsetHeight,
      hgt = ul[0].clientHeight;
    if (top < ul[0].scrollTop) {
      ul[0].scrollTop = top;
    } else if (bot > ul[0].scrollTop + hgt) {
      ul[0].scrollTop = bot - hgt;
    }
  }),


  shouldHide () {
    if (!this.isMinLengthMet()) {
      return true;
    }
    return false;
  },

  isMinLengthMet () {
    return this.get('searchText') && this.get('searchText').length >= this.get('minLength');
  },

  positionDropdown () {
    var hrect  = this.$().find('md-autocomplete-wrap:first')[0].getBoundingClientRect(),
      vrect  = hrect,
      root   = document.body.getBoundingClientRect(),
      top    = vrect.bottom - root.top,
      bot    = root.bottom - vrect.top,
      left   = hrect.left - root.left,
      width  = hrect.width,
      styles = {
        left:     left + 'px',
        minWidth: width + 'px',
        maxWidth: Math.max(hrect.right - root.left, root.right - hrect.left) - MENU_PADDING + 'px'
      },
      ul = this.get('ulContainer').$();
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
        styles   = {};
      if (dropdown.right > root.right - MENU_PADDING) {
        styles.left = (hrect.right - dropdown.width) + 'px';
      }
      ul.css(styles);
    }
  },



  handleSearchText () {
    var suggestions,
      _self = this,
      source = this.get('source'),
      lookupKey = this.get('lookupKey'),
      text = this.get('searchText').toLowerCase(),
      cached = this.itemsFromCache(text);

    // cancel results if search text is not long enough
    if (!this.isMinLengthMet()) {
      return;
    }

    if (cached) {
      suggestions = cached;
    } else if (typeof source !== 'function') {
      suggestions = source.filter(function (item) {
        var search;
        if (isString(item)) {
          search = item;
        } else {
          if (lookupKey === null) {
            console.error("You have not defined 'lookupKey' on paper-autocomplete, when source contained items that are not of type String. To fix this error provide a lookupKey='key to lookup from source item'.")
          }
          search = item[lookupKey];
        }
        search = search.toLowerCase();
        return search.indexOf(text) === 0;
      });
    } else {
      this.set('loading', true);
      var promise = source.call(this, text);
      promise.then(function (items) {
        _self.get('itemCache')[text] = items;
        if (_self.get('lastPromise') === promise) {
          suggestions = items;
          _self.set('suggestions', suggestions);
          _self.set('hidden', _self.shouldHide());
          _self.set('index', 0); // Reset index of list position.
          _self.set('loading', false);
        }
      });
      this.set('lastPromise', promise);
      return;
    }
    this.set('suggestions', suggestions);
    this.set('hidden', this.shouldHide());
    this.set('index', 0); // Reset index of list position.
  },

  itemsFromCache (text) {
    if (this.get('noCache') === true) {
      return;
    }
    if (this.get('itemCache')[text]) {
      return this.get('itemCache')[text];
    }
    return null;
  },


  actions: {
    clear: function () {
      this.set('model', null);
      this.set('searchText', '');
    },

    inputFocusOut () {
      this.set('hasFocus', false);
      if (this.get('noBlur') === false) {
        this.set('hidden', true);
      }
    },

    inputFocusIn () {
      this.set('hasFocus', true);
    },

    inputKeyDown (value, event) {
      switch (event.keyCode) {
        case constants.KEYCODE.DOWN_ARROW:
          if (this.get('loading')) {
            return;
          }
          event.stopPropagation();
          this.set('index', Math.min(this.get('index') + 1, this.get('suggestions').length - 1));
          break;
        case constants.KEYCODE.UP_ARROW:
          if (this.get('loading')) {
            return;
          }
          event.stopPropagation();
          this.set('index', this.get('index') < 0 ? this.get('suggestions').length - 1 : Math.max(0, this.get('index') - 1));
          break;
        case constants.KEYCODE.TAB:
        case constants.KEYCODE.ENTER:
          if (this.get('index') < 0 || this.get('suggestions').length < 1) {
            return;
          }
          event.stopPropagation();
          this.set('model', this.get('suggestions')[this.get('index')]);
          this.set('hidden', true);

          break;
        case constants.KEYCODE.ESCAPE:
          event.stopPropagation();
          this.set('matches', Ember.A([]));
          this.set('hidden', true);
          break;
        default:
          break;
      }
      this.set('hadKeyDown', true);
    }
  },


  didInsertElement: function () {
    var _self =  this;
    jQuery(window).resize(function () {
      _self.positionDropdown();
    });
  }



});
