import Ember from 'ember';
import ContentComponent from 'ember-basic-dropdown/components/basic-dropdown/content';
import layout from '../templates/components/paper-autocomplete-content';

const { NAME_KEY } = Ember;

const PaperComponent = ContentComponent.extend({
  layout
});

PaperComponent[NAME_KEY] = 'paper-autocomplete-content';

export default PaperComponent;
