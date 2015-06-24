import Ember from 'ember';
import RippleMixin from '../mixins/ripple-mixin';


export default Ember.Component.extend(RippleMixin, {
  tagName: 'md-list-item',
  hasProxiedElement: false,
  proxiedTypes: ['md-checkbox', 'md-switch'],



  /* RippleMixin overrides */
  center: false,
  dimBackground: false,
  isMenuItem: true,
  rippleContainerSelector: '.md-no-style',


  didInsertElement () {
    this._super(...arguments);
    this.setupComponent();
  },
  setupComponent () {
    var that = this,
      tEl = this.$(),
      proxyElement,
      secondaryItem = tEl[0].querySelector('.md-secondary'),
      proxiedTypes = this.proxiedTypes;

    tEl[0].setAttribute('role', 'listitem');


    if (!this.get("action")) {
      for (var i = 0, type; type = proxiedTypes[i]; ++i) {
        if (proxyElement = tEl[0].querySelector(type)) {
          this.set('hasProxiedElement', true);
          break;
        } else if (!tEl[0].querySelector('md-button')) {
          tEl.addClass('md-no-proxy');
        }
      }

      if (this.get('hasProxiedElement')) {
        wrapIn('div');
      }
    } else {
      wrapIn('button');
    }

    postInsertElement();


    ///
    /// Private API
    ///


    function wrapIn (type) {
      var container;

      if (type === 'div') {
        container = Ember.$('<div class="md-no-style md-list-item-inner">');
        container.append(tEl.contents());
        tEl.addClass('md-proxy-focus');
      } else {
        container = Ember.$('<md-button class="md-no-style"><div class="md-list-item-inner"></div></md-button>');
        container.click(function () {
          that.sendAction('action', that.get('param'));
        });
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

      if (secondaryItem) {
        var secondaryItemEl = Ember.$(secondaryItem);

        var childViews = that.get("childViews");
        childViews.forEach(function (childView) {
          if (secondaryItemEl.attr('id') === childView.elementId) {

            if (childView.action) {
              var buttonWrapper = Ember.$('<md-button class="md-secondary-container md-icon-button">');
              secondaryItemEl.attr('tabindex', '-1');
              secondaryItemEl.removeClass('md-secondary');
              buttonWrapper.append(secondaryItemEl);
              secondaryItemEl = buttonWrapper[0];
            }

            // Check for a secondary item and move it outside
            if (childView.action || ( that.get("action") && isProxiedElement(secondaryItem) )) {
              tEl.addClass('md-with-secondary');
              tEl.append(secondaryItemEl);
            }
          }
        });
      }
    }


    function isProxiedElement(el) {
      return proxiedTypes.indexOf(Ember.$(el).prop("tagName").toLowerCase()) !== -1;
    }


    function postInsertElement   () {
      var $element = that.$(),
        proxies    = [],
        firstChild = $element.find(">:first-child"),
        hasClick = firstChild && that.get("action");


      var children = $element.children();
      if (children.length && !that.get("action")) {
        proxiedTypes.forEach(function(type) {
          firstChild.find(type).each(function() {
            proxies.push(this);
          });
        });
      }

      if (proxies.length || hasClick) {
        $element.addClass('md-clickable');
      }

      if ($element.hasClass('md-proxy-focus') && proxies.length) {
        proxies.forEach(function(proxy) {
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



      if (!hasClick && !proxies.length && firstChild) {
        firstChild.on('keypress', function(e) {
          var tagName = Ember.$(e.target).prop("tagName");
          if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
            var keyCode = e.which || e.keyCode;
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


      if (proxies.length && firstChild) {
        $element.children().eq(0).on('click', function(e) {
          if (firstChild.find()) {
            proxies.forEach(function (proxy) {
              var proxyEl = Ember.$(proxy);
              if (e.target !== proxy && proxyEl.find(e.target).length === 0) {
                proxyEl.click();
              }
            });
          }
        });
      }

    }
  },



});
