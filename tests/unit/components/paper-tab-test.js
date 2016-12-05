import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

const { Object: EmberObject, A } = Ember;

moduleForComponent('paper-tab', 'Unit | Component | paper tab', {
  unit: true
});

function createParent() {
  return EmberObject.create({
    tabs: A([])
  });
}

test('widthStyle is empty if no offsetWidth', function(assert) {
  assert.equal(this.subject({
    parent: createParent(),
    self: EmberObject.create({ offsetWidth: 0 })
  }).get('widthStyle'), '');
});

test('widthStyie is offsetWidth as css attribute', function(assert) {
  assert.equal(this.subject({
    parent: createParent(),
    self: EmberObject.create({ offsetWidth: 100 })
  }).get('widthStyle'), 'width: 100px');
});

test('styleAttr is htmlSafe of widthStyle', function(assert) {
  assert.equal(this.subject({
    parent: createParent(),
    self: EmberObject.create({ offsetWidth: 100 })
  }).get('styleAttr').toHTML(), 'width: 100px');
});

test('index is the position of self in tabs array', function(assert) {
  const self = EmberObject.create({ id: 42 });

  const subject = this.subject({
    parent: {
      tabs: A([{ id: 1 }, { id: 2 }, self])
    },
    self
  });

  assert.equal(subject.get('index'), 2, 'self is on index 2');
});
