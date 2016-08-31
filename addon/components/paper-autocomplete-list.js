/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Component } = Ember;
// TODO Move to constants?
const ITEM_HEIGHT = 41;
const MAX_HEIGHT = 5.5 * ITEM_HEIGHT;
const MENU_PADDING = 8;

/**
 * @class PaperAutocompleteList
 * @extends Ember.Component
 */
export default Component.extend({
  util: Ember.inject.service(),

  tagName: 'div',
  classNames: ['md-default-theme', 'md-autocomplete-suggestions-container', 'md-whiteframe-z1'],
  attributeNameBindings: ['role'],
  role: 'presentation',
  stickToElement: null,

  init() {
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

  // TODO reafactor into a computed property that binds directly to dropdown's `style`
  positionDropdown() {
    let hrect  = Ember.$(`#${this.get('wrapToElementId')}`)[0].getBoundingClientRect();
    let vrect  = hrect;
    let root   = document.body.getBoundingClientRect();
    let top    = vrect.bottom - root.top;
    let bot    = root.bottom - vrect.top;
    let left   = hrect.left - root.left;
    let { width }  = hrect;
    let styles = {
        left: `${left}px`,
        minWidth: `${width}px`,
        maxWidth: `${Math.max(hrect.right - root.left, root.right - hrect.left) - MENU_PADDING}px`
      };
    let ul = this.$();

    if (top > bot && root.height - hrect.bottom - MENU_PADDING < MAX_HEIGHT) {
      styles.top = 'auto';
      styles.bottom = `${bot}px`;
      styles.maxHeight = `${Math.min(MAX_HEIGHT, hrect.top - root.top - MENU_PADDING)}px`;
    } else {
      styles.top = `${top}px`;
      styles.bottom = 'auto';
      styles.maxHeight = `${Math.min(MAX_HEIGHT, root.bottom - hrect.bottom - MENU_PADDING)}px`;
    }
    ul.css(styles);
    correctHorizontalAlignment();

    /*
     * Makes sure that the menu doesn't go off of the screen on either side.
     */
    function correctHorizontalAlignment() {
      let dropdown = ul[0].getBoundingClientRect();
      let styles = {};
      if (dropdown.right > root.right - MENU_PADDING) {
        styles.left = `${hrect.right - dropdown.width}px`;
      }
      ul.css(styles);
    }
  },

  observeIndex: Ember.observer('selectedIndex', function() {
    let suggestions = this.get('suggestions');
    if (!suggestions || !suggestions.objectAt(this.get('selectedIndex'))) {
      return;
    }

    let ul = this.$();
    let li  = ul.find(`li:eq(${this.get('selectedIndex')})`).get(0);
    let top = li.offsetTop;
    let bot = top + li.offsetHeight;
    let hgt = ul[0].clientHeight;

    if (top < ul[0].scrollTop) {
      ul[0].scrollTop = top;
    } else if (bot > ul[0].scrollTop + hgt) {
      ul[0].scrollTop = bot - hgt;
    }
  }),

  resizeWindowEvent() {
    this.positionDropdown();
  },

  didInsertElement() {
    this._super(...arguments);

    // TODO refactor using ember-wormhole?
    let ul = this.$().detach();
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
