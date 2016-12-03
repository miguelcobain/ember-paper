import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('paper-pagination-wrapper', 'Unit | Component | paper pagination wrapper', {
  unit: true
});

test('hideInkBar is true if parent has noInkBar=true', function(assert) {
  assert.ok(this.subject({
    parent: {
      noInkBar: true,
      tabs: [{}]
    }
  }).get('hideInkBar'));
});

test('hideInkBar is true if tabs is empty', function(assert) {
  assert.ok(this.subject({
    parent: {
      noInkBar: false,
      tabs: []
    }
  }).get('hideInkBar'));
});

test('hideInkBar is false if tabs is not empty', function(assert) {
  assert.notOk(this.subject({
    parent: {
      noInkBar: false,
      tabs: [{}]
    }
  }).get('hideInkBar'));
});

test('inkBarDirection is left if lastSelectedIndex is greater than selected', function(assert) {
  assert.equal(this.subject({
    parent: {
      lastSelectedIndex: 10,
      selected: 9
    }
  }).get('inkBarDirection'), 'left');
});

test('inkBarDirection is right if lastSelectedIndex is lesser than selected', function(assert) {
  assert.equal(this.subject({
    parent: {
      lastSelectedIndex: 8,
      selected: 9
    }
  }).get('inkBarDirection'), 'right');
});

test('inkBarDirection is right if lastSelectedIndex is equal to selected', function(assert) {
  assert.equal(this.subject({
    parent: {
      lastSelectedIndex: 9,
      selected: 9
    }
  }).get('inkBarDirection'), 'right');
});

test('widthStyle is empty if shouldStretchTabs is true', function(assert) {
  assert.equal(this.subject({
    parent: {
      shouldStretchTabs: true,
      pagingWidth: 100
    }
  }).get('widthStyle'), '');
});

test('widthStyle is width:0 if shouldStretchTabs is false and pagingWidth is undefined', function(assert) {
  assert.equal(this.subject({
    parent: {
      shouldStretchTabs: false,
      pagingWidth: undefined
    }
  }).get('widthStyle'), 'width: 0px;');
});

test('widthStyle is pagingWidth if shouldStretchTabs is false and pagingWidth is defined', function(assert) {
  assert.equal(this.subject({
    parent: {
      shouldStretchTabs: false,
      pagingWidth: 120
    }
  }).get('widthStyle'), 'width: 120px;');
});

test('widthStyle reacts to updates', function(assert) {
  const subject = this.subject({
    parent: {
      shouldStretchTabs: false,
      pagingWidth: 120
    }
  });

  assert.equal(subject.get('widthStyle'), 'width: 120px;');

  subject.set('parent.pagingWidth', 100);

  assert.equal(subject.get('widthStyle'), 'width: 100px;');

  subject.set('parent.shouldStretchTabs', true);

  assert.equal(subject.get('widthStyle'), '');
});

test('offsetStyle is empty if shouldCenterTabs is true', function(assert) {
  assert.equal(this.subject({
    parent: {
      shouldCenterTabs: true,
      offsetLeft: 100
    }
  }).get('offsetStyle'), '');
});

test('offsetStyle is translation of offsetLeft if shouldCenterTabs is false', function(assert) {
  assert.equal(this.subject({
    parent: {
      shouldCenterTabs: false,
      offsetLeft: 100
    }
  }).get('offsetStyle'), 'transform: translate3d(-100px, 0px, 0px);');
});

test('offsetStyle reacts to updates', function(assert) {
  const subject = this.subject({
    parent: {
      shouldCenterTabs: false,
      offsetLeft: 120
    }
  });

  assert.equal(subject.get('offsetStyle'), 'transform: translate3d(-120px, 0px, 0px);');

  subject.set('parent.offsetLeft', 100);

  assert.equal(subject.get('offsetStyle'), 'transform: translate3d(-100px, 0px, 0px);');

  subject.set('parent.shouldCenterTabs', true);

  assert.equal(subject.get('offsetStyle'), '');
});

test('styleAttr concat widthStyle and offsetStyle in a safeHtml object', function(assert) {
  assert.equal(this.subject({
    widthStyle: 'width: 10px;',
    offsetStyle: 'transform: translate();'
  }).get('styleAttr').toHTML(), 'width: 10px;transform: translate();');
});

test('inkBarLeftPosition is selectedTab.offsetLeft subtracted by offsetLeft', function(assert) {
  const subject = this.subject({
    parent: {
      selectedTab: { offsetLeft: 100 },
      offsetLeft: 50
    }
  });

  assert.equal(subject.get('inkBarLeftPosition'), 50);

  subject.set('parent.selectedTab.offsetLeft', 200);

  assert.equal(subject.get('inkBarLeftPosition'), 150);
});

test('inkBarRightPosition is paging width - leftPosition - offset', function(assert) {
  const subject = this.subject({
    parent: {
      selectedTab: { offsetLeft: 100, offsetWidth: 50 },
      offsetLeft: 50,
      pagingWidth: 500
    }
  });

  assert.equal(subject.get('inkBarRightPosition'), 400);

  subject.set('parent.selectedTab.offsetWidth', 200);

  assert.equal(subject.get('inkBarLeftPosition'), 50);
});

