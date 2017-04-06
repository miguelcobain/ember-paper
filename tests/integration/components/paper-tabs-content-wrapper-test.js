import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-tabs-content-wrapper', 'Integration | Component | paper tabs content wrapper', {
  integration: true,
  beforeEach() {
    this.set('parentComponent', {
      registerChild() {},
      unregisterChild() {}
    });
  }
});

test('it renders its block content in a md-tabs-content-wrapper tag', function(assert) {
  this.render(hbs`{{#paper-tabs-content-wrapper parentComponent=parentComponent}}
    block content
   {{/paper-tabs-content-wrapper}}`);

  assert.ok(this.$('md-tabs-content-wrapper').length === 1, 'tag md-tabs-content-wrapper rendered');
  assert.equal(this.$('md-tabs-content-wrapper').text().trim(), 'block content');
});
