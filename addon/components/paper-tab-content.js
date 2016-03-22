import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'md-tab-content',

  wormhole: computed.readOnly('parent.wormhole'),
  activeState: computed.readOnly('parent.activeState'),
  selected: computed.readOnly('parent.selected'),
  index: computed.readOnly('parent.index'),

  classNameBindings: [
    'activeState:md-active',
    'left:md-left',
    'right:md-right'
  ],

  left: computed('selected', 'index', function() {
    if (this.get('index') < this.get('selected')) {
      return true;
    }
  }),

  right: computed('selected', 'index', function() {
    if (this.get('index') > this.get('selected')) {
      return true;
    }
  }),

  self: computed(function(){
    return Ember.Object.create({
      id: this.elementId
    });
  }),

  didInsertElement() {
    this._super();
    var self = this.get('self');
    var element = this.$();
    var height = element.css('position','relative').outerHeight(true);
    self.set('height', height);
    element.removeAttr('style');

    Ember.run.scheduleOnce('afterRender', this, function() {
      var height = this.$()[0].scrollHeight;
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
