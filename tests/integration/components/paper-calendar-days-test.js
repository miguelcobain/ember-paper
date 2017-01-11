import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import run from 'ember-runloop';
import getOwner from 'ember-owner/get';

let calendarService, momentService, calendar;
moduleForComponent('paper-calendar-days', 'Integration | Component | paper calendar days', {
  integration: true,
  beforeEach() {
    calendarService = getOwner(this).lookup('service:power-calendar-clock');
    calendarService.set('date', new Date(2013, 9, 18));
    momentService = getOwner(this).lookup('service:moment');
    calendar = {
      center: moment(calendarService.getDate()),
      locale: 'en',
      actions: {
        moveCenter: () => {},
        select: () => {}
      }
    };
  },

  afterEach() {
    run(() => momentService.changeLocale('en-US'));
  }
});

test('weekdays contain only one letter', function(assert) {
  this.render(hbs`{{#paper-calendar as |cal|}}{{cal.days}}{{/paper-calendar}}`);
  assert.equal(this.$('.ember-power-calendar-weekdays').text().replace(/\s+/g, ' ').trim(), 'S M T W T F S');
});
