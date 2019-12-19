import Component from '@ember/component';
import template from './template';

import { tagName, layout } from '@ember-decorators/component';
import { computed, action, get } from '@ember/object';
import unwrapProxy from 'ember-paper/utils/unwrap-proxy';

@tagName('')
@layout(template)
class PaperSelectEpsTrigger extends Component {

  @computed('select.{searchText,selected}')
  get text() {
    let selected = unwrapProxy(this.select.selected);
    if (selected) {
      return this.getSelectedAsText();
    }
    return this.select.searchText;
  }

  getSelectedAsText() {
    let labelPath = this.extra.labelPath;
    if (labelPath) {
      return get(this.select.selected, labelPath);
    } else {
      return this.select.selected;
    }
  }

  @action
  handleKeydown(e) {
    let isLetter = e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode === 32; // Keys 0-9, a-z or SPACE
    let isSpecialKeyWhileClosed = !isLetter && !this.select.isOpen && [13, 27, 38, 40].indexOf(e.keyCode) > -1;
    if (isLetter || isSpecialKeyWhileClosed) {
      e.stopPropagation();
    }
  }

  @action
  _onInput(value) {
    this.onInput({ target: { value } });
  }

  @action
  didInsert(element) {
    this.triggerElement = element;
  }

  @action
  clear(e) {
    e.stopPropagation();
    if (this.onClear) {
      this.onClear();
    } else {
      this.select.actions.select(null);
      this.onInput({ target: { value: '' } });
    }
    this.onFocus(e);
    this.triggerElement.querySelector('input').focus();
  }

  @computed('allowClear', 'select.disabled', 'resetButtonDestroyed')
  get showingClearButton() {
    // make room for clear button:
    // - if we're enabled
    // - or if we're disabled but the button still wasn't destroyed
    return this.allowClear && (!this.select.disabled || (this.select.disabled && !this.resetButtonDestroyed));
  }

  @action
  resetButtonDestroyed() {
    if (this.disabled) {
      this.set('resetButtonDestroyed', true);
    }
  }

}

export default PaperSelectEpsTrigger;
