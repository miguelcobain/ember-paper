import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-divider', 'Integration | Component | paper divider', {
  integration: true
});

test('has required classes by default', function(assert) {
  assert.expect(2);
  this.render(hbs`
    {{#paper-divider}}
    {{/paper-divider}}
  `);

  assert.ok(this.$('md-divider').hasClass('paper-divider'));
  assert.ok(this.$('md-divider').hasClass('md-default-theme'));
});

test('uses md-inset attribute when passed inset=true', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#paper-divider inset=true}}
    {{/paper-divider}}
  `);

  assert.ok(this.$('md-divider').attr('md-inset'));
});

test('no md-inset attribute when passed inset=false', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#paper-divider inset=false}}
    {{/paper-divider}}
  `);

  assert.notOk(this.$('md-divider').attr('md-inset'));
});

test('md-inset attribute is not present when inset is not passed', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#paper-divider}}
    {{/paper-divider}}
  `);
  // Attribute should NOT be present in md-divider
  assert.notOk(this.$('md-divider').attr('md-inset'));
});
