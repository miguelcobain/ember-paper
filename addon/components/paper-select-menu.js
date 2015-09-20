import Ember from 'ember';
import PaperMenuAbstract from './paper-menu-abstract';

var searchStr = '';
var clearSearchTimeout, optNodes, optText;
var CLEAR_SEARCH_AFTER = 300;



export default Ember.Component.extend({
  tagName: 'md-select-menu',
  classNames: ['md-default-theme'],

  constants: Ember.inject.service(),


  menuAbstract: Ember.computed(function() {
    var container = this.nearestOfType(PaperMenuAbstract);
    return container;
  }),

  keyDown(ev) {
    var KeyCodes = this.get('constants').KEYCODE;
    switch(ev.keyCode) {
      case KeyCodes.get('TAB'):
      case KeyCodes.get('ESCAPE'):
        this.get('menuAbstract').send('toggleMenu');
        break;
      case KeyCodes.get('UP_ARROW'):
        this.focusPrevOption();
        break;
      case KeyCodes.get('DOWN_ARROW'):
        this.focusNextOption();
        break;
      default:
        if (ev.keyCode >= 31 && ev.keyCode <= 90) {
          var optNode = this.optNodeForKeyboardSearch(ev);
          this.get('menuAbstract').set('focusedNode', optNode || this.get('menuAbstract').get('focusedNode'));
          if (optNode) {
            optNode.focus();
          }
        }
    }
  },


  optNodeForKeyboardSearch(e) {
    if (clearSearchTimeout) {
      clearTimeout(clearSearchTimeout);
    }
    clearSearchTimeout = setTimeout(function() {
      clearSearchTimeout = undefined;
      searchStr = '';
      optText = undefined;
      optNodes = undefined;
    }, CLEAR_SEARCH_AFTER);
    searchStr += String.fromCharCode(e.keyCode);
    var search = new RegExp('^' + searchStr, 'i');
    if (!optNodes) {
      optNodes = this.$().find('md-option');
      optText = new Array(optNodes.length);
      optNodes.each(function(i, el) {
        optText[i] = el.textContent.trim();
      });
    }
    for (var i = 0; i < optText.length; ++i) {
      if (search.test(optText[i])) {
        return optNodes[i];
      }
    }
  },


  focusOption(direction) {
    var optionsArray = this.$().find('md-option').toArray();
    var index = optionsArray.indexOf(this.get('menuAbstract').get('focusedNode'));

    var newOption;

    do {
      if (index === -1) {
        // We lost the previously focused element, reset to first option
        index = 0;
      } else if (direction === 'next' && index < optionsArray.length - 1) {
        index++;
      } else if (direction === 'prev' && index > 0) {
        index--;
      }
      newOption = optionsArray[index];
      if (newOption.hasAttribute('disabled')) {
        newOption = undefined;
      }
    } while (!newOption && index < optionsArray.length - 1 && index > 0);

    if (newOption) {
      newOption.focus();
    }
    this.get('menuAbstract').set('focusedNode', newOption);
  },
  focusNextOption() {
    this.focusOption('next');
  },
  focusPrevOption() {
    this.focusOption('prev');
  }

});
