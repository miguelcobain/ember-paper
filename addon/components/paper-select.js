import PaperMenuContainer from './paper-menu-container';

export default PaperMenuContainer.extend({
  //TODO change to `md-menu-container` after styles are added
  tagName: 'div',
  classNames: ['paper-select'],

  prompt: null,
  selectedOption: null,

  actions: {
    select: function(option) {
      this.set('selectedOption', option);
      this.send('toggleMenu');
    }
  }
});
