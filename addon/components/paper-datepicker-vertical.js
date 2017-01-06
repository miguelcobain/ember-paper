import Ember from 'ember';
import layout from '../templates/components/paper-datepicker-vertical';

const { Component } = Ember;

export default Component.extend({
  layout,

  classNames: ['paper-datepicker', 'md-whiteframe-z1'],
  isYearView: false
});
