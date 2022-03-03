/* eslint-disable no-extra-semi */
import { assert } from '@ember/debug';
import { get } from '@ember/object';

function invokeAction(object, actionName, ...args) {
  assert('The first argument passed to invokeAction must be an object', typeof object === 'object');

  let action;
  if (typeof actionName === 'string') {
    action = get(object, actionName);
  } else if (typeof actionName === 'function') {
    action = actionName;
  } else {
    assert('The second argument passed to invokeAction must be a string as actionName or a function', false);
  }

  if (typeof action === 'string') {
    object.sendAction(actionName, ...args);
  } else if (typeof action === 'function') {
    return action(...args);
  }
};

export { invokeAction };
