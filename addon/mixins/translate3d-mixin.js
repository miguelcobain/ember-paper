import Ember from 'ember';

const {
  $,
  Mixin,
  String: { htmlSafe },
  RSVP: { Promise },
  computed,
  on,
  inject: { service },
  run: { scheduleOnce }
} = Ember;

export default Mixin.create({
  constants: service(),

  attributeBindings: ['translateStyle:style'],
  classNameBindings: ['transformIn:md-transition-in'],

  translateFromOrigin: computed(function() {
    return $('body');
  }),

  translateToParent: computed(function() {
    return $('body');
  }),

  translate3dFrom: computed('translateFromOrigin', function() {
    return this.toTransformCss(this.calculateZoomToOrigin(this.$(), this.get('translateFromOrigin')));
  }),

  translate3dTo: computed(function() {
    return this.toTransformCss('');
  }),

  translateStyle: computed('translate3dFrom', 'translate3dTo', 'transformStyleApply', function() {
    if (this.get('transformStyleApply') === 'from') {
      return htmlSafe(this.get('translate3dFrom'));
    } else if (this.get('transformStyleApply') === 'to') {
      return htmlSafe(this.get('translate3dTo'));
    } else {
      return htmlSafe('');
    }
  }),

  didInsertElement() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, () => {
      // Set translate3d style to start at the `from` origin
      this.set('transformStyleApply', 'from');
      // Wait while CSS takes affect
      // Set the `to` styles and run the transition-in styles
      window.requestAnimationFrame(() => {
        this.set('transformStyleApply', 'to');
        this.set('transformIn', true);
      });
    });
  },

  onTranslateDestroy(/*origin*/) {

  },

  /**
   * Specific reversal of the request translate animation above...
   *
   * @protected
   */
  willDestroyElement() {
    this._super(...arguments);

    let clone = this.$().clone();
    this.get('translateToParent').append(clone);
    let origin = this.get('translateFromOrigin');
    let from = this.calculateZoomToOrigin(clone, origin);
    clone.removeClass('md-transition-in').addClass('md-transition-out').attr('style', this.toTransformCss(from));
    this.waitTransitionEnd(clone).then(() => {
      clone.remove();
      this.onTranslateDestroy(origin);
    });
  },

  /**
   * Listen for transitionEnd event (with optional timeout)
   * Announce completion or failure via promise handlers
   *
   * @public
   */
  waitTransitionEnd(element, opts) {
    let _self = this;

    // fallback is 3 secs
    return new Promise(function(resolve/*, reject*/) {
      opts = opts || { };

      element.on(_self.get('constants').get('CSS').TRANSITIONEND, finished);

      // Upon timeout or transitionEnd, reject or resolve (respectively) this promise.
      // NOTE: Make sure this transitionEnd didn't bubble up from a child
      function finished(ev) {
        element.off(_self.get('constants').get('CSS').TRANSITIONEND, finished);

        if (ev) {
          resolve();
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
   *
   * @public
   */
  calculateZoomToOrigin(element, originator) {
    let zoomStyle;
    let origin = originator.get(0);

    if (origin) {
      let originBnds = this.copyRect(originator[0].getBoundingClientRect());
      let dialogRect = this.copyRect(element[0].getBoundingClientRect());
      let dialogCenterPt = this.centerPointFor(dialogRect);
      let originCenterPt = this.centerPointFor(originBnds);

      zoomStyle = {
        centerX: originCenterPt.x - dialogCenterPt.x,
        centerY: originCenterPt.y - dialogCenterPt.y,
        scaleX: Math.min(0.5, originBnds.width / dialogRect.width),
        scaleY: Math.min(0.5, originBnds.height / dialogRect.height)
      };
    } else {
      zoomStyle = { centerX: 0, centerY: 0, scaleX: 0.5, scaleY: 0.5 };
    }
    return `translate3d( ${zoomStyle.centerX}px, ${zoomStyle.centerY}px, 0 ) scale( ${zoomStyle.scaleX}, ${zoomStyle.scaleY} )`;
  },

  /**
   * Convert the translate CSS value to key/value pair(s).
   *
   * @public
   */
  toTransformCss(transform, addTransition) {
    let styles = '';
    this.get('constants').get('CSS').TRANSFORM.split(' ').forEach((key) => {
      styles += `${key}:${transform};`;
    });

    if (addTransition) {
      styles += 'transform: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important;';
    }

    return styles;
  },

  /**
   * Clone the Rect and calculate the height/width if needed
   *
   * @public
   */
  copyRect(source, destination) {
    if (!source) {
      return null;
    }

    destination = destination || {};

    'left top right bottom width height'.split(' ').forEach(function(key) {
      destination[key] = Math.round(source[key]);
    });

    destination.width = destination.width || (destination.right - destination.left);
    destination.height = destination.height || (destination.bottom - destination.top);

    return destination;
  },

  /**
   * Calculate ClientRect of element; return null if hidden or zero size
   *
   * @public
   */
  clientRect(element) {
    let bounds = $(element)[0].getBoundingClientRect();

    // If the event origin element has zero size, it has probably been hidden.
    return bounds && (bounds.width > 0) && (bounds.height > 0) ? this.copyRect(bounds) : null;
  },

  /**
   * Calculate 'rounded' center point of Rect
   *
   * @public
   */
  centerPointFor(targetRect) {
    return {
      x: Math.round(targetRect.left + (targetRect.width / 2)),
      y: Math.round(targetRect.top + (targetRect.height / 2))
    };
  }

});
