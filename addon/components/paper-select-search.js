import Ember from 'ember';
import PowerBeforeOptions from 'ember-power-select/components/power-select/before-options';
import layout from '../templates/components/paper-select-search';

const { NAME_KEY } = Ember;

const PaperComponent = PowerBeforeOptions.extend({
  layout
});

PaperComponent[NAME_KEY] = 'paper-select-search';

export default PaperComponent;
