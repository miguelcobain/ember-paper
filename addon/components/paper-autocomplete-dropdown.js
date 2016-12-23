import Ember from 'ember';
import BasicDropdown from 'ember-basic-dropdown/components/basic-dropdown';

const { $ } = Ember;

export default BasicDropdown.extend({
  triggerComponent: 'paper-autocomplete-trigger-container',

  reposition() {
    if (!this.get('publicAPI.isOpen')) {
      return;
    }
    let dropdownElement = $(`.${this.dropdownId}`).get(0);
    let triggerElement = document.getElementById(this.triggerId);
    if (!dropdownElement || !triggerElement) {
      return;
    }

    let calculatePosition = this.get(this.get('renderInPlace') ? 'calculateInPlacePosition' : 'calculatePosition');
    let options = this.getProperties('horizontalPosition', 'verticalPosition', 'matchTriggerWidth', 'previousHorizontalPosition', 'previousVerticalPosition');
    options.dropdown = this;
    let positionData = calculatePosition(triggerElement, dropdownElement, options);
    return this.applyReposition(triggerElement, dropdownElement, positionData);
  },

  // EBD passes `dropdown` as options
  // that var is `this` component itself
  calculatePosition(trigger, dropdownEl, { horizontalPosition, verticalPosition, matchTriggerWidth, dropdown }) {
    let $window = $(window);
    let scroll = { left: $window.scrollLeft(), top: $window.scrollTop() };
    let { left: triggerLeft, top: triggerTop, width: triggerWidth, height: triggerHeight } = trigger.getBoundingClientRect();
    let { height: dropdownHeight, width: dropdownWidth } = dropdownEl.getBoundingClientRect();
    let dropdownLeft = triggerLeft;
    let dropdownTop;
    dropdownWidth = matchTriggerWidth ? triggerWidth : dropdownWidth;

    if (horizontalPosition === 'auto') {
      let viewportRight = scroll.left + window.innerWidth;
      let roomForRight = viewportRight - triggerLeft;
      let roomForLeft = triggerLeft;
      horizontalPosition = roomForRight > roomForLeft ? 'left' : 'right';
    } else if (horizontalPosition === 'right') {
      dropdownLeft = triggerLeft + triggerWidth - dropdownWidth;
    } else if (horizontalPosition === 'center') {
      dropdownLeft = triggerLeft + (triggerWidth - dropdownWidth) / 2;
    }

    let triggerTopWithScroll = triggerTop + scroll.top;
    if (verticalPosition === 'above') {
      dropdownTop = triggerTopWithScroll - dropdownHeight;
    } else if (verticalPosition === 'below') {
      dropdownTop = triggerTopWithScroll + triggerHeight;
    } else {
      let viewportBottom = scroll.top + window.innerHeight;
      let enoughRoomBelow = triggerTopWithScroll + triggerHeight + dropdownHeight < viewportBottom;
      let enoughRoomAbove = triggerTop > dropdownHeight;

      if (dropdown.previousVerticalPosition === 'below' && !enoughRoomBelow && enoughRoomAbove) {
        verticalPosition = 'above';
      } else if (dropdown.previousVerticalPosition === 'above' && !enoughRoomAbove && enoughRoomBelow) {
        verticalPosition = 'below';
      } else if (!dropdown.previousVerticalPosition) {
        verticalPosition = enoughRoomBelow ? 'below' : 'above';
      } else {
        verticalPosition = dropdown.previousVerticalPosition;
      }

      dropdownTop = triggerTopWithScroll + (verticalPosition === 'below' ? triggerHeight : -dropdownHeight) - (verticalPosition === 'below' ? getVerticalOffset() : 0);
    }
    function getVerticalOffset() {
      let offset = 0;
      let inputContainer = $(trigger).find('md-input-container');
      if (inputContainer.length) {
        let input = inputContainer.find('input');
        offset = inputContainer.prop('offsetHeight');
        offset -= input.prop('offsetTop');
        offset -= input.prop('offsetHeight');
        // add in the height left up top for the floating label text
        offset += inputContainer.prop('offsetTop');
      }
      return offset;
    }
    let style = { top: dropdownTop, left: dropdownLeft };
    if (matchTriggerWidth) {
      style.width = dropdownWidth;
    }

    return { style, horizontalPosition: '', verticalPosition: '' };
  }

});
