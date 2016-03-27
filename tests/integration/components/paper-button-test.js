import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-button', 'Integration | Component | paper button', {
  integration: true
});

test('renders block label within span by default', function(assert) {
  this.render(hbs`
    {{#paper-button}}
      Block label
    {{/paper-button}}
  `);
  assert.equal(this.$('span').text().trim(), 'Block label');
});

test('renders inline label within span by default', function(assert) {
  this.render(hbs`
    {{paper-button label='Inline label'}}
  `);
  assert.equal(this.$('span').text().trim(), 'Inline label');
});

test('triggers onClick function when attribute is present', function(assert) {
  assert.expect(1);

  this.set('foo', () => {
    assert.ok(true);
  });
  this.render(hbs`
    {{#paper-button onClick=foo}}
      A label
    {{/paper-button}}
  `);
  this.$('.md-button').click();
});

test('does nothing onClick if attribute is not present', function(assert) {
  assert.expect(0);

  this.render(hbs`
    {{#paper-button}}
      A label
    {{/paper-button}}
  `);
  this.$('.md-button').click();
});
