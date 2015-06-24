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


  classNameBindings: ['shouldBeClickable:md-clickable'],
  attributeBindings: ['role', 'tabindex'],
  role: 'listitem',
  tabindex: '-1',



  setup: Ember.on('init', function() {
    this.set('proxiedViews', Ember.A([]));
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
  _isProxiedView (view) {
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
  clickThroughProxies: Ember.computed('proxiedViews.@each',function () {
    return this.get("proxiedViews").filter(function (view) {
      return PaperCheckbox.detect(view.constructor);
    });
  }),



  _computeChildData () {
    var that = this;
    that.get("childViews").forEach(function (view) {
      if (view.classNames.indexOf('md-secondary') !== -1) {
        that.set('secondaryItem', view);
      }
      that.get("proxyControls").forEach(function (type) {
        if (type.detect(view.constructor)) {
          that.get("proxiedViews").pushObject(view);
          that.set('hasProxiedElement', true);
        }
      });
    });
  },

  shouldBeClickable: Ember.computed('clickThroughProxies.@each', 'action', function () {
    if (this.get("clickThroughProxies").length || this.get("action")) {
      return true;
    }
    return false;
  }),

  setupComponent () {
    var that = this,
      tEl = this.$(),
      proxies    = that.get("clickThroughProxies");

    if (!this.get("action")) {
      if (this.get('hasProxiedElement')) {
        this._wrapIn('div');
      } else if (!tEl[0].querySelector('md-button')) {
        tEl.addClass('md-no-proxy');
      }
    } else {
      this._wrapIn('button');
    }

    if (tEl.hasClass('md-proxy-focus') && proxies.length) {
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
            if (that.mouseActive === false) { tEl.addClass('md-focused'); }
            el.on('blur', function proxyOnBlur() {
              tEl.removeClass('md-focused');
              el.off('blur', proxyOnBlur);
            });
          });
      });
    }



    if (!this.get("shouldBeClickable")) {
      let firstChild = tEl.find(">:first-child");
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


    if (proxies.length) {
      tEl.children().eq(0).on('click', function(e) {
        proxies.forEach(function (view) {
          var proxyEl = view.$();
          if (e.target !== view.element && proxyEl.find(e.target).length === 0) {
            view.click();
          }
        });
      });
    }
  },

  _wrapIn (type) {
    var container,
      that = this,
      secondaryItem = this.get("secondaryItem"),
      tEl = this.$();

    if (type === 'div') {
      container = Ember.$('<div class="md-no-style md-list-item-inner">');
      container.append(tEl.contents());
      tEl.addClass('md-proxy-focus');
    } else {
      container = Ember.$('<md-button class="md-no-style"><div class="md-list-item-inner"></div></md-button>');
      container.click(function () {
        that.sendAction('action', that.get('param'));
      });
      container.children().eq(0).append(tEl.contents());
    }

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
      if (secondaryItem.action || ( this.get("action") && this._isProxiedView(secondaryItem) )) {
        tEl.addClass('md-with-secondary');
        tEl.append(secondaryItemEl);
      }
    }
  }



});
