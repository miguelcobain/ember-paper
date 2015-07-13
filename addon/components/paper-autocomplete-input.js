import Ember from 'ember';
import BaseFocusable from './base-focusable';
import constants from '../utils/constants';

export default Ember.TextField.extend({
  type: 'search',

  handleSearchText () {
    var parent = this.get("parent");
    var text = parent.get('searchText').toLowerCase();

    parent.set('index', parent.getDefaultIndex());

    var items = parent.get('items');
    var lookupKey = parent.get('lookupKey');
    var suggestions = items.filter(function (item) {
      var search = item[lookupKey].toLowerCase();
      return search.indexOf(text) === 0;
    });

    parent.set('suggestions', suggestions);

  },

  searchTextObserver: Ember.observer('parent.searchText',function() {
    var text = this.get('parent').get('searchText');
    if (typeof text === 'undefined') return;

    var wait = parseInt(this.get("parent").get('delay'), 10) || 0;
    Ember.run.debounce(this, this.handleSearchText, wait);
  }),

  keyDown (event) {
    var autocomplete = this.get("parent");
    switch (event.keyCode) {
      case constants.KEYCODE.DOWN_ARROW:
        if (autocomplete.get('loading')) return;
        event.preventDefault();
        autocomplete.set('index', Math.min(autocomplete.get('index') + 1, autocomplete.get('matches').length - 1));
        autocomplete.updateScroll();
        autocomplete.updateMessages();
        break;
      case constants.KEYCODE.UP_ARROW:
        if (autocomplete.get('loading')) return;
        event.preventDefault();
        autocomplete.set('index', autocomplete.get('index') < 0 ? autocomplete.get('matches').length - 1 : Math.max(0, autocomplete.get('index') - 1));
        autocomplete.updateScroll();
        autocomplete.updateMessages();
        break;
      case constants.KEYCODE.TAB:
      case constants.KEYCODE.ENTER:
        if (autocomplete.get('hidden') || autocomplete.get('loading') || autocomplete.get('index') < 0 || autocomplete.get('matches').length < 1) return;
        event.preventDefault();
        select(autocomplete.get('index'));
        break;
      case constants.KEYCODE.ESCAPE:
        autocomplete.set('matches', Ember.A([]));
        autocomplete.set('hidden', true);
        autocomplete.set('index', autocomplete.getDefaultIndex());
        break;
      default:
    }
  }

});
