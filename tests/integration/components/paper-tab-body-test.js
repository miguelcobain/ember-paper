import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-tab-body', 'Integration | Component | paper tab body', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{paper-tab-body}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#paper-tab-body}}
      template block text
    {{/paper-tab-body}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
