/* eslint-disable ember/no-classic-components, ember/no-computed-properties-in-native-classes */
import {
  attributeBindings,
  classNameBindings,
  tagName,
} from '@ember-decorators/component';
import { computed } from '@ember/object';
import { or, bool, filter } from '@ember/object/computed';

import Component from '@ember/component';
import { ParentMixin } from 'ember-composability-tools';
import { invokeAction } from 'ember-paper/utils/invoke-action';
/**
 * @class PaperItem
 * @extends Ember.Component
 * @uses ParentMixin
 */
@tagName('md-list-item')
@classNameBindings(
  'hasProxiedComponent:md-proxy-focus',
  'shouldBeClickable:md-clickable',
  'focused:md-focused',
  'hasPrimaryAction:_md-button-wrap'
)
@attributeBindings('role', 'tabindex', 'title')
export default class PaperItem extends Component.extend(ParentMixin) {
  _mouseEnterHandler = undefined;
  _mouseLeaveHandler = undefined;

  // Ripple Overrides
  // disable ripple when we have a primary action or when we don't have a proxied component
  @computed('hasPrimaryAction', 'hasProxiedComponent')
  get noink() {
    return this.hasPrimaryAction || !this.hasProxiedComponent;
  }

  role = 'listitem';
  tabindex = '-1';

  @filter('childComponents', function (c) {
    return !c.skipProxy;
  })
  proxiedComponents;

  @bool('proxiedComponents.length')
  hasProxiedComponent;

  @or('hasProxiedComponent', 'onClick')
  shouldBeClickable;

  @or('onClick', 'href')
  hasPrimaryAction;

  @computed('hasPrimaryAction', 'hasProxiedComponent')
  get noProxy() {
    return !this.hasPrimaryAction && !this.hasProxiedComponent;
  }

  @computed('proxiedComponents.[]')
  get secondaryItem() {
    let proxiedComponents = this.proxiedComponents;
    return proxiedComponents.objectAt(0);
  }

  didInsertElement() {
    super.didInsertElement(...arguments);

    this._mouseEnterHandler = this.handleMouseEnter.bind(this);
    this._mouseLeaveHandler = this.handleMouseLeave.bind(this);

    this.element.addEventListener('mouseenter', this._mouseEnterHandler);
    this.element.addEventListener('mouseleave', this._mouseLeaveHandler);
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);

    this.element.removeEventListener('mouseenter', this._mouseEnterHandler);
    this.element.removeEventListener('mouseleave', this._mouseLeaveHandler);

    this._mouseEnterHandler = undefined;
    this._mouseLeaveHandler = undefined;
  }

  click() {
    this.proxiedComponents.forEach((component) => {
      if (
        !!component.processProxy &&
        !component.disabled &&
        !!(component.bubbles || !this.hasPrimaryAction)
      ) {
        component.processProxy();
      }
    });
  }

  handleMouseEnter(e) {
    invokeAction(this, 'onMouseEnter', e);
  }

  handleMouseLeave(e) {
    invokeAction(this, 'onMouseLeave', e);
  }
}
