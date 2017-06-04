import Ember from 'ember';
const { computed, Component } = Ember;

export default Component.extend({
  tagName: '',

  wormhole: computed.readOnly('parent.wormhole'),
  isActive: computed.reads('parent.isActive'),
  isLeft: computed.reads('parent.isLeft'),
  isRight: computed.reads('parent.isRight'),
  selected: computed.readOnly('parent.selected'),
  index: computed.readOnly('parent.index'),

  actions: {
    setContent(id) {
      this.get('parent').send('setContent', id);
    },
    setHeight(value) {
      this.get('parent').send('setHeight', value);
    },
    identifyTabContent(object) {
      this.get('parent').send('identifyTabContent', object);
    }
  }
});
