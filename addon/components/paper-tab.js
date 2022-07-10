/* eslint-disable ember/no-computed-properties-in-native-classes, ember/no-classic-components, ember/no-mixins, ember/classic-decorator-hooks, ember/classic-decorator-no-classic-methods */
import {
  classNames,
  attributeBindings,
  classNameBindings,
  tagName,
  layout as templateLayout,
} from '@ember-decorators/component';

import { computed } from '@ember/object';
import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import layout from '../templates/components/paper-tab';
import { ChildMixin } from 'ember-composability-tools';
import FocusableMixin from 'ember-paper/mixins/focusable-mixin';
import { invokeAction } from 'ember-paper/utils/invoke-action';

@templateLayout(layout)
@tagName('md-tab-item')
@classNames('md-tab')
@classNameBindings('isSelected:md-active')
@attributeBindings('isSelected:aria-selected', 'style', 'maybeHref:href')
export default class PaperTab extends Component.extend(ChildMixin, FocusableMixin) {
  // <a> tags have browser styles or are usually styled by the user
  // this makes sure that tab item still looks good with an anchor tag
  @computed('href')
  get style() {
    if (this.href) {
      return htmlSafe('text-decoration: none; border: none;');
    } else {
      return undefined;
    }
  }

  @computed('href', 'disabled')
  get maybeHref() {
    if (this.href && !this.disabled) {
      return this.href;
    } else {
      return undefined;
    }
  }

  @computed('selected', 'value')
  get isSelected() {
    return this.selected === this.value;
  }

  init() {
    super.init(...arguments);
    if (this.href) {
      this.set('tagName', 'a');
    }
  }

  // this method is called by the parent
  updateDimensions() {
    // this is the true current width
    // it is used to calculate the ink bar position & pagination offset
    this.setProperties({
      left: this.element.offsetLeft,
      width: this.element.offsetWidth
    });
  }

  click() {
    if (!this.disabled) {
      invokeAction(this, 'onClick', ...arguments);
      invokeAction(this, 'onSelect', this);
    }
  }
}
