/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-item';
import RippleMixin from '../mixins/ripple-mixin';
import { ParentMixin } from 'ember-composability-tools';

const { Component, computed } = Ember;

/**
 * @class PaperItem
 * @extends Ember.Component
 * @uses ParentMixin
 * @uses RippleMixin
 */
export default Component.extend(RippleMixin, ParentMixin, {
  layout,
  tagName: 'md-list-item',

  // Ripple Overrides
  rippleContainerSelector: '.md-no-style',
  // disable ripple when we have a primary action or when we don't have a proxied component
  noink: computed('hasPrimaryAction', 'hasProxiedComponent', function() {
    return this.get('hasPrimaryAction') || !this.get('hasProxiedComponent');
  }),

  center: false,
  dimBackground: true,
  outline: false,

  classNameBindings: [
    'hasProxiedComponent:md-proxy-focus', 'shouldBeClickable:md-clickable',
    'focused:md-focused', 'hasPrimaryAction:_md-button-wrap'
  ],
  attributeBindings: ['role', 'tabindex'],
  role: 'listitem',
  tabindex: '-1',

  proxiedComponents: computed.filter('childComponents', function(c) {
    return !c.get('skipProxy');
  }),

  hasProxiedComponent: computed.bool('proxiedComponents.length'),
  shouldBeClickable: computed.or('hasProxiedComponent', 'onClick'),

  hasPrimaryAction: computed.or('onClick', 'href'),

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

  mouseEnter(ev) {
    this.sendAction('onMouseEnter', ev);
  },

  mouseLeave(ev) {
    this.sendAction('onMouseLeave', ev);
  }
});
