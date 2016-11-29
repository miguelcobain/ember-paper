import PaperChips from 'ember-paper/components/paper-chips';

export default PaperChips.extend({
  tagName: 'md-contact-chips',
  classNames: ['md-default-theme'],
  requireMatch: true,
  searchField: 'email',
  emailField: 'email',
  nameField: 'name',
  imageField: 'image'
});
