import Ember from 'ember';

/* global jQuery */

var ITEM_HEIGHT = 41,
  MAX_HEIGHT = 5.5 * ITEM_HEIGHT,
  MENU_PADDING = 8;


export default Ember.Component.extend({
  tagName: 'md-autocomplete',
  classNames: ['md-default-theme'],


  suggestions: Ember.A([]),
  loading: false,
  hidden: null,
  index: null,
  messages: [],
  isDisabled: null,
  isRequired: null,
  lookupKey: null,
  noBlur: false,
  hasFocus: false,
  searchText: '',
  placeholder: '',

  hadKeyDown: false,
  minLength: 1,

  itemCache: {},




  valueObserver: Ember.observer('model',function () {
    var value;
    if (this.get('model')) {
      value = this.get('model')[this.get('lookupKey')];
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
        var search = item[lookupKey].toLowerCase();
        return search.indexOf(text) === 0;
      });
    } else {
      var promise = source.call(this, text);
      promise.then(function (items) {
        _self.get('itemCache')[text] = items;
        if (_self.get('lastPromise') === promise) {
          suggestions = items;
          _self.set('suggestions', suggestions);
          _self.set('hidden', _self.shouldHide());
          _self.set('index', 0); // Reset index of list position.
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
    if (this.get('itemCache')[text]) {
      return this.get('itemCache')[text];
    }
    return null;
  },


  didInsertElement: function () {
    var _self =  this;
    jQuery(window).resize(function () {
      _self.positionDropdown();
    });
  }

});
