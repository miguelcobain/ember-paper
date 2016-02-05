import Ember from 'ember';
const { computed } = Ember;

/**
 * Maximum size, in pixels, that can be explicitly set to an element. The actual value varies
 * between browsers, but IE11 has the very lowest size at a mere 1,533,917px. Ideally we could
 * *compute* this value, but Firefox always reports an element to have a size of zero if it
 * goes over the max, meaning that we'd have to binary search for the value.
 * @const {number}
 */
const MAX_ELEMENT_SIZE = 1533917;

/**
 * Number of additional elements to render above and below the visible area inside
 * of the virtual repeat container. A higher number results in less flicker when scrolling
 * very quickly in Safari, but comes with a higher rendering and dirty-checking cost.
 * @const {number}
 */
const NUM_EXTRA = 3;


export default Ember.Component.extend({
  tagName: 'md-virtual-repeat-container',
  classNames: ['md-virtual-repeat-container'],
  classNameBindings: ['orientHorizontal:md-orient-horizontal:md-orient-vertical'],

  size: 0,
  scrollSize: 0,
  scrollOffset: 0,
  horizontal: computed.readOnly('orientHorizontal'),
  repeater: null,
  autoShrink: false,
  autoShrinkMin: computed((x) => parseInt(x, 10) || 0),
  originalSize: null,
  offsetSize: computed((x) => parseInt(x, 10) || 0),
  oldElementSize: null,
  topIndex: 0,

  didInsertElement() {
    this._super(...arguments);

    this.scroller = this.get('element').getElementsByClassName('md-virtual-repeat-scroller')[0];
    this.sizer = this.scroller.getElementsByClassName('md-virtual-repeat-sizer')[0];
    this.offsetter = this.scroller.getElementsByClassName('md-virtual-repeat-offsetter')[0];

  },
  getDimensionName_() {
    return this.get('horizontal') ? 'width' : 'height';
  },
  sizeScroller_(size) {
    var dimension = this.getDimensionName_();
    var crossDimension = this.get('horizontal') ? 'height' : 'width';

    // Clear any existing dimensions.
    this.sizer.innerHTML = '';

    // If the size falls within the browser's maximum explicit size for a single element, we can
    // set the size and be done. Otherwise, we have to create children that add up the the desired
    // size.
    if (size < MAX_ELEMENT_SIZE) {
      this.sizer.style[dimension] = size + 'px';
    } else {
      this.sizer.style[dimension] = 'auto';
      this.sizer.style[crossDimension] = 'auto';

      // Divide the total size we have to render into N max-size pieces.
      var numChildren = Math.floor(size / MAX_ELEMENT_SIZE);

      // Element template to clone for each max-size piece.
      var sizerChild = document.createElement('div');
      sizerChild.style[dimension] = MAX_ELEMENT_SIZE + 'px';
      sizerChild.style[crossDimension] = '1px';

      for (var i = 0; i < numChildren; i++) {
        this.sizer.appendChild(sizerChild.cloneNode(false));
      }

      // Re-use the element template for the remainder.
      sizerChild.style[dimension] = (size - (numChildren * MAX_ELEMENT_SIZE)) + 'px';
      this.sizer.appendChild(sizerChild);
    }
  },
  setScrollSize (itemsSize) {
    var size = itemsSize + this.offsetSize;
    if (this.scrollSize === size) return;

    this.sizeScroller_(size);
    this.autoShrink_(size);
    this.scrollSize = size;
  },
  autoShrink_(size) {
    if (!this.autoShrink) {
      return;
    }
    var shrinkSize = Math.max(size, this.autoShrinkMin * this.repeater.getItemSize());
    if (shrinkSize !== this.size) {
      if (this.oldElementSize === null) {
        this.oldElementSize = this.$element[0].style[this.getDimensionName_()];
      }

      var currentSize = this.originalSize || this.size;
      if (!currentSize || shrinkSize < currentSize) {
        if (!this.originalSize) {
          this.originalSize = this.size;
        }

        this.setSize_(shrinkSize);
      } else if (this.originalSize !== null) {
        this.unsetSize_();
        this.originalSize = null;
        this.updateSize();
      }

      this.repeater.containerUpdated();
    }
  }


});
