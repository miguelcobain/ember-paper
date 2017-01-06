import PowerCalendar from 'ember-power-calendar/components/power-calendar';
import layout from '../templates/components/paper-calendar';

export default PowerCalendar.extend({
  layout,

  navComponent: 'paper-calendar-nav',
  daysComponent: 'paper-calendar-days'
});
