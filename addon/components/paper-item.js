/**
 * @module ember-paper
 */
import Ember from 'ember';
import RippleMixin from '../mixins/ripple-mixin';
import ProxyMixin from 'ember-paper/mixins/proxy-mixin';

const {
  get,
  set,
  isEmpty,
  computed,
  run,
  Component
} = Ember;

/**
 * @class PaperItem
 * @extends Ember.Component
 * @uses ProxyMixin
 * @uses RippleMixin
 */
export default Component.extend(RippleMixin, ProxyMixin, {
  tagName: 'md-list-item',

  // Ripple Overrides
  rippleContainerSelector: '.md-no-style',
  center: false,
  dimBackground: true,
  outline: false,

  classNameBindings: ['shouldBeClickable:md-clickable', 'hasProxiedComponent:md-proxy-focus'],
  attributeBindings: ['role', 'tabindex'],
  role: 'listitem',
  tabindex: '-1',

  hasProxiedComponent: computed.bool('proxiedComponents.length'),

  hasPrimaryAction: computed.notEmpty('onClick'),

  hasSecondaryAction: computed('secondaryItem', 'onClick', function() {
    let secondaryItem = get(this, 'secondaryItem');
    if (!isEmpty(secondaryItem)) {
      let hasClickAction = get(secondaryItem, 'onClick');
      let hasChangeAction = get(secondaryItem, 'onChange');
      return hasClickAction || hasChangeAction;
    } else {
      return false;
    }
  }),

  secondaryItem: computed('proxiedComponents.[]', function() {
    let proxiedComponents = get(this, 'proxiedComponents');
    return proxiedComponents.find((component)=> {
      return get(component, 'isSecondary');
    });
  }),

  shouldBeClickable: computed.or('proxiedComponents.length', 'onClick'),

  click(ev) {
    this.get('proxiedComponents').forEach((component)=> {
      if (component.processProxy && !get(component, 'disabled') && (get(component, 'bubbles') | !get(this, 'hasPrimaryAction'))) {
        component.processProxy();
      }
    });
    this.sendAction('onClick', ev);
  },

  setupProxiedComponent() {
    let tEl = this.$();
    let proxiedComponents = get(this, 'proxiedComponents');
    proxiedComponents.forEach((component)=> {
      let isProxyHandlerSet = get(component, 'isProxyHandlerSet');
      // we run init only once for each component.
      if (!isProxyHandlerSet) {
        // Allow proxied component to propagate ripple hammer event
        if (!get(component, 'onClick') && !get(component, 'propagateRipple')) {
          set(component, 'propagateRipple', true);
        }
        // ripple
        let el = component.$();
        set(this, 'mouseActive', false);
        el.on('mousedown', ()=> {
          set(this, 'mouseActive', true);
          run.later(()=> {
            set(this, 'mouseActive', false);
          }, 100);
        });
        el.on('focus', ()=> {
          if (!get(this, 'mouseActive')) {
            tEl.addClass('md-focused');
          }
          el.on('blur', function proxyOnBlur() {
            tEl.removeClass('md-focused');
            el.off('blur', proxyOnBlur);
          });
        });
        // If we don't have primary action then
        // no need to bubble
        if (!get(this, 'hasPrimaryAction')) {
          let bubbles = get(component, 'bubbles');
          if (isEmpty(bubbles)) {
            set(component, 'bubbles', false);
          }
        } else if (get(proxiedComponents, 'length')) {
          // primary action exists. Make sure child
          // that has separate action won't bubble.
          proxiedComponents.forEach((component)=> {
            let hasClickAction = get(component, 'onClick');
            let hasChangeAction = get(component, 'onChange');
            if (hasClickAction || hasChangeAction) {
              let bubbles = get(component, 'bubbles');
              if (isEmpty(bubbles)) {
                set(component, 'bubbles', false);
              }
            }
          });
        }
        // Init complete. We don't want it to run again
        // for that particular component.
        set(component, 'isProxyHandlerSet', true);
      }
    });
  }
});
