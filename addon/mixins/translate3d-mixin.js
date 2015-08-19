import Ember from 'ember';

/*global Promise*/

export default Ember.Mixin.create({
  constants: Ember.inject.service(),

  attributeBindings: ['translateComputedStyles:style'],
  classNameBindings: ['transformIn:md-transition-in'],


  origin: Ember.computed(function () {
    return Ember.$('body');
  }),


  translate3dFrom: Ember.computed('origin', function () {
    return this.toTransformCss(this.calculateZoomToOrigin(this.$(), this.get('origin')));
  }),

  translate3dTo: Ember.computed(function () {
    return this.toTransformCss("");
  }),

  translateComputedStyles: Ember.computed('translate3dFrom', 'translate3dTo', 'transformStyleApply', function () {
    if (this.get('transformStyleApply') === 'from') {
      return new Ember.Handlebars.SafeString(this.get('translate3dFrom'));
    } else if (this.get('transformStyleApply') === 'to') {
      return new Ember.Handlebars.SafeString(this.get('translate3dTo'));
    } else {
      return new Ember.Handlebars.SafeString('');
    }
  }),


  _translate3dOnInsert: Ember.on('didInsertElement', function () {
    var self = this;


    Ember.run.scheduleOnce('afterRender', this, function() {
      // Set translate3d style to start at the `from` origin
      this.set('transformStyleApply', 'from');
      // Wait while CSS takes affect
      // Set the `to` styles and run the transition-in styles
      window.requestAnimationFrame(function () {
        self.set('transformStyleApply', 'to');
        self.set('transformIn', true);
      });
    });
  }),

  onTranslateDestroy(/*origin*/) {

  },

  /**
   * Specific reversal of the request translate animation above...
   */
  _translate3dOnDestroy: Ember.on('willDestroyElement', function () {
    var _self = this;
    var clone = this.$().clone();
    Ember.$('body').append(clone);
    var origin = this.get('origin');
    var from = this.calculateZoomToOrigin(clone, origin);
    clone.removeClass('md-transition-in').addClass('md-transition-out').attr('style', this.toTransformCss(from));
    this.waitTransitionEnd(clone).then(function () {
      clone.remove();
      _self.onTranslateDestroy(origin);
    });
  }),

  /**
   * Listen for transitionEnd event (with optional timeout)
   * Announce completion or failure via promise handlers
   */
  waitTransitionEnd(element, opts) {
    var TIMEOUT = 3000,
      _self = this; // fallback is 3 secs

    return new Promise(function(resolve/*, reject*/){
      opts = opts || { };

      element.on(_self.get('constants').get('CSS').TRANSITIONEND, finished);

      /**
       * Upon timeout or transitionEnd, reject or resolve (respectively) this promise.
       * NOTE: Make sure this transitionEnd didn't bubble up from a child
       */
      function finished(ev) {
        element.off(_self.get('constants').get('CSS').TRANSITIONEND, finished);

        if ( ev  ) {
          resolve();
        } else {
        }
      }

    });
  },

  /**
   * Calculate the zoom transform from dialog to origin.
   *
   * We use this to set the dialog position immediately;
   * then the md-transition-in actually translates back to
   * `translate3d(0,0,0) scale(1.0)`...
   *
   * NOTE: all values are rounded to the nearest integer
   */
  calculateZoomToOrigin(element, originator) {
    var zoomStyle;
    var origin = originator[0];

    if (origin) {
      var originBnds = this.copyRect(originator[0].getBoundingClientRect());
      var dialogRect = this.copyRect(element[0].getBoundingClientRect());
      var dialogCenterPt = this.centerPointFor(dialogRect);
      var originCenterPt = this.centerPointFor(originBnds);

      zoomStyle = {
        centerX: originCenterPt.x - dialogCenterPt.x,
        centerY: originCenterPt.y - dialogCenterPt.y,
        scaleX: Math.min(0.5, originBnds.width / dialogRect.width),
        scaleY: Math.min(0.5, originBnds.height / dialogRect.height)
      };
    } else {
      zoomStyle = {centerX: 0, centerY: 0, scaleX: 0.5, scaleY: 0.5};
    }
    var style = `translate3d( ${zoomStyle.centerX}px, ${zoomStyle.centerY}px, 0 ) scale( ${zoomStyle.scaleX}, ${zoomStyle.scaleY} )`;
    return style;
  },

  /**
   * Convert the translate CSS value to key/value pair(s).
   */
  toTransformCss(transform, addTransition) {
    var styles = '';
    this.get('constants').get('CSS').TRANSFORM.split(' ').forEach(function (key) {
      styles += key + ': ' + transform + ';';
    });


    if (addTransition) {
      styles += "transform: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important;";
    }
    return styles;
  },

  /**
   *  Clone the Rect and calculate the height/width if needed
   */
  copyRect(source, destination) {
    if (!source) {
      return null;
    }

    destination = destination || {};

    'left top right bottom width height'.split(' ').forEach(function (key) {
      destination[key] = Math.round(source[key]);
    });

    destination.width = destination.width || (destination.right - destination.left);
    destination.height = destination.height || (destination.bottom - destination.top);

    return destination;
  },

  /**
   * Calculate ClientRect of element; return null if hidden or zero size
   */
  clientRect(element) {
    var bounds = Ember.$(element)[0].getBoundingClientRect();
    var isPositiveSizeClientRect = function (rect) {
      return rect && (rect.width > 0) && (rect.height > 0);
    };

    // If the event origin element has zero size, it has probably been hidden.
    return isPositiveSizeClientRect(bounds) ? this.copyRect(bounds) : null;
  },

  /**
   *  Calculate 'rounded' center point of Rect
   */
  centerPointFor(targetRect) {
    return {
      x: Math.round(targetRect.left + (targetRect.width / 2)),
      y: Math.round(targetRect.top + (targetRect.height / 2))
    };
  }

});
