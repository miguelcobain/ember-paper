import Component from '@ember/component';
import layout from '../templates/components/paper-calendar';

export default Component.extend({
  layout,
  tagName: '',
  navComponent: 'paper-calendar-nav',
  daysComponent: 'paper-calendar-days',
  yearMode: false
});
