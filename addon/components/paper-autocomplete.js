import Ember from 'ember';
import HasBlockMixin from '../mixins/hasblock-mixin';

function isString (item) {
  return typeof item === 'string' || item instanceof String;
}

/**
 * @name paper-autocomplete
 *
 * @description
 *     Provides material design autocomplete.
 *
 *
 * ## Dependencies
 * - paper-autocomplete-item
 * - paper-autocomplete-list
 * - paper-input
 * - paper-button
 * - input
 */
export default Ember.Component.extend(HasBlockMixin, {
  util: Ember.inject.service(),
  constants: Ember.inject.service(),

  tagName: 'md-autocomplete',
  classNameBindings: ['notFloating:md-default-theme'],
  attributeBindings: ['floating:md-floating-label', 'showDisabled:disabled'],


  // Internal
  suggestions: Ember.A([]),
  loading: false,
  hidden: null,
  selectedIndex: null,
  messages: [],
  noBlur: false,
  hasFocus: false,
  searchText: '',

  // Public
  disabled: null,
  required: null,
  lookupKey: null,
  placeholder: '',
  delay: 0,
  minLength: 1,
  allowNonExisting: false,
  noCache: false,
  notFoundMessage: 'No matches found for "%@".',

  init:function(){
    this._super(...arguments);
    this.set('itemCache', {});
    if (this.get('model')) {
      this.set('searchText', this.lookupLabelOfItem(this.get('model')));
    }
  },


  notFloating: Ember.computed.not('floating'),
  notHidden: Ember.computed.not('hidden'),



  sections: {
    itemTemplate: {isItemTemplate: true},
    notFoundTemplate: {isNotFoundTemplate: true}
  },


  notFoundMsg: Ember.computed('searchText', 'notFoundMessage', function () {
    return Ember.String.fmt(this.get('notFoundMessage'), [this.get('searchText')]);
  }),

  /**
   * Needed because of false = disabled="false".
   */
  showDisabled: Ember.computed('disabled', function () {
    if (this.get('disabled')) {
      return true;
    }
  }),

  showLoadingBar: Ember.computed('loading', 'allowNonExisting', 'debouncingState', function () {
    return !this.get('loading') && !this.get('allowNonExisting') && !this.get('debouncingState');
  }),

  enableClearButton: Ember.computed('searchText', 'disabled', function () {
    return this.get('searchText') && !this.get('disabled');
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


  observeSearchText: Ember.observer('searchText', function () {
    if (this.get('searchText') === this.get('previousSearchText')) {
      return;
    }
    if (!this.get('allowNonExisting')) {
      this.set('model', null);
    } else {
      this.set('model', this.get('searchText'));
    }

    var wait = parseInt(this.get('delay'), 10) || 0;
    this.set('debouncingState', true);
    Ember.run.debounce(this, this.handleSearchText, wait);
    this.set('previousSearchText', this.get('searchText'));
  }),



  shouldHide () {
    if (!this.isMinLengthMet()) {
      return true;
    }
    return false;
  },

  isMinLengthMet () {
    return this.get('searchText').length >= this.get('minLength');
  },



  handleSearchText () {
    this.set('selectedIndex', this.get('defaultIndex'));
    this.set('debouncingState', false);
    if (!this.isMinLengthMet()) {
      this.send('clear');
    } else {
      this.handleQuery();
    }
  },

  handleQuery () {
    var suggestions,
      _self = this,
      source = this.get('source'),
      lookupKey = this.get('lookupKey'),
      text = this.get('searchText').toLowerCase(),
      cached = this.itemsFromCache(text);
    if (cached) {
      suggestions = cached;
      this.set('selectedIndex', _self.get('defaultIndex'));
      this.set('suggestions', suggestions);
      this.set('hidden', this.shouldHide());
    } else if (typeof source !== 'function') {
      if (text) {
        suggestions = source.filter(function (item) {
          var search;
          if (isString(item)) {
            search = item;
          } else {
            if (lookupKey === null) {
              console.error("You have not defined 'lookupKey' on paper-autocomplete, when source contained " +
                "items that are not of type String. To fix this error provide a " +
                "lookupKey='key to lookup from source item'.");
            }
            search = item[lookupKey];
          }
          search = search.toLowerCase();
          return search.indexOf(text) === 0;
        });
      } else {
        suggestions = source;
      }
      this.set('selectedIndex', _self.get('defaultIndex'));
      this.set('suggestions', suggestions);
      this.set('hidden', this.shouldHide());
    } else {
      this.set('loading', true);

      var promise = source.call(this, text);
      promise.then(function (items) {
        _self.get('itemCache')[text] = items;
        if (_self.get('lastPromise') === promise) {
          suggestions = items;
          _self.set('suggestions', suggestions);
          _self.set('hidden', _self.shouldHide());
          _self.set('selectedIndex', _self.get('defaultIndex')); // Reset index of list position.
          _self.set('loading', false);
        }
      });
      this.set('lastPromise', promise);
    }
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



  lookupLabelOfItem (model) {
    var value;
    if (this.get('lookupKey')) {
      value = model[this.get('lookupKey')];
    } else {
      value = model;
    }
    return value;
  },

  actions: {
    clear: function () {
      this.set('searchText', '');
      this.set('selectedIndex', -1);
      this.set('loading', false);
      this.set('model', null);
      this.set('hidden', true);
    },

    pickModel: function (model) {
      this.set('model', model);
      var value = this.lookupLabelOfItem(model);
      // First set previousSearchText then searchText ( do not trigger observer only update value! ).
      this.set('previousSearchText', value);
      this.set('searchText', value);
      this.set('hidden', true);
    },

    inputFocusOut () {
      this.set('hasFocus', false);
      if (this.get('noBlur') === false) {
        this.set('hidden', true);
      }
    },

    inputFocusIn () {
      this.set('hasFocus', true);
      this.set('hidden', this.shouldHide());
      if (!this.get('hidden')) {
        this.handleSearchText();
      }
    },

    inputKeyDown (value, event) {
      switch (event.keyCode) {
        case this.get('constants').KEYCODE.DOWN_ARROW:
          if (this.get('loading')) {
            return;
          }
          event.stopPropagation();
          event.preventDefault();
          this.set('selectedIndex', Math.min(this.get('selectedIndex') + 1, this.get('suggestions').length - 1));
          break;
        case this.get('constants').KEYCODE.UP_ARROW:
          if (this.get('loading')) {
            return;
          }
          event.stopPropagation();
          event.preventDefault();
          this.set('selectedIndex', this.get('selectedIndex') < 0 ? this.get('suggestions').length - 1 : Math.max(0, this.get('selectedIndex') - 1));
          break;
        case this.get('constants').KEYCODE.TAB:
        case this.get('constants').KEYCODE.ENTER:
          if (this.get('hidden') || this.get('loading') || this.get('selectedIndex') < 0 || this.get('suggestions').length < 1) {
            return;
          }
          event.stopPropagation();
          event.preventDefault();
          this.send('pickModel', this.get('suggestions')[this.get('selectedIndex')]);
          break;
        case this.get('constants').KEYCODE.ESCAPE:
          event.stopPropagation();
          event.preventDefault();
          this.set('suggestions', Ember.A([]));
          this.set('hidden', true);
          this.set('selectedIndex', this.get('defaultIndex'));
          break;
        default:
          break;
      }
    },
    listMouseEnter () {
      this.set('noBlur', true);
    },
    listMouseLeave () {
      this.set('noBlur', false);
      if (this.get('hasFocus') === false) {
        this.set('hidden', true);
      }
    },
    listMouseUp () {
      this.$().find('input').focus();
    }
  },

  /**
   * Returns the default index based on whether or not autoselect is enabled.
   * @returns {number}
   */
  defaultIndex: Ember.computed('autoselect', function () {
      return this.get('autoselect') ? 0 : -1;
  })


});
