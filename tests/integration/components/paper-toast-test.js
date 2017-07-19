import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

moduleForComponent('paper-toast', 'Integration | Component | paper toast', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{paper-toast}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#paper-toast}}
      Toast was shown successfully!
    {{/paper-toast}}
  `);

  assert.equal($('md-toast').text().trim(), 'Toast was shown successfully!');
});

test('duration triggers onClose', function(assert) {
  let done = assert.async();

  this.set('closeAction', () => {
    assert.ok(true);
    done();
  });

  this.render(hbs`
    {{#paper-toast duration=100 onClose=closeAction}}
      Toast was shown successfully!
    {{/paper-toast}}
  `);
});

test('duration set to `false` does not trigger onClose', function(assert) {
  assert.expect(0);

  this.set('closeAction', () => {
    assert.ok(false);
  });

  this.render(hbs`
    {{#paper-toast duration=false onClose=closeAction}}
      Toast was shown successfully!
    {{/paper-toast}}
  `);
});

test('should render in ember-testing if no parent is defined', function(assert) {
  this.render(hbs`
    {{paper-toast}}
  `);

  assert.ok($().find('#ember-testing md-toast'), 'rendered in default');
});

test('should render in specific wormhole if parent is defined', function(assert) {
  this.render(hbs`
    <div id="sagittarius-a"></div>
    {{#paper-toast parent="#sagittarius-a"}}
      So this is singularity, eh?
    {{/paper-toast}}
  `);
  assert.ok(!$('#ember-testing > md-toast').length, 'did not render in default');
  assert.ok($('#sagittarius-a md-toast').length, 'rendered in parent');
});

test('capsule sets the correct class', function(assert) {
  this.render(hbs`
    {{paper-toast capsule=true}}
  `);

  let toast = $('md-toast');

  assert.ok(toast.hasClass('md-capsule'), 'rendered in default');
});

['bottom left', 'bottom right', 'top left', 'top right'].forEach((position) => {
  let [y, x] = position.split(' ');

  test(`position '${position}' sets the correct classes`, function(assert) {
    this.position = position;

    this.render(hbs`
      {{paper-toast position=position}}
    `);

    assert.ok($('#ember-testing > md-toast').hasClass(`md-${x}`));
    assert.ok($('#ember-testing > md-toast').hasClass(`md-${y}`));
    assert.ok($('#ember-testing').hasClass(`md-toast-open-${y}`));
  });
});
