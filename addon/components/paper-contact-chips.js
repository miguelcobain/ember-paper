import Ember from 'ember';
import PaperChips from 'ember-paper/components/paper-chips';
import layout from '../templates/components/paper-contact-chips';

const { NAME_KEY } = Ember;

const PaperComponent = PaperChips.extend({
  layout,
  tagName: 'md-contact-chips',
  classNames: ['md-default-theme'],
  requireMatch: true,
  searchField: 'email',
  emailField: 'email',
  nameField: 'name',
  imageField: 'image'
});

PaperComponent[NAME_KEY] = 'paper-contact-chips';

export default PaperComponent;
