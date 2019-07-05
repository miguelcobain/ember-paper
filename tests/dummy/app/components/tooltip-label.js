import Component from '@ember/component';
import layout from '../templates/components/tooltip-label';

export default Component.extend({
  layout,
  label: null,
  tooltip: null,
  icon: 'info'
});
