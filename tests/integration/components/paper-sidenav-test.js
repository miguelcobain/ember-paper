import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

let originalMatchMedia;

moduleForComponent('paper-sidenav', 'Integration | Component | paper sidenav', {
  integration: true,
  beforeEach() {
    originalMatchMedia = window.matchMedia;
  },
  afterEach() {
    window.matchMedia = originalMatchMedia;
  }
});

test('renders a container with flex and layout-row classes', function(assert) {
  assert.expect(2);

  this.render(hbs`{{paper-sidenav-container class="sidenav-container"}}`);

  assert.ok(this.$('.sidenav-container').hasClass('flex'));
  assert.ok(this.$('.sidenav-container').hasClass('layout-row'));
});

test('sidenav uses md-sidenav-left by default', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-sidenav}}`);

  assert.ok(this.$('md-sidenav').hasClass('md-sidenav-left'));
});

test('sidenav uses md-sidenav-right with position="right"', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-sidenav position="right"}}`);

  assert.ok(this.$('md-sidenav').hasClass('md-sidenav-right'));
});

test('sidenav starts open when `open=true`', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-sidenav open=true lockedOpen=false}}`);

  assert.notOk(this.$('md-sidenav').hasClass('md-closed'));
});

test('sidenav starts closed when `open=true`', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-sidenav open=false lockedOpen=false}}`);

  assert.ok(this.$('md-sidenav').hasClass('md-closed'));
});

test('should trigger an action when clicking on backdrop', function(assert) {
  assert.expect(1);

  this.set('sidenavToggle', (value) => {
    assert.notOk(value);
  });

  this.render(hbs`
    {{#paper-sidenav open=true onToggle=(action sidenavToggle) lockedOpen=false}}
      Hi!
    {{/paper-sidenav}}
  `);

  this.$('md-backdrop').click();
});

test('sidenav opens when `open` is changed to `true`', function(assert) {
  assert.expect(2);

  this.set('isOpen', false);

  this.render(hbs`{{paper-sidenav open=isOpen lockedOpen=false}}`);

  assert.ok(this.$('md-sidenav').hasClass('md-closed'));

  this.set('isOpen', true);

  return wait().then(() => {
    assert.notOk(this.$('md-sidenav').hasClass('md-closed'));
  });
});

test('sidenav closes when `open` is changed to `false`', function(assert) {
  assert.expect(2);

  this.set('isOpen', true);

  this.render(hbs`{{paper-sidenav open=isOpen lockedOpen=false}}`);

  assert.notOk(this.$('md-sidenav').hasClass('md-closed'));

  this.set('isOpen', false);

  return wait().then(() => {
    assert.ok(this.$('md-sidenav').hasClass('md-closed'));
  });
});

test('should trigger an action when clicking inside sidenav with `closeOnClick=true` (default)', function(assert) {
  assert.expect(1);

  this.set('sidenavToggle', (value) => {
    assert.notOk(value);
  });

  this.render(hbs`
    {{#paper-sidenav open=true onToggle=(action sidenavToggle) lockedOpen=false}}
      Hi!
    {{/paper-sidenav}}
  `);

  this.$('md-sidenav').click();
});

test('should trigger an action when clicking inside sidenav with `closeOnClick=true` (default)', function(assert) {
  assert.expect(0);

  this.set('sidenavToggle', (value) => {
    assert.notOk(value);
  });

  this.render(hbs`
    {{#paper-sidenav open=true onToggle=(action sidenavToggle) closeOnClick=false lockedOpen=false}}
      Hi!
    {{/paper-sidenav}}
  `);

  this.$('md-sidenav').click();
});

test('sidenav "locks open" when specified matchMedia test passes', function(assert) {
  assert.expect(1);

  window.matchMedia = function() {
    return { matches: true };
  };

  this.render(hbs`{{paper-sidenav}}`);

  assert.ok(this.$('md-sidenav').hasClass('md-locked-open'));
});

test('sidenav does not "lock open" when specified matchMedia test does not pass', function(assert) {
  assert.expect(1);

  window.matchMedia = function() {
    return { matches: false };
  };

  this.render(hbs`{{paper-sidenav}}`);

  assert.notOk(this.$('md-sidenav').hasClass('md-locked-open'));
});

