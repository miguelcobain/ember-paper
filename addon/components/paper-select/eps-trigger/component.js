/* eslint-disable ember/no-classic-components, ember/no-computed-properties-in-native-classes, prettier/prettier */
import Component from '@ember/component';
import template from './template';

import { tagName, layout } from '@ember-decorators/component';
import { computed, action } from '@ember/object';

@tagName('')
@layout(template)
export default class PaperSelectEpsTrigger extends Component {

  @computed('placeholder', 'extra.label', 'select.selected')
  get isPlaceholder() {
    return (this.placeholder || this.extra.label) && !this.select.selected;
  }

  @action
  clear(e) {
    e.stopPropagation();
    this.select.actions.select(null);
    if (e.type === 'touchstart') {
      return false;
    }
  }

}
