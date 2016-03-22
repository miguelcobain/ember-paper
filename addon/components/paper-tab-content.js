import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'md-tab-content',

  /* Inherited */
  wormhole: computed.readOnly('parent.wormhole'),
  activeState: computed.readOnly('parent.activeState'),
  selected: computed.readOnly('parent.selected'),
  index: computed.readOnly('parent.index'),
  isActive: computed.reads('parent.isActive'),
  isLeft: computed.reads('parent.isLeft'),
  isRight: computed.reads('parent.isRight'),

  classNameBindings: [
    'isActive:md-active',
    'isLeft:md-left',
    'isRight:md-right'
  ],

  self: computed(function() {
    return Ember.Object.create({
      id: this.elementId
    });
  }),

  didInsertElement() {
    this._super();
    let self = this.get('self');
    let element = this.$();
    let height = element.css('position', 'relative').outerHeight(true);
    self.set('height', height);
    element.removeAttr('style');

    Ember.run.scheduleOnce('afterRender', this, function() {
      let height = this.$()[0].scrollHeight;
      this.set('self.height', height);
    });
    this.get('parent').send('identifyTabContent', this.get('self'));
  },

  actions: {
    setcontent(id) {
      this.set('content', id);
    }
  }
});
