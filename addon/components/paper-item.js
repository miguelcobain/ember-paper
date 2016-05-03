import Ember from 'ember';
import RippleMixin from '../mixins/ripple-mixin';
import ProxyMixin from 'ember-paper/mixins/proxy-mixin';

const {
  get,
  set,
  isEmpty,
  isEqual,
  computed,
  run: { scheduleOnce, later }
} = Ember;

const {
  not,
  bool
} = computed;

export default Ember.Component.extend(RippleMixin, ProxyMixin, {
  tagName: 'md-list-item',

  // Ripple Overrides
  rippleContainerSelector: '.md-no-style',
  center: false,
  dimBackground: true,
  outline: false,
  noink: not('shouldBeClickable'),

  classNameBindings: ['shouldBeClickable:md-clickable', 'hasProxiedComponent:md-proxy-focus'],
  attributeBindings: ['role', 'tabindex'],
  role: 'listitem',
  tabindex: '-1',

  hasProxiedComponent: bool('proxiedComponents.length'),

  hasSecondaryAction: computed('secondaryItem', 'onClick', {
    get() {
      let secondaryItem = get(this, 'secondaryItem');
      if (!isEmpty(secondaryItem)) {
        let hasClickAction = get(this, 'onClick') && this.isProxiedComponent(secondaryItem);
        let isCheckbox = get(secondaryItem, 'onChange') && this.isProxiedComponent(secondaryItem);
        return secondaryItem && (secondaryItem.action || hasClickAction || isCheckbox);
      } else {
        return false;
      }
    }
  }),

  secondaryItem: computed('proxiedComponents.[]', {
    get() {
      let proxiedComponents = get(this, 'proxiedComponents');
      return proxiedComponents.find((component)=> {
        return get(component, 'isSecondary');
      });
    }
  }),

  shouldBeClickable: computed('proxiedComponents.length', 'onClick', {
    get() {
      return get(this, 'proxiedComponents.length') || get(this, 'onClick');
    }
  }),

  setupProxiedComponent() {
    scheduleOnce('afterRender', this, ()=> {
      let tEl = this.$();
      let proxiedComponents = get(this, 'proxiedComponents');
      // buttons and md-checkboxes should have .md-secondary class
      proxiedComponents.forEach((component)=> {
        if (isEqual(get(component, 'tagName'), 'button') || isEqual(get(component, 'tagName'), 'md-checkbox')) {
          if (!get(component, 'isSecondary')) {
            set(component, 'isSecondary', true);
          }
        }
      });
      // Secondary item has separate action.
      // Unregister so we don't proxy it.
      if (get(this, 'hasSecondaryAction')) {
        let bubbles = get(this, 'secondaryItem.bubbles');
        if (isEmpty(bubbles)) {
          set(this, 'secondaryItem.bubbles', false);
          this.unregister(get(this, 'secondaryItem'));
        }
      } else {
        debugger;
      }
      // Allow proxied component to propagate ripple hammer event
      proxiedComponents.forEach((component)=> {
        if (!get(component, 'onClick') && !get(component, 'propagateRipple')) {
          set(component, 'propagateRipple', true);
        }
      });
      proxiedComponents.forEach((view)=> {
        let isSecondaryHandlerSet = get(view, 'isSecondaryHandlerSet');
        if (isEmpty(isSecondaryHandlerSet)) {
          let el = view.$();
          set(this, 'mouseActive', false);
          el.on('mousedown', ()=> {
            set(this, 'mouseActive', true);
            later(()=> {
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
          set(view, 'isSecondaryHandlerSet', true);
        }
      });
    });
  },

  didInsertElement() {
    this._super(...arguments);
    this.addObserver('hasProxiedComponent', this, 'setupProxiedComponent');
  },

  actions: {
    buttonAction() {
      this.get('proxiedComponents').forEach((component)=> {
        if (component.processProxy) {
          component.processProxy();
        }
      });
      this.sendAction('onClick');
    }
  }

});
