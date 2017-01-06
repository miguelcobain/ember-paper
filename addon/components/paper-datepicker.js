import Ember from 'ember';
import PowerSelect from 'ember-power-select/components/power-select';
import ChildMixin from 'ember-paper/mixins/child-mixin';
import layout from '../templates/components/paper-datepicker';

const { computed } = Ember;

/**
 * @class PaperDatepicker
 * @extends PowerSelectComponent
 */
export default PowerSelect.extend(ChildMixin, {
  layout,

  triggerComponent: 'paper-datepicker-trigger',
  contentComponent: 'paper-datepicker-content',

  onfocus: computed.alias('onFocus'),
  onblur: computed.alias('onBlur'),
  onchange: computed.alias('onChange'),
  oninput: computed.alias('onInput')
});
