import Ember from 'ember';
import HasBlockMixin from '../mixins/hasblock-mixin';
import { promiseArray } from 'ember-paper/utils/promise-proxies';

const {
  get,
  set,
  setProperties,
  isEmpty,
  isEqual,
  observer,
  computed,
  ObjectProxy,
  run,
  isArray,
  assert,
  isPresent
} = Ember;

const {
  not,
  alias,
  and,
  bool
} = computed;

function isString(item) {
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
  hidden: true,
  selectedIndex: 0,
  messages: [],
  noBlur: false,
  hasFocus: false,
  searchText: '',
  // wrap in a computed property so that cache
  // isn't shared among autocomplete instances
  itemCache: computed(()=>{
    return {};
  }),

  // Public
  fullTextSearch: false,
  disabled: null,
  required: null,
  lookupKey: null,
  placeholder: '',
  delay: 0,
  minLength: 1,
  allowNonExisting: false,
  noCache: false,
  notFoundMessage: 'No matches found for \'%@\'.',

  init() {
    this._super(...arguments);
    let model = get(this,'model');
    if (model) {
      // handle the case where model is a promise
      if (this.get('model') instanceof ObjectProxy){
        model.then((instance)=>{
          if (!isEmpty(instance)){
            set(this,'searchText', this.lookupLabelOfItem(instance));
            set(this,'model',instance);
          }
          // as this code would run async after the actual component
          // init is made we need a way to monitor the fact of
          // init finish in modelDidChange.
          set(this,'initFinished', true);
        });
      } else {
        set(this,'searchText', this.lookupLabelOfItem(this.get('model')));
        this.searchTextDidChange();
        set(this,'initFinished');
      }
    }
  },

  notFloating: not('floating'),
  notHidden: not('hidden'),

  autocompleteWrapperId: computed('elementId', function() {
    return `autocomplete-wrapper-${get(this,'elementId')}`;
  }),

  sections: {
    itemTemplate: {isItemTemplate: true},
    notFoundTemplate: {isNotFoundTemplate: true}
  },

  notFoundMsg: computed('searchText', 'notFoundMessage', function() {
    return Ember.String.loc(this.get('notFoundMessage'), [this.get('searchText')]);
  }),

  /**
   * Needed because of false = disabled='false'.
   */
  showDisabled: alias('disabled'),
  notLoading: not('loading'),
  notAllowNonExisting: not('allowNonExisting'),
  notDebouncingState: not('debouncingState'),
  enabled: not('disabled'),
  showLoadingBar: and('notLoading', 'notAllowNonExisting', 'notDebouncingState'),
  enableClearButton: and('searchText','enabled'),

  /**
   * Source filtering logic
   */

  searchTextDidChange: observer('searchText', function() {
    let searchText = get(this,'searchText');
    if (!isEqual(searchText, get(this,'previousSearchText'))) {
      if (get(this,'notAllowNonExisting')) {
        set(this,'model', null);
      } else {
        set(this,'model', searchText);
      }

      this.sendAction('update-filter', searchText);

      set(this,'debouncingState', true);
      run.debounce(this, 'setDebouncedSearchText', get(this,'delay'));
      set(this,'previousSearchText', searchText);
    }
  }),
  
  finishModelChange(data){
    let value = this.lookupLabelOfItem(data);
    // First set previousSearchText then searchText ( do not trigger observer only update value! ).
    set(this,'previousSearchText', value);
    set(this,'searchText', value);
    set(this,'hidden', true); 
  },

  modelDidChange: observer('model', function() {
    // we don't want this hook to run before the async init
    // of the component finishes. null/undefined model value also
    // breaks execution 
    if (get(this,'initFinished') && !isEmpty(get(this,'model'))){
        let model = get(this,'model');
        // sometimes model is a promise.
        if (model.then) {
          model.then((data)=>{
            // the promise content might be null as well
            if (!isEmpty(data)){
              this.finishModelChange(data);
            }
          });
        } else {
          this.finishModelChange(model);
        }
      }
  }),

  setDebouncedSearchText() {
    let searchText = get(this,'searchText');
    if (get(this,'isMinLengthMet')) {
      this.sendAction('debounced-update-filter', searchText);
      if (!this.cacheGet(searchText)) {
        this.sendAction('cache-miss', searchText);
      } else {
        this.sendAction('cache-hit', searchText);
      }
      this.set('debouncedSearchText', searchText);

      // If the autocomplete is being triggered by a human / not on initial render.
      if (this.get('hasFocus') || this.get('noBlur')) {
        this.set('hidden', false);
      }
    } else {
      this.set('hidden', true);
    }
    this.set('debouncingState', false);
  },

  loading: bool('sourcePromiseArray.isPending').readOnly(),

  //coalesces all promises into PromiseArrays or Arrays
  sourcePromiseArray: computed('source', function() {
    let source = get(this,'source');
    if (source && source.then) {
      //coalesce into promise array
      return promiseArray(source);
    } else if (isArray(source)) {
      //return array
      return Ember.A(source);
    } else {
      //Unknown source type
      assert('The provided \'source\' for paper-autocomplete must be an Array or a Promise.', !isPresent(source));
      return Ember.A();
    }
  }).readOnly(),

  suggestions: computed('debouncedSearchText', 'sourcePromiseArray.[]', function() {
    var source = this.get('sourcePromiseArray');
    var lookupKey = this.get('lookupKey');
    var searchText = (this.get('debouncedSearchText') || '').toLowerCase();
    var cachedItems = this.cacheGet(searchText);
    var suggestions;

    if (cachedItems) {
      //We have cached results
      suggestions = cachedItems;
    } else {
      //no cache

      var data = this.filterArray(source, searchText, lookupKey);
      if (source.then && source.get('isFulfilled')) {
        //cache when we have a PromiseArray
        this.cacheSet(searchText, data);
      }
      suggestions = Ember.A(data);
    }
    // If we have no item suggestions, and allowNonExisting is enabled
    // We need to close the paper-autocomplete-list so all mouse events get activated again.
    if (isEqual(suggestions.length,0) && get(this,'allowNonExisting')){
      set(this,'hidden', true);
    }
    return suggestions;
  }).readOnly(),


  filterArray(array, searchText, lookupKey) {
    return array.filter((item)=>{
      assert(`You have not defined \'lookupKey\' on paper-autocomplete, when source contained
        items that are not of type String. To fix this error provide a
        lookupKey=\'key to lookup from source item\'.`, isString(item) || isPresent(lookupKey));

      assert(`You specified \'${lookupKey}\' as a lookupKey on paper-autocomplete,
        but at least one of its values is not of type String. To fix this error make sure that every \'${lookupKey}
        \' value is a string.`, isString(item) || (isPresent(lookupKey) && isString(get(item, lookupKey))) );

      let search = isString(item) ? item.toLowerCase() : get(item, lookupKey).toLowerCase();
      if (get(this,'fullTextSearch')){
        return search.indexOf(searchText) !== -1;  
      } else {
        return search.indexOf(searchText) === 0;
      }
      
    });
  },

  //TODO move cache to service? Components are not singletons.
  cacheGet(text) {
    return !get(this,'noCache') && get(this,'itemCache')[text];
  },

  cacheSet(text, data) {
    get(this,'itemCache')[text] = data;
  },

  shouldHide: not('isMinLengthMet'),

  isMinLengthMet: computed('searchText.length',{
    get(){
      return get(this,'searchText.length') >= get(this,'minLength');
    }
  }),

  /**
   * Returns the default index based on whether or not autoselect is enabled.
   * @returns {number}
   */
  defaultIndex: computed('autoselect', function() {
    return get(this,'autoselect') ? 0 : -1;
  }),

  lookupLabelOfItem(model) {
    return get(this,'lookupKey') ? get(model, get(this,'lookupKey')) : model;
  },

  actions: {
    clear() {
      setProperties(this,{
        searchText:'',
        selectedIndex:-1,
        model:null,
        hidden:get(this,'shouldHide')
      });
    },

    pickModel(model) {
      let value = this.lookupLabelOfItem(model);
      setProperties(this,{
        model:model,
        previousSearchText:value,
        searchText:value,
        hidden:true
      });
    },

    inputFocusOut() {
      set(this,'hasFocus', false);
      if (get(this,'noBlur') === false) {
        set(this,'hidden', true);
      }
    },

    inputFocusIn() {
      setProperties(this,{
        hasFocus: true,
        hidden: get(this,'shouldHide')
      });
    },

    inputKeyDown(value, event) {
      let constants = get(this,'constants');
      switch (event.keyCode) {
        case constants.KEYCODE.DOWN_ARROW:
          if (this.get('loading')) {
            return;
          }
          this.set('selectedIndex', Math.min(this.get('selectedIndex') + 1, this.get('suggestions').length - 1));
          break;
        case constants.KEYCODE.UP_ARROW:
          if (get(this,'loading')) {
            return;
          }
          this.set('selectedIndex', this.get('selectedIndex') < 0 ? this.get('suggestions').length - 1 : Math.max(0, this.get('selectedIndex') - 1));
          break;
        case constants.KEYCODE.TAB:
        case constants.KEYCODE.ENTER:
          if (get(this,'hidden') || get(this,'loading') || get(this,'selectedIndex') < 0 || get(this,'suggestions').length < 1) {
            return;
          }
          this.send('pickModel', get(this,'suggestions').objectAt(get(this,'selectedIndex')));
          break;
        case constants.KEYCODE.ESCAPE:
          setProperties(this,{
            searchText:'',
            selectedIndex:get(this,'defaultIndex'),
            model:null,
            hidden:get(this,'shouldHide')
          });
          break;
        default:
          break;
      }
    },

    listMouseEnter() {
      set(this,'noBlur', true);
    },

    listMouseLeave() {
      set(this,'noBlur', false);
      if (isEqual(get(this,'hasFocus'),false)) {
        set(this,'hidden', true);
      }
    },

    listMouseUp() {
      this.$().find('input').focus();
    }
  }

});
