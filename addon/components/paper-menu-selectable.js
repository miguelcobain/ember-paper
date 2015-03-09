import PaperMenuContainer from './paper-menu-container';

export default PaperMenuContainer.extend({
  //TODO change to `md-menu-selectable` after styles are added
  tagName: 'div',
  classNames: ['paper-menu-selectable'],

  prompt: null,
  selection: null,

  actions: {
    select: function(option) {
      this.set('selection', option);
      this.send('toggleMenu');
    }
  }
});
