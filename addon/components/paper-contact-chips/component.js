import PaperChips from 'ember-paper/components/paper-chips/component';
import layout from './template';

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
