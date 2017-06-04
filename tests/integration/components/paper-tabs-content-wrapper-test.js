import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-tabs-content-wrapper', 'Integration | Component | paper tabs content wrapper', {
  integration: true
});

test('it send setWormhole action with its ID to its parent on render', function(assert) {
  assert.expect(2);

  this.set('parent', {
    send: (name, value) => {
      assert.equal(name, 'setWormhole', 'called setWormhole action');
      assert.equal(value, 72, 'passed its ID as parameter');
    }
  });

  this.render(hbs`{{paper-tabs-content-wrapper parent=parent id=72}}`);
});

test('it renders its block content in a md-tabs-content-wrapper tag', function(assert) {
  this.set('parent', {
    send() {}
  });

  this.render(hbs`{{#paper-tabs-content-wrapper parent=parent}}
    block content
   {{/paper-tabs-content-wrapper}}`);

  assert.ok(this.$('md-tabs-content-wrapper').length === 1, 'tag md-tabs-content-wrapper rendered');
  assert.equal(this.$('md-tabs-content-wrapper').text().trim(), 'block content');
});
