/**
 * @module ember-paper
 */
import { filter, bool, or } from '@ember/object/computed';

import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/paper-item';
import { ParentMixin } from 'ember-composability-tools';
import { invokeAction } from 'ember-invoke-action';
/**
 * @class PaperItem
 * @extends Ember.Component
 * @uses ParentMixin
 */
export default Component.extend(ParentMixin, {
  layout,
  tagName: 'md-list-item',

  // Ripple Overrides
  // disable ripple when we have a primary action or when we don't have a proxied component
  noink: computed('hasPrimaryAction', 'hasProxiedComponent', function() {
    return this.get('hasPrimaryAction') || !this.get('hasProxiedComponent');
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
    return !this.get('hasPrimaryAction') && !this.get('hasProxiedComponent');
  }),

  secondaryItem: computed('proxiedComponents.[]', function() {
    let proxiedComponents = this.get('proxiedComponents');
    return proxiedComponents.objectAt(0);
  }),

  click() {
    this.get('proxiedComponents').forEach((component) => {
      if (component.processProxy && !component.get('disabled') && (component.get('bubbles') | !this.get('hasPrimaryAction'))) {
        component.processProxy();
      }
    });
  },

  mouseEnter(e) {
    invokeAction(this, 'onMouseEnter', e);
  },

  mouseLeave(e) {
    invokeAction(this, 'onMouseLeave', e);
  }
});
