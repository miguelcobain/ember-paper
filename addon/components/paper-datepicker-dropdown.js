import Ember from 'ember';
import BasicDropdown from 'ember-basic-dropdown/components/basic-dropdown';

const { $ } = Ember;

/**
 * Height of the calendar pane used to check if the pane is going outside the boundary of
 * the viewport. See calendar.scss for how $md-calendar-height is computed; an extra 20px is
 * also added to space the pane away from the exact edge of the screen.
 *
 *  This is computed statically now, but can be changed to be measured if the circumstances
 *  of calendar sizing are changed.
 */
const CALENDAR_PANE_HEIGHT = 368;

/**
 * Width of the calendar pane used to check if the pane is going outside the boundary of
 * the viewport. See calendar.scss for how $md-calendar-width is computed; an extra 20px is
 * also added to space the pane away from the exact edge of the screen.
 *
 *  This is computed statically now, but can be changed to be measured if the circumstances
 *  of calendar sizing are changed.
 */
const CALENDAR_PANE_WIDTH = 360;

export default BasicDropdown.extend({
  calculatePosition(trigger, calendarPane) {
    let $window = $(window);
    let elementRect = $(trigger).find('.md-datepicker-input-container').get(0).getBoundingClientRect();
    let bodyRect = document.body.getBoundingClientRect();

    // Check to see if the calendar pane would go off the screen. If so, adjust position
    // accordingly to keep it within the viewport.
    let paneTop = elementRect.top - bodyRect.top;
    let paneLeft = elementRect.left - bodyRect.left;

    // If ng-material has disabled body scrolling (for example, if a dialog is open),
    // then it's possible that the already-scrolled body has a negative top/left. In this case,
    // we want to treat the "real" top as (0 - bodyRect.top). In a normal scrolling situation,
    // though, the top of the viewport should just be the body's scroll position.
    let viewportTop = (bodyRect.top < 0 && document.body.scrollTop === 0) ?
        -bodyRect.top :
        document.body.scrollTop;

    let viewportLeft = (bodyRect.left < 0 && document.body.scrollLeft === 0) ?
        -bodyRect.left :
        document.body.scrollLeft;

    let viewportBottom = viewportTop + $window.innerHeight;
    let viewportRight = viewportLeft + $window.innerWidth;

    // If the right edge of the pane would be off the screen and shifting it left by the
    // difference would not go past the left edge of the screen. If the calendar pane is too
    // big to fit on the screen at all, move it to the left of the screen and scale the entire
    // element down to fit.
    if (paneLeft + CALENDAR_PANE_WIDTH > viewportRight) {
      if (viewportRight - CALENDAR_PANE_WIDTH > 0) {
        paneLeft = viewportRight - CALENDAR_PANE_WIDTH;
      } else {
        paneLeft = viewportLeft;
        let scale = $window.innerWidth / CALENDAR_PANE_WIDTH;
        calendarPane.style.transform = `scale(${scale})`;
      }

      calendarPane.classList.add('md-datepicker-pos-adjusted');
    }

    // If the bottom edge of the pane would be off the screen and shifting it up by the
    // difference would not go past the top edge of the screen.
    if (paneTop + CALENDAR_PANE_HEIGHT > viewportBottom && viewportBottom - CALENDAR_PANE_HEIGHT > viewportTop) {
      paneTop = viewportBottom - CALENDAR_PANE_HEIGHT;
      calendarPane.classList.add('md-datepicker-pos-adjusted');
    }

    let style = { top: paneTop, left: paneLeft };
    return { style, horizontalPosition: '', verticalPosition: '' };
  }
});
