/**
 * @module ember-paper
 */
import Component from '@ember/component';
import { not } from '@ember/object/computed';
import { computed } from '@ember/object';
import layout from '../templates/components/paper-autocomplete-trigger';
import unwrapProxy from 'ember-paper/utils/unwrap-proxy';

/**
 * @class PaperAutocompleteTrigger
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'md-autocomplete-wrap',
  classNameBindings: ['noLabel:md-whiteframe-z1', 'select.isOpen:md-menu-showing', 'showingClearButton:md-show-clear-button'],

  noLabel: not('extra.label'),
  showingClearButton: computed('allowClear', 'disabled', 'resetButtonDestroyed', function() {
    // make room for clear button:
    // - if we're enabled
    // - or if we're disabled but the button still wasn't destroyed
    return this.get('allowClear') && (
      !this.get('disabled') || (this.get('disabled') && !this.get('resetButtonDestroyed'))
    );
  }),

  text: computed('select.{searchText,selected}', function() {
    let selected = unwrapProxy(this.get('select.selected'));
    if (selected) {
      return this.getSelectedAsText();
    }
    return this.get('select.searchText');
  }).readOnly(),

  // Lifecycle hooks
  didUpdateAttrs() {
    this._super(...arguments);
    let prevDisabled = this.get('_prevDisabled');
    let disabled = this.get('disabled');
    if (prevDisabled && !disabled) {
      this.set('resetButtonDestroyed', false);
    }

    this.setProperties({
      _prevDisabled: disabled
    });
  },

  // Actions
  actions: {
    stopPropagation(e) {
      e.stopPropagation();
    },

    clear(e) {
      e.stopPropagation();
      if (this.get('onClear')) {
        this.get('onClear')();
      } else {
        this.get('select').actions.select(null);
        this.get('onInput')({ target: { value: '' } });
      }
      this.get('onFocus')(e);
      this.element.querySelector('input').focus();
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
    },

    resetButtonDestroyed() {
      if (this.get('disabled')) {
        this.set('resetButtonDestroyed', true);
      }
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
