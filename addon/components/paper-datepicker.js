import Ember from 'ember';
import ChildMixin from 'ember-paper/mixins/child-mixin';
import layout from '../templates/components/paper-datepicker';

const { Component } = Ember;

/**
 * @class PaperDatepicker
 * @extends Ember.Component
 */
export default Component.extend(ChildMixin, {
  layout,
  tagName: '',

  /**
   * Set if the datepicker should automatically close after a date is selected.
   *
   * @property closeOnSelect
   * @type boolean
   * @public
   */
  closeAfterSelect: true,

  triggerComponent: 'paper-datepicker-trigger',
  contentComponent: 'paper-datepicker-content',

  actions: {
    registerAPI(publicAPI) {
      this.set('publicAPI', publicAPI);
    },

    onDateSelected(moment, event) {
      this.sendAction('onSelect', moment);

      if (this.get('closeAfterSelect')) {
        this.get('publicAPI.actions').close(event);
      }
    }
  }
});
