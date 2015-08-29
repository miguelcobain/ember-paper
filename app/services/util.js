import Ember from 'ember';

/* global jQuery */

var Util = Ember.Service.extend({

  // Disables scroll around the passed element.
  disableScrollAround: function (element) {
    var util = this,
      $document = jQuery(window.document);

    util.disableScrollAround._count = util.disableScrollAround._count || 0;
    ++util.disableScrollAround._count;
    if (util.disableScrollAround._enableScrolling) return util.disableScrollAround._enableScrolling;
    var body = $document[0].body,
      restoreBody = disableBodyScroll(),
      restoreElement = disableElementScroll();

    return util.disableScrollAround._enableScrolling = function () {
      if (!--util.disableScrollAround._count) {
        restoreBody();
        restoreElement();
        delete util.disableScrollAround._enableScrolling;
      }
    };

    // Creates a virtual scrolling mask to absorb touchmove, keyboard, scrollbar clicking, and wheel events
    function disableElementScroll() {
      var zIndex = 50;
      var scrollMask = jQuery(
        '<div class="md-scroll-mask" style="z-index: ' + zIndex + '">' +
        '  <div class="md-scroll-mask-bar"></div>' +
        '</div>');
      body.appendChild(scrollMask[0]);

      scrollMask.on('wheel', preventDefault);
      scrollMask.on('touchmove', preventDefault);
      $document.on('keydown', disableKeyNav);

      return function restoreScroll() {
        scrollMask.off('wheel');
        scrollMask.off('touchmove');
        scrollMask[0].parentNode.removeChild(scrollMask[0]);
        $document.off('keydown', disableKeyNav);
        delete util.disableScrollAround._enableScrolling;
      };

      // Prevent keypresses from elements inside the body
      // used to stop the keypresses that could cause the page to scroll
      // (arrow keys, spacebar, tab, etc).
      function disableKeyNav(e) {
        //-- temporarily removed this logic, will possibly re-add at a later date
        return;
        if (!element[0].contains(e.target)) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      }

      function preventDefault(e) {
        e.preventDefault();
      }
    }

    // Converts the body to a position fixed block and translate it to the proper scroll
    // position
    function disableBodyScroll() {
      var htmlNode = body.parentNode;
      var restoreHtmlStyle = htmlNode.getAttribute('style') || '';
      var restoreBodyStyle = body.getAttribute('style') || '';
      var scrollOffset = body.scrollTop + body.parentElement.scrollTop;
      var clientWidth = body.clientWidth;

      if (body.scrollHeight > body.clientHeight) {
        applyStyles(body, {
          position: 'fixed',
          width: '100%',
          top: -scrollOffset + 'px'
        });

        applyStyles(htmlNode, {
          overflowY: 'scroll'
        });
      }


      if (body.clientWidth < clientWidth) applyStyles(body, {overflow: 'hidden'});

      return function restoreScroll() {
        body.setAttribute('style', restoreBodyStyle);
        htmlNode.setAttribute('style', restoreHtmlStyle);
        body.scrollTop = scrollOffset;
      };
    }

    function applyStyles(el, styles) {
      for (var key in styles) {
        el.style[key] = styles[key];
      }
    }
  },
  enableScrolling: function () {
    var method = this.disableScrollAround._enableScrolling;
    method && method();
  }
});

export default Util;
