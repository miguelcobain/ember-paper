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

  text: computed('selected', 'searchText', '_innerText', {
    get() {
      let {
        selected,
        searchText,
        _innerText
      } = this.getProperties('selected', 'searchText', '_innerText');

      if (selected) {
        return this.getSelectedAsText();
      }
      return searchText ? searchText : _innerText;
    },
    set(_, v) {
      let { selected, searchText } = this.getProperties('selected', 'searchText');
      this.set('_innerText', v);

      // searchText should always win
      if (!selected && isPresent(searchText)) {
        return searchText;
      }

      return v;
    }
  }),

  // Lifecycle hooks
  init() {
    this._super(...arguments);
    this.set('oldSelect', this.get('select'));
    this.set('oldLoading', this.get('loading'));
    this.set('oldLastSearchedText', this.get('lastSearchedText'));
  },

  didUpdateAttrs() {
    this._super(...arguments);

    let oldSelect = this.get('oldSelect');
    let oldLoading = this.get('oldLoading');
    let oldLastSearchedText = this.get('oldLastSearchedText');

    let select = this.get('select');
    let loading = this.get('loading');
    let searchText = this.get('searchText');
    let lastSearchedText = this.get('lastSearchedText');
    let options = this.get('options');

    /*
     * We need to update the input field with value of the selected option whenever we're closing
     * the select box. But we also close the select box when we're loading search results and when
     * we remove input text -- so protect against this
     */
    if (oldSelect.isOpen && !select.isOpen && !loading && searchText) {
      this.set('text', this.getSelectedAsText());
    }

    if (lastSearchedText !== oldLastSearchedText) {
      if (isBlank(lastSearchedText)) {
        run.schedule('actions', null, select.actions.close, null, true);
      } else {
        run.schedule('actions', null, select.actions.open);
      }
    } else if (!isBlank(lastSearchedText) && get(this, 'options.length') === 0 && this.get('loading')) {
      run.schedule('actions', null, select.actions.close, null, true);
    } else if (oldLoading && !loading && options.length > 0) {
      run.schedule('actions', null, select.actions.open);
    }

    this.set('oldSelect', select);
    this.set('oldLoading', loading);
    this.set('oldLastSearchedText', lastSearchedText);
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
      if (this.get('selected')) {
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
      return this.get(`selected.${labelPath}`);
    } else {
      return this.get('selected');
    }
  }
});
