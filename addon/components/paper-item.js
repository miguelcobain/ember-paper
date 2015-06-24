import Ember from 'ember';
import RippleMixin from '../mixins/ripple-mixin';
import PaperCheckbox from './paper-checkbox';
import PaperSwitch from './paper-switch';



export default Ember.Component.extend(RippleMixin, {
  tagName: 'md-list-item',

  proxyControls: [PaperCheckbox, PaperSwitch],

  /* RippleMixin overrides */
  center: false,
  dimBackground: false,
  isMenuItem: true,
  rippleContainerSelector: '.md-no-style',



  setup: Ember.on('init', function() {
    this.set('proxiedViews', []);
    this.set('secondaryItem', null);
    this.set('hasProxiedElement', false);
  }),


  willInsertElement () {
    this._computeChildData();

  },

  didInsertElement () {
    this._super(...arguments);
    this.setupComponent();
  },

  /**
   * Checks if a view is registered as proxied view.
   * @param view
   * @private
   */
  _isProxiedView: function (view) {
    for (let i = 0; i < this.get("proxiedViews").length; i++) {
      if (this.get("proxiedViews")[i] === view) {
        return true;
      }
    }
    return false;
  },

  /**
   * Returns a list of click through proxies.
   * Checkboxes only.
   */
  clickThroughProxies: Ember.computed('proxiedViews',function () {
    var list = [];
    this.get("proxiedViews").forEach(function (view) {
      if (PaperCheckbox.detect(view.constructor)) {
        list.push(view);
      }
    });
    return list;
  }),



  _computeChildData: function () {
    for (let i = 0; i < this.get("childViews").length; i++) {
      let view = this.get("childViews")[i];
      if (view.classNames.indexOf('md-secondary') !== -1) {
        this.set('secondaryItem', view);
      }
      for(let j = 0; j < this.get("proxyControls").length; j++) {
        var type = this.get("proxyControls")[j];
        if (type.detect(view.constructor)) {
          this.get("proxiedViews").push(view);
          this.set('hasProxiedElement', true);
        }
      }
    }
    return null;
  },

  setupComponent () {
    var that = this,
      tEl = this.$(),
      secondaryItem = this.get("secondaryItem");

    tEl[0].setAttribute('role', 'listitem');



    if (!this.get("action")) {
      if (this.get('hasProxiedElement')) {
        wrapIn('div');
      } else {
        tEl.addClass('md-no-proxy');
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
        var secondaryItemEl = secondaryItem.$();

        if (secondaryItem.action) {
          var buttonWrapper = Ember.$('<md-button class="md-secondary-container md-icon-button">');
          secondaryItemEl.attr('tabindex', '-1');
          secondaryItemEl.removeClass('md-secondary');
          buttonWrapper.append(secondaryItemEl);
          secondaryItemEl = buttonWrapper[0];
        }

        // Check for a secondary item and move it outside
        if (secondaryItem.action || ( that.get("action") && that._isProxiedView(secondaryItem) )) {
          tEl.addClass('md-with-secondary');
          tEl.append(secondaryItemEl);
        }
      }
    }



    function postInsertElement   () {
      var $element = that.$(),
        proxies    = that.get("clickThroughProxies"),
        firstChild = $element.find(">:first-child"),
        hasClick = firstChild && that.get("action");



      if (proxies.length || hasClick) {
        $element.addClass('md-clickable');
      }

      if ($element.hasClass('md-proxy-focus') && proxies.length) {
        proxies.forEach(function(view) {
          var el = view.$();

          that.mouseActive = false;
          el.on('mousedown', function() {
            that.mouseActive = true;
            Ember.run.later(function(){
              that.mouseActive = false;
            }, 100);
          })
            .on('focus', function() {
              if (that.mouseActive === false) { $element.addClass('md-focused'); }
              el.on('blur', function proxyOnBlur() {
                $element.removeClass('md-focused');
                el.off('blur', proxyOnBlur);
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
            proxies.forEach(function (view) {
              var proxyEl = view.$();
              if (e.target !== view.element && proxyEl.find(e.target).length === 0) {
                view.click();
              }
            });
          }
        });
      }

    }
  },



});
