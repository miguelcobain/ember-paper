import Ember from 'ember';
const { run } = Ember;

const ITEM_HEIGHT   = 41;
const MAX_HEIGHT    = 5.5 * ITEM_HEIGHT;
const MENU_PADDING  = 8;
const INPUT_PADDING = 2;


export default Ember.Component.extend({
  util: Ember.inject.service(),

  tagName: 'ul',
  classNames: ['md-autocomplete-suggestions'],
  attributeNameBindings: ['role'],
  role: 'presentation',
  stickToElement: null,

  init() {
    this._super(...arguments);
    this._resizeWindowEvent = Ember.run.bind(this, this.resizeWindowEvent);
  },

  mouseEnter() {
    this.sendAction('mouse-enter');
  },

  mouseLeave() {
    this.sendAction('mouse-leave');
  },

  mouseUp() {
    this.sendAction('mouse-up');
  },

  getSnapTarget() {
    return Ember.$(`#${this.get('wrapToElementId')}`)[0];
  },

  positionDropdown() {

    let hrect  = this.elements.wrap.getBoundingClientRect(),
      vrect  = this.elements.snap.getBoundingClientRect(),
      root   = this.elements._root.getBoundingClientRect(),
      top    = vrect.bottom - root.top,
      bot    = root.bottom - vrect.top,
      left   = hrect.left - root.left,
      width  = hrect.width,
      offset = getVerticalOffset.call(this),
      styles;
    // Adjust the width to account for the padding provided by `md-input-container`
    if (this.get('floating')) {
      left += INPUT_PADDING;
      width -= INPUT_PADDING * 2;
    }
    styles = {
      left:     left + 'px',
      minWidth: width + 'px',
      maxWidth: Math.max(hrect.right - root.left, root.right - hrect.left) - MENU_PADDING + 'px'
    };
    if (top > bot && root.height - hrect.bottom - MENU_PADDING < MAX_HEIGHT) {
      styles.top       = 'auto';
      styles.bottom    = bot + 'px';
      styles.maxHeight = Math.min(MAX_HEIGHT, hrect.top - root.top - MENU_PADDING) + 'px';
    } else {
      styles.top       = (top - offset) + 'px';
      styles.bottom    = 'auto';
      styles.maxHeight = Math.min(MAX_HEIGHT, root.bottom + this.get('util').scrollTop() - hrect.bottom - MENU_PADDING) + 'px';
    }

    this.elements._scrollContainer.css(styles);
    this.get('util').nextTick(run.bind(this, correctHorizontalAlignment));

    /**
     * Calculates the vertical offset for floating label examples to account for ngMessages
     * @returns {number}
     */
    function getVerticalOffset () {
      var offset = 0;
      var inputContainer = this.elements._main.find('md-input-container');
      if (inputContainer.length) {
        var input = inputContainer.find('input');
        offset = inputContainer.prop('offsetHeight');
        offset -= input.prop('offsetTop');
        offset -= input.prop('offsetHeight');
        // add in the height left up top for the floating label text
        offset += inputContainer.prop('offsetTop');
      }
      return offset;
    }

    /**
     * Makes sure that the menu doesn't go off of the screen on either side.
     */
    function correctHorizontalAlignment () {
      var dropdown = this.elements.scrollContainer.getBoundingClientRect(),
        styles   = {};
      if (dropdown.right > root.right - MENU_PADDING) {
        styles.left = (hrect.right - dropdown.width) + 'px';
      }
      this.elements._scrollContainer.css(styles);
    }
  },

  observeIndex: Ember.observer('selectedIndex', function() {
    var suggestions = this.get('suggestions');
    if (!suggestions || !suggestions.objectAt(this.get('selectedIndex'))) {
      return;
    }

    var ul = this.$(),
      li  = ul.find('li:eq('+this.get('selectedIndex')+')')[0],
      top = li.offsetTop,
      bot = top + li.offsetHeight,
      hgt = ul[0].clientHeight;
    if (top < ul[0].scrollTop) {
      ul[0].scrollTop = top;
    } else if (bot > ul[0].scrollTop + hgt) {
      ul[0].scrollTop = bot - hgt;
    }
  }),

  resizeWindowEvent() {
    this.positionDropdown();
  },



  didInsertElement() {
    this._super(...arguments);


    let _main = Ember.$(`#${this.get('wrapperElementId')}`),
      main = _main[0],
      snap = this.getSnapTarget(),
      _scrollContainer = _main.find('md-virtual-repeat-container'),
      scrollContainer = _scrollContainer[0],
      scroller = _main.find('.md-virtual-repeat-scroller')[0],
      ul = this.get('element'),
      input = _main.find('input')[0],
      wrap = Ember.$(`#${this.get('wrapToElementId')}`)[0],
      _root = document.body;

    this.elements = {
      _main: _main,
      main: main,
      snap: snap,
      _scrollContainer: _scrollContainer,
      scrollContainer: scrollContainer,
      scroller: scroller,
      ul: ul,
      input: input,
      wrap: wrap,
      _root: _root
    };

    var elBody = _scrollContainer.detach();
    Ember.$('body').append(elBody);

    Ember.$(window).on('resize', this._resizeWindowEvent);
    this.get('util').disableScrollAround(this.$());
    this.positionDropdown();
  },

  willDestroyElement() {
    Ember.$(window).off('resize', this._resizeWindowEvent);
    this.get('util').enableScrolling();
  }

});
