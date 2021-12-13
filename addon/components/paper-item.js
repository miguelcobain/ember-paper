/**
 * @module ember-paper
 */
import { filter, bool, or } from '@ember/object/computed';

import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/paper-item';
import { ParentMixin } from 'ember-composability-tools';
import { invokeAction } from 'ember-paper/utils/invoke-action';
/**
 * @class PaperItem
 * @extends Ember.Component
 * @uses ParentMixin
 */
export default Component.extend(ParentMixin, {
  layout,
  tagName: 'md-list-item',

  _mouseEnterHandler: undefined,
  _mouseLeaveHandler: undefined,

  // Ripple Overrides
  // disable ripple when we have a primary action or when we don't have a proxied component
  noink: computed('hasPrimaryAction', 'hasProxiedComponent', function() {
    return this.hasPrimaryAction || !this.hasProxiedComponent;
  }),

  classNameBindings: [
    'hasProxiedComponent:md-proxy-focus', 'shouldBeClickable:md-clickable',
    'focused:md-focused', 'hasPrimaryAction:_md-button-wrap'
  ],
  attributeBindings: ['role', 'tabindex', 'title'],
  role: 'listitem',
  tabindex: '-1',

  proxiedComponents: filter('childComponents', function(c) {
    return !c.get('skipProxy');
  }),

  hasProxiedComponent: bool('proxiedComponents.length'),
  shouldBeClickable: or('hasProxiedComponent', 'onClick'),

  hasPrimaryAction: or('onClick', 'href'),

  noProxy: computed('hasPrimaryAction', 'hasProxiedComponent', function() {
    return !this.hasPrimaryAction && !this.hasProxiedComponent;
  }),

  secondaryItem: computed('proxiedComponents.[]', function() {
    let proxiedComponents = this.proxiedComponents;
    return proxiedComponents.objectAt(0);
  }),

  didInsertElement() {
    this._super(...arguments);

    this._mouseEnterHandler = this.handleMouseEnter.bind(this);
    this._mouseLeaveHandler = this.handleMouseLeave.bind(this);

    this.element.addEventListener('mouseenter', this._mouseEnterHandler);
    this.element.addEventListener('mouseleave', this._mouseLeaveHandler);
  },

  willDestroyElement() {
    this._super(...arguments);

    this.element.removeEventListener('mouseenter', this._mouseEnterHandler);
    this.element.removeEventListener('mouseleave', this._mouseLeaveHandler);

    this._mouseEnterHandler = undefined;
    this._mouseLeaveHandler = undefined;
  },

  click() {
    this.proxiedComponents.forEach((component) => {
      if (component.processProxy && !component.get('disabled') && (component.get('bubbles') | !this.hasPrimaryAction)) {
        component.processProxy();
      }
    });
  },

  handleMouseEnter(e) {
    invokeAction(this, 'onMouseEnter', e);
  },

  handleMouseLeave(e) {
    invokeAction(this, 'onMouseLeave', e);
  }
});
