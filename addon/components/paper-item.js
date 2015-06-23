import Ember from 'ember';
import RippleMixin from '../mixins/ripple-mixin';

export default Ember.Component.extend({
  tagName: 'md-list-item',
  classNameBindings: ['hasProxiedElement::md-no-proxy'],
  hasProxiedElement: false,
  proxiedTypes: ['md-checkbox', 'md-switch'],

  hasClick: false,
  proxies: [],
  firstChild: null,

  didInsertElement() {
    this._super(...arguments);
    this.setupComponent();
  },
  setupComponent() {
    var tEl = this.$();
    // Check for proxy controls (no ng-click on parent, and a control inside)
    var proxyElement;

    tEl[0].setAttribute('role', 'listitem');

    if (!this.get("action")) {
      for (var i = 0, type; type = this.proxiedTypes[i]; ++i) {
        if (proxyElement = tEl[0].querySelector(type)) {
          this.set('hasProxiedElement', true);
          break;
        }
      }

      if (this.get('hasProxiedElement')) {
        wrapIn('div');
      }
    } else {
      wrapIn('button');
    }

    this.postInsertElement();



    function wrapIn (type) {
      var container;

      if (type === 'div') {
        container = Ember.$('<div class="md-no-style md-list-item-inner">');
        container.append(tEl.contents());
        tEl.addClass('md-proxy-focus');
      } else {
        container = Ember.$('<md-button class="md-no-style"><div class="md-list-item-inner"></div></md-button>');
        var copiedAttrs = ['aria-label'];
        copiedAttrs.forEach(function(attr) {
          if (tEl[0].hasAttribute(attr)) {
            container[0].setAttribute(attr, tEl[0].getAttribute(attr));
            tEl[0].removeAttribute(attr);
          }
        });
        container.children().eq(0).append(tEl.contents());
      }

      tEl[0].setAttribute('tabindex', '-1');
      tEl.append(container);
    }

  },

  postInsertElement: function () {
    var that = this,
      proxiedTypes = this.proxiedTypes,
      $element = this.$();
      this.proxies    = [];
      this.firstChild = $element.find(">:first-child");
      this.hasClick   = this.firstChild && this.get("action");


    var children = $element.children();
    if (children.length && !that.get("action")) {
      proxiedTypes.forEach(function(type) {
        that.firstChild.find(type).each(function() {
          that.proxies.push(this);
        });
      });
    }

    if (this.proxies.length || this.hasClick) {
      $element.addClass('md-clickable');
      // @todo Create ripple container inside md-no-style.
      //that.get('rippleService').setupButton(that, $element.find('.md-no-style'));
    }

    if ($element.hasClass('md-proxy-focus') && this.proxies.length) {
      this.proxies.forEach(function(proxy) {
        proxy = Ember.$(proxy);

        that.mouseActive = false;
        proxy.on('mousedown', function() {
          that.mouseActive = true;
          Ember.run.later(function(){
            that.mouseActive = false;
          }, 100);
        })
          .on('focus', function() {
            if (that.mouseActive === false) { $element.addClass('md-focused'); }
            proxy.on('blur', function proxyOnBlur() {
              $element.removeClass('md-focused');
              proxy.off('blur', proxyOnBlur);
            });
          });
      });
    }


  },



  click (e) {
    var proxies = this.proxies,
      firstChild = this.firstChild,
      $element = this.$(),
      that = this;

    if (proxies.length && firstChild) {
      if (firstChild.find()) {
        proxies.forEach(function(proxy) {
          var proxyEl = Ember.$(proxy);
          if (e.target !== proxy && proxyEl.find(e.target).length === 0) {
            proxyEl.trigger('click');
            console.log(proxy);
          }
        });
      }
    } else if (this.hasClick) {
      this.sendAction('action', that.get('param'));
    }
  },

  keyPress (e) {
    var that = this;

    if (!this.hasClick && !this.proxies.length && this.firstChild) {
      var tagName = Ember.$(e.target).prop("tagName");
      if (tagName != 'INPUT' && tagName != 'TEXTAREA') {
        var keyCode = e.which || e.keyCode;
        if (keyCode == 32) {
          if (that.firstChild) {
            that.firstChild.click();
            e.preventDefault();
            e.stopPropagation();
          }
        }
      }
    }

  }


});
