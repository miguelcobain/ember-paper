import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-datepicker', 'Integration | Component | paper datepicker', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{paper-datepicker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#paper-datepicker}}
      template block text
    {{/paper-datepicker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
