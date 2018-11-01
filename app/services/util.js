import Service from '@ember/service';

let Util = Service.extend({

  // Disables scroll around the passed element.
  disableScrollAround() {
    let util = this;

    util.disableScrollAround._count = util.disableScrollAround._count || 0;
    ++util.disableScrollAround._count;
    if (util.disableScrollAround._enableScrolling) {
      return util.disableScrollAround._enableScrolling;
    }

    let { body } = document;
    let restoreBody = disableBodyScroll();
    let restoreElement = disableElementScroll();

    return util.disableScrollAround._enableScrolling = function() {
      if (!--util.disableScrollAround._count) {
        restoreBody();
        restoreElement();
        delete util.disableScrollAround._enableScrolling;
      }
    };

    // Creates a virtual scrolling mask to absorb touchmove, keyboard, scrollbar clicking, and wheel events
    function disableElementScroll() {
      let zIndex = 50;
      
      let scrollMask = document.createElement('div');
      scrollMask.classList.add('md-scroll-mask');

      applyStyles(body, {
        'z-index': zIndex
      });
      
      let scrollMaskBar = document.createElement('div');
      scrollMaskBar.classList.add('md-scroll-mask-bar');
      scrollMask.appendChild(scrollMaskBar);
      
      body.appendChild(scrollMask);

      scrollMask.addEventListener('wheel', this._preventDefault);
      scrollMask.addEventListener('touchmove', this._preventDefault);
      document.addEventListener('keydown', this._disableKeyNav);

      
      // Prevent keypresses from elements inside the body
      // used to stop the keypresses that could cause the page to scroll
      // (arrow keys, spacebar, tab, etc).
      this._disableKeyNav = function disableKeyNav() {
        // -- temporarily removed this logic, will possibly re-add at a later date
        return;
        /* if (!element[0].contains(e.target)) {
          e.preventDefault();
          e.stopImmediatePropagation();
        } */
      }

      this._preventDefault = function preventDefault(e) {
        e.preventDefault();
      }

      return function restoreScroll() {
        scrollMask.removeEventListener('wheel', this._preventDefault);
        scrollMask.removeEventListener('touchmove', this._preventDefault);

        scrollMask[0].parentNode.removeChild(scrollMask[0]);

        document.removeEventListener('keydown', this._disableKeyNav);
        
        delete util.disableScrollAround._enableScrolling;
      };

     
    }

    // Converts the body to a position fixed block and translate it to the proper scroll
    // position
    function disableBodyScroll() {
      let htmlNode = body.parentNode;
      let restoreHtmlStyle = htmlNode.getAttribute('style') || '';
      let restoreBodyStyle = body.getAttribute('style') || '';
      let scrollOffset = body.scrollTop + body.parentElement.scrollTop;
      let { clientWidth } = body;

      if (body.scrollHeight > body.clientHeight) {
        applyStyles(body, {
          position: 'fixed',
          width: '100%',
          top: `${-scrollOffset}px`
        });

        applyStyles(htmlNode, {
          overflowY: 'scroll'
        });
      }

      if (body.clientWidth < clientWidth) {
        applyStyles(body, { overflow: 'hidden' });
      }

      return function restoreScroll() {
        body.setAttribute('style', restoreBodyStyle);
        htmlNode.setAttribute('style', restoreHtmlStyle);
        body.scrollTop = scrollOffset;
      };
    }

    function applyStyles(el, styles) {
      for (let key in styles) {
        el.style[key] = styles[key];
      }
    }
  },
  enableScrolling() {
    let method = this.disableScrollAround._enableScrolling;
    method && method();
  },

  /*
   * supplant() method from Crockford's `Remedial Javascript`
   * Equivalent to use of $interpolate; without dependency on
   * interpolation symbols and scope. Note: the '{<token>}' can
   * be property names, property chains, or array indices.
   */
  supplant(template, values, pattern) {
    pattern = pattern || /\{([^{}]*)\}/g;
    return template.replace(pattern, function(a, b) {
      let p = b.split('.');
      let r = values;
      try {
        for (let s in p) {
          if (p.hasOwnProperty(s)) {
            r = r[p[s]];
          }
        }
      } catch(e) {
        r = a;
      }
      return (typeof r === 'string' || typeof r === 'number') ? r : a;
    });
  },
  nextTick: (function(window, prefixes, i, p, fnc) {
    while (!fnc && i < prefixes.length) {
      fnc = window[`${prefixes[i++]}equestAnimationFrame`];
    }
    return (fnc && fnc.bind(window)) || window.setImmediate || function(fnc) {
      window.setTimeout(fnc, 0);
    };
  })(window, 'r webkitR mozR msR oR'.split(' '), 0)

});

export default Util;
