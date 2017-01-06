import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-calendar-years', 'Integration | Component | paper calendar years', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{paper-calendar-years}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#paper-calendar-years}}
      template block text
    {{/paper-calendar-years}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
