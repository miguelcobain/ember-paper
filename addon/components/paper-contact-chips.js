import Ember from 'ember';
import PaperChips from 'ember-paper/components/paper-chips';

let { isEmpty, isPresent } = Ember;

export default PaperChips.extend({
  tagName: 'md-contact-chips',
  classNames: ['md-default-theme']
});