test('sidenav "locks open" if a resize happens and the test passes', function(assert) {
  assert.expect(2);

  window.matchMedia = function() {
    return { matches: false };
  };

  this.render(hbs`{{paper-sidenav}}`);

  assert.notOk(this.$('md-sidenav').hasClass('md-locked-open'));

  window.matchMedia = function() {
    return { matches: true };
  };
  window.dispatchEvent(new window.Event('resize'));

  assert.ok(this.$('md-sidenav').hasClass('md-locked-open'));
});

test('sidenav ceases to "lock open" if a resize happens and the test does not pass', function(assert) {
  assert.expect(2);

  window.matchMedia = function() {
    return { matches: true };
  };

  this.render(hbs`{{paper-sidenav}}`);

  assert.ok(this.$('md-sidenav').hasClass('md-locked-open'));

  window.matchMedia = function() {
    return { matches: false };
  };
  window.dispatchEvent(new window.Event('resize'));

  return wait().then(() => {
    assert.notOk(this.$('md-sidenav').hasClass('md-locked-open'));
  });
});

test('should trigger an action when clicking sidenav-toggle ("default" name)', function(assert) {
  assert.expect(1);

  this.set('sidenavToggle', (value) => {
    assert.notOk(value);
  });

  this.render(hbs`
    {{#paper-sidenav open=true onToggle=(action sidenavToggle) lockedOpen=false}}
      Hi!
    {{/paper-sidenav}}
    {{#paper-sidenav-toggle as |toggleAction|}}
      {{#paper-button id="toggle-button" onClick=(action toggleAction)}}
        Toggle sidenav
      {{/paper-button}}
    {{/paper-sidenav-toggle}}
  `);

  this.$('#toggle-button').click();
});

test('should trigger an action when clicking sidenav-toggle (custom name)', function(assert) {
  assert.expect(1);

  this.set('sidenavToggle', (value) => {
    assert.notOk(value);
  });

  this.render(hbs`
    {{#paper-sidenav name="balele" open=true onToggle=(action sidenavToggle) lockedOpen=false}}
      Hi!
    {{/paper-sidenav}}
    {{#paper-sidenav name="balili" open=true onToggle=(action sidenavToggle) lockedOpen=false}}
      Hi!
    {{/paper-sidenav}}
    {{#paper-sidenav-toggle name="balele" as |toggleAction|}}
      {{#paper-button id="toggle-button" onClick=(action toggleAction)}}
        Toggle sidenav
      {{/paper-button}}
    {{/paper-sidenav-toggle}}
  `);

  this.$('#toggle-button').click();
});

test('should trigger an action on all named sidenavs when clicking sidenav-toggle', function(assert) {
  assert.expect(2);

  this.set('sidenavToggle', (value) => {
    assert.notOk(value);
  });

  this.render(hbs`
    {{#paper-sidenav name="balele" open=true onToggle=(action sidenavToggle) lockedOpen=false}}
      Hi!
    {{/paper-sidenav}}
    {{#paper-sidenav name="balele" open=true onToggle=(action sidenavToggle) lockedOpen=false}}
      Hi!
    {{/paper-sidenav}}
    {{#paper-sidenav-toggle name="balele" as |toggleAction|}}
      {{#paper-button id="toggle-button" onClick=(action toggleAction)}}
        Toggle sidenav
      {{/paper-button}}
    {{/paper-sidenav-toggle}}
  `);

  this.$('#toggle-button').click();
});

/* test('clicking sidenav-toggle for unregistered sidenav should throw', function(assert) {
  assert.expect(1);

  this.set('sidenavToggle', (value) => {
    assert.notOk(value);
  });

  this.render(hbs`
    {{#paper-sidenav name="balele" open=true onToggle=(action sidenavToggle) lockedOpen=false}}
      Hi!
    {{/paper-sidenav}}
    {{#paper-sidenav-toggle name="çup" as |toggleAction|}}
      {{#paper-button id="toggle-button" onClick=(action toggleAction)}}
        Toggle sidenav
      {{/paper-button}}
    {{/paper-sidenav-toggle}}
  `);

  assert.throws(() => {
    this.$('#toggle-button').click();
  }, /You tried to toggle a sidenav named 'çup' but no such sidenav is registered/);
});*/