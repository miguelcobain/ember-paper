import Ember from 'ember';
import PaperDialogInner from './paper-dialog-inner';

export default Ember.Component.extend({
  tagName: 'md-dialog-content',


  dialogInnerComponent: Ember.computed(function () {
    return this.nearestOfType(PaperDialogInner);
  }),
  imagesLoaded () {
    var content = this.get('element');
    this.get('dialogInnerComponent').set('contentOverflow', content.scrollHeight > content.clientHeight);
  },

  didInsertElement () {

    // content overflow might change depending on load of images inside dialog.
    var images = this.$().find('img');
    images.load(this.imagesLoaded.bind(this));

  }
});
