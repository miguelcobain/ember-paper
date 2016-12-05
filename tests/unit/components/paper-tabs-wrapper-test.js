import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('paper-tabs-wrapper', 'Unit | Component | paper tabs wrapper', {
  unit: true
});

test('canvasClass is empty if parent.shouldPaginate is false', function(assert) {
  assert.equal(this.subject({
    parent: {
      shouldPaginate: false
    }
  }).get('canvasClass'), '');
});

test('canvasClass is md-paginated if parent.shouldPaginate is true', function(assert) {
  assert.equal(this.subject({
    parent: {
      shouldPaginate: true
    }
  }).get('canvasClass'), 'md-paginated');
});

test('if forward nextPage action to the parent', function(assert) {
  assert.expect(1);

  this.subject({
    parent: {
      send: (name) => assert.equal(name, 'nextPage', 'nextPage called on parent')
    }
  }).send('nextPage');
});

test('it forward previousPage action to the parent', function(assert) {
  assert.expect(1);

  this.subject({
    parent: {
      send: (name) => assert.equal(name, 'previousPage', 'previousPage called on parent')
    }
  }).send('previousPage');
});

