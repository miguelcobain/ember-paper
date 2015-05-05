import PaperMenuContainer from './paper-menu-container';
import BaseFocusableMixin from '../mixins/base-focusable';

export default PaperMenuContainer.extend(BaseFocusableMixin, {
  tagName: 'md-menu-selectable',
  classNames: ['paper-menu-selectable'],

  prompt: null,
  selection: null,

  actions: {
    select: function(option) {
      this.set('value', option);
      this.send('toggleMenu');
    }
  }
});
