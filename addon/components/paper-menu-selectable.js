import PaperMenuContainer from './paper-menu-container';

export default PaperMenuContainer.extend({
  tagName: 'md-menu-selectable',
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
