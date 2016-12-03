import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-tab-label', 'Integration | Component | paper tab label', {
  integration: true
});

test('it renders content in a span', function(assert) {
  this.render(hbs`
    {{#paper-tab-label}}
      label
    {{/paper-tab-label}}
  `);
  assert.equal(this.$('span').text().trim(), 'label');
});

test('it send identifyTabLabel action with its ID to the parent on insertion', function(assert) {
  assert.expect(2);

  this.set('elementId', 42);

  this.set('parent', {
    send: (name, id) => {
      assert.equal(name, 'identifyTabLabel');
      assert.equal(id, 42);
    }
  });

  this.render(hbs`{{paper-tab-label elementId=elementId parent=parent}}`);

});
