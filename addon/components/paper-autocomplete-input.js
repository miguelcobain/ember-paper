import Ember from 'ember';
import BaseFocusable from './base-focusable';
import constants from '../utils/constants';

export default Ember.TextField.extend({
  type: 'search',

  hadKeyDown: false,


  keyDown (event) {
    var autocomplete = this.get("parent");
    switch (event.keyCode) {
      case constants.KEYCODE.DOWN_ARROW:
        if (autocomplete.get('loading')) return;
        event.preventDefault();
        autocomplete.set('index', Math.min(autocomplete.get('index') + 1, autocomplete.get('suggestions').length - 1));
        this.updateScroll();
        break;
      case constants.KEYCODE.UP_ARROW:
        if (autocomplete.get('loading')) return;
        event.preventDefault();
        autocomplete.set('index', autocomplete.get('index') < 0 ? autocomplete.get('suggestions').length - 1 : Math.max(0, autocomplete.get('index') - 1));
        this.updateScroll();
        break;
      case constants.KEYCODE.TAB:
      case constants.KEYCODE.ENTER:
        if (autocomplete.get('index') < 0 || autocomplete.get('suggestions').length < 1) return;
        event.preventDefault();
        autocomplete.set('model', autocomplete.get('suggestions')[autocomplete.get('index')]);
        autocomplete.set('hidden', true);

        break;
      case constants.KEYCODE.ESCAPE:
        autocomplete.set('matches', Ember.A([]));
        autocomplete.set('hidden', true);
        break;
      default:
    }
    this.get('parent').set('hadKeyDown', true);
  },

  updateScroll () {
    var autocomplete = this.get("parent");
    var suggestions = autocomplete.get('suggestions');
    if (!suggestions[autocomplete.get('index')]) return;
    var ul = autocomplete.get('ulContainer'),
        li  = ul.find('li:eq('+autocomplete.get('index')+')')[0],
      top = li.offsetTop,
      bot = top + li.offsetHeight,
      hgt = ul[0].clientHeight;
    if (top < ul[0].scrollTop) {
      ul[0].scrollTop = top;
    } else if (bot > ul[0].scrollTop + hgt) {
      ul[0].scrollTop = bot - hgt;
    }
  }

});
