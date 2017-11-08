import PaperChips from 'ember-paper/components/paper-chips';
import layout from '../templates/components/paper-contact-chips';

export default PaperChips.extend({
  layout,
  tagName: 'md-contact-chips',
  classNames: ['md-default-theme'],
  requireMatch: true,
  searchField: 'email',
  emailField: 'email',
  nameField: 'name',
  imageField: 'image'
});
