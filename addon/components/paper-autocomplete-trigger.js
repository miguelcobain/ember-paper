import Ember from 'ember';
import layout from '../templates/components/paper-autocomplete-trigger';

const { Component, isPresent, isBlank, run, get, computed } = Ember;

export default Component.extend({
  layout,
  tagName: 'md-autocomplete-wrap',
  classNames: ['md-show-clear-button'],
  classNameBindings: ['noLabel:md-whiteframe-z1', 'select.isOpen:md-menu-showing'],

  noLabel: computed.not('extra.label'),
  _innerText: computed.oneWay('searchText'),

  text: computed('select', 'searchText', '_innerText', {
    get() {
      let {
        select,
        searchText,
        _innerText
      } = this.getProperties('select', 'searchText', '_innerText');

      if (select && select.selected) {
        return this.getSelectedAsText();
      }
      return searchText ? searchText : _innerText;
    },
    set(_, v) {
      let { select, searchText } = this.getProperties('select', 'searchText');
      this.set('_innerText', v);

      // searchText should always win
      if (!(select && select.selected) && isPresent(searchText)) {
        return searchText;
      }

      return v;
    }
  }),

  // Lifecycle hooks
  didUpdateAttrs({ oldAttrs, newAttrs }) {
    this._super(...arguments);
    /*
     * We need to update the input field with value of the selected option whenever we're closing
     * the select box. But we also close the select box when we're loading search results and when
     * we remove input text -- so protect against this
     */
    if (oldAttrs.select.isOpen && !newAttrs.select.isOpen && !newAttrs.loading && newAttrs.searchText) {
      this.set('text', this.getSelectedAsText());
    }

    if (newAttrs.lastSearchedText !== oldAttrs.lastSearchedText) {
      if (isBlank(newAttrs.lastSearchedText)) {
        run.schedule('actions', null, newAttrs.select.actions.close, null, true);
      } else {
        run.schedule('actions', null, newAttrs.select.actions.open);
      }
    } else if (!isBlank(newAttrs.lastSearchedText) && get(this, 'options.length') === 0 && this.get('loading')) {
      run.schedule('actions', null, newAttrs.select.actions.close, null, true);
    } else if (oldAttrs.loading && !newAttrs.loading && newAttrs.options.length > 0) {
      run.schedule('actions', null, newAttrs.select.actions.open);
    }
  },

  // Actions
  actions: {
    stopPropagation(e) {
      e.stopPropagation();
    },

    clear(e) {
      e.stopPropagation();
      this.set('text', '');
      this.get('select').actions.select(null);
      this.get('onInput')({ target: { value: '' } });
      this.get('onFocus')(e);
      this.$('input').focus();
    },

    handleKeydown(e) {
      let isLetter = e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode === 32; // Keys 0-9, a-z or SPACE
      let isSpecialKeyWhileClosed = !isLetter && !this.get('select.isOpen') && [13, 27, 38, 40].indexOf(e.keyCode) > -1;
      if (isLetter || isSpecialKeyWhileClosed) {
        e.stopPropagation();
      }
    },

    handleInputLocal(e) {
      // If something is already selected when the user types, it should clear selection
      if (this.get('select.selected')) {
        this.get('select').actions.select(null);
      }
      this.get('onInput')(e.target ? e : { target: { value: e } });
      this.set('text', e.target ? e.target.value : e);
    }
  },
  // Methods
  getSelectedAsText() {
    let labelPath = this.get('extra.labelPath');
    if (labelPath) {
      return this.get(`select.selected.${labelPath}`);
    } else {
      return this.get('select.selected');
    }
  }
});
