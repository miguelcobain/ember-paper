import Ember from 'ember';
import RippleMixin from '../mixins/ripple-mixin';
import ProxyMixin from 'ember-paper/mixins/proxy-mixin';

export default Ember.Component.extend(RippleMixin, ProxyMixin, {
  tagName: 'md-list-item',

  // Ripple Overrides
  rippleContainerSelector: '.md-no-style',
  center: false,
  dimBackground: true,
  outline: false,
  noink: Ember.computed.not('shouldBeClickable'),

  classNameBindings: ['shouldBeClickable:md-clickable', 'hasProxiedComponent:md-proxy-focus'],
  attributeBindings: ['role', 'tabindex'],
  role: 'listitem',
  tabindex: '-1',

  hasProxiedComponent: Ember.computed.bool('proxiedComponents.length'),

  hasSecondaryAction: Ember.computed('secondaryItem', 'onClick', function() {
    let secondaryItem = this.get('secondaryItem');
    return secondaryItem && (secondaryItem.action || (this.get('onClick') && this.isProxiedComponent(secondaryItem)));
  }),

  secondaryItem: Ember.computed('proxiedComponents.[]', function() {
    let proxiedComponents = this.get('proxiedComponents');
    return proxiedComponents.find(function(component) {
      return component.classNames.indexOf('md-secondary') !== -1;
    });
  }),

  shouldBeClickable: Ember.computed('proxiedComponents.length', 'onClick', function() {
    return this.get('proxiedComponents.length') || this.get('onClick');
  }),

  didInsertElement() {
    this._super(...arguments);

    let _this = this;
    let tEl = this.$();
    let proxies = this.get('proxiedComponents');

    // Secondary item has separate action.
    // Unregister so we don't proxy it.
    if (this.get('hasSecondaryAction')) {
      this.get('secondaryItem').set('bubbles', false);
      this.unregister(this.get('secondaryItem'));
    }

    // Allow proxied component to propagate ripple hammer event
    this.get('proxiedComponents').forEach(function(component) {
      if (!component.get('onClick')) {
        component.set('propagateRipple', true);
      }
    });
    // Don't allow proxied component to bubble click event to parent list-item
    this.get('proxiedComponents').setEach('bubbles', false);

    this.$('.md-icon-button').addClass('md-secondary-container');

    if (this.get('hasProxiedComponent')) {
      proxies.forEach(function(view) {
        let el = view.$();

        _this.mouseActive = false;
        el.on('mousedown', function() {
          _this.mouseActive = true;
          Ember.run.later(function() {
            _this.mouseActive = false;
          }, 100);
        }).on('focus', function() {
            if (_this.mouseActive === false) {
              tEl.addClass('md-focused');
            }
            el.on('blur', function proxyOnBlur() {
              tEl.removeClass('md-focused');
              el.off('blur', proxyOnBlur);
            });
          });
      });
    }

    if (!this.get('shouldBeClickable')) {
      let firstChild = tEl.find('>:first-child');
      firstChild.on('keypress', function(e) {
        let tagName = Ember.$(e.target).prop('tagName');
        if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
          let keyCode = e.which || e.keyCode;
          if (keyCode === 32) {
            if (firstChild) {
              firstChild.click();
              e.preventDefault();
              e.stopPropagation();
            }
          }
        }
      });
    }
  },

  actions: {
    buttonAction() {
      this.get('proxiedComponents').forEach(function(component) {
        if (component.processProxy) {
          component.processProxy();
        }
      });
      this.sendAction('onClick');
    }
  }

});
