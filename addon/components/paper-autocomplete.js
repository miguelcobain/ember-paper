import Ember from 'ember';

var ITEM_HEIGHT = 41,
  MAX_HEIGHT = 5.5 * ITEM_HEIGHT,
  MENU_PADDING = 8;


export default Ember.Component.extend({
  tagName: 'md-autocomplete',
  itemTemplate: {isItemTemplate: true},
  noItemsTemplate: {isNotFoundTemplate: true},
  classNames: ['md-default-theme'],

  suggestions: Ember.A([]),
  loading: false,
  hidden: true,
  index: null,
  messages: [],
  isDisabled: null,
  isRequired: null,
  lookupKey: null,
  searchText: '',


  valueObserver: Ember.observer('model',function () {
    var value;
    if (this.get('model')) {
      value = this.get('model')[this.get('lookupKey')];
    } else {
      value = '';
    }
    this.set('searchText', value);
  }),


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
      ul = this.get('ulContainer');
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


  observeSuggestions: Ember.observer('suggestions', function () {
    if (this.get('suggestions').length) {
      this.positionDropdown();
    }
  }),


  didInsertElement: function () {
    var _self =  this;
    jQuery(window).resize(function () {
      _self.positionDropdown();
    });
  }

});
