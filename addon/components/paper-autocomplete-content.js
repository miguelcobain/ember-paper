import ContentComponent from 'ember-basic-dropdown/components/basic-dropdown/content';
import layout from '../templates/components/paper-autocomplete-content';
import { computed } from '@ember/object';

export default ContentComponent.extend({
  layout,

  // returns `destinationElement` for ember-basic-dropdown >= 1.0.0
  // finds destination by `to` for ember-basic-dropdown < 1.0.0
  destinationEl: computed('destinationElement', 'to', function() {
    return this.get('destinationElement') || document.getElementById(this.get('to'));
  })
});
