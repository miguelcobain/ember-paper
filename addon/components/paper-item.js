/* eslint-disable ember/no-classic-components, ember/no-component-lifecycle-hooks, ember/no-computed-properties-in-native-classes, ember/require-tagless-components, prettier/prettier */
import {
  attributeBindings,
  classNameBindings,
  tagName,
} from '@ember-decorators/component';
import { computed } from '@ember/object';
import { or, bool, filter } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';

import Component from '@ember/component';
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
export default class PaperItem extends Component {
  _mouseEnterHandler = undefined;
  _mouseLeaveHandler = undefined;

  @tracked
  childComponents = [];

  register(newChild) {
    this.childComponents = [...this.childComponents, newChild];
  }

  deRegister(child) {
    this.childComponents = this.childComponents.filter(
      (item) => item !== child
    );
  }

  // Ripple Overrides
  // disable ripple when we have a primary action or when we don't have a proxied component
  @computed('hasPrimaryAction', 'hasProxiedComponent')
  get noink() {
    return this.hasPrimaryAction || !this.hasProxiedComponent;
  }

  role = 'listitem';
  tabindex = '-1';

  @filter('childComponents', function (c) {
    return !c.get('skipProxy');
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
        component.processProxy &&
        !component.get('disabled') &&
        component.get('bubbles') | !this.hasPrimaryAction
      ) {
        component.processProxy();
      }
    });
  }

  handleMouseEnter(e) {
    if(this){
      invokeAction(this, 'onMouseEnter', e);
    }
  }

  handleMouseLeave(e) {
    if(this){
      invokeAction(this, 'onMouseLeave', e);
    }
  }
}
