import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import percySnapshot from '@percy/ember';

module('Acceptance | catalog', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /catalog', async function (assert) {
    await visit('/catalog');

    assert.equal(currentURL(), '/catalog');

    await percySnapshot('Catalog');
  });
});
