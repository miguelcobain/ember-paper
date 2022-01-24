import { DEBUG } from '@glimmer/env';
import requirejs from 'require';

export default function ebdGetParent(owner) {
  // Try to fix :
  // - https://github.com/miguelcobain/ember-paper/issues/1151
  // - https://github.com/miguelcobain/ember-paper/issues/1166
  // By doing like https://github.com/cibernox/ember-basic-dropdown/blob/850c227c0a58148056d55d41aa0e5d88656b8165/addon/components/basic-dropdown.js#L273-L290
  let config = owner.resolveRegistration('config:environment');
  let id;
  if (config.environment === 'test') {
    if (DEBUG) {
      if (requirejs.has('@ember/test-helpers/dom/get-root-element')) {
        try {
          id = requirejs('@ember/test-helpers/dom/get-root-element').default().id;
        } catch(ex) {
          id = document.querySelector('#ember-testing > .ember-view').id;
        }
      } else {
        id = document.querySelector('#ember-testing > .ember-view').id;
      }
    }
  } else {
    id =  config['ember-basic-dropdown'] && config['ember-basic-dropdown'].destination || 'ember-basic-dropdown-wormhole';
  }

  return document.getElementById(id);
}
