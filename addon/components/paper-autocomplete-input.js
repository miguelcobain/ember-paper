import Ember from 'ember';
import constants from '../utils/constants';

export default Ember.TextField.extend({
  type: 'search',

  hadKeyDown: false,


  focusOut (event) {
    if (this.get('parent').get('noBlur') === false) {
      this.get('parent').set('hidden', true);
    }
  },

  keyDown (event) {
    var autocomplete = this.get("parent");
    switch (event.keyCode) {
      case constants.KEYCODE.DOWN_ARROW:
        if (autocomplete.get('loading')) {
          return;
        }
        event.stopPropagation();
        autocomplete.set('index', Math.min(autocomplete.get('index') + 1, autocomplete.get('suggestions').length - 1));
        break;
      case constants.KEYCODE.UP_ARROW:
        if (autocomplete.get('loading')) {
          return;
        }
        event.stopPropagation();
        autocomplete.set('index', autocomplete.get('index') < 0 ? autocomplete.get('suggestions').length - 1 : Math.max(0, autocomplete.get('index') - 1));
        break;
      case constants.KEYCODE.TAB:
      case constants.KEYCODE.ENTER:
        if (autocomplete.get('index') < 0 || autocomplete.get('suggestions').length < 1) {
          return;
        }
        event.stopPropagation();
        autocomplete.set('model', autocomplete.get('suggestions')[autocomplete.get('index')]);
        autocomplete.set('hidden', true);

        break;
      case constants.KEYCODE.ESCAPE:
        event.stopPropagation();
        autocomplete.set('matches', Ember.A([]));
        autocomplete.set('hidden', true);
        break;
      default:
        break;
    }
    this.get('parent').set('hadKeyDown', true);
  },


  didInsertElement () {
    this.get('parent').set('inputContainer', this);
  }

});
