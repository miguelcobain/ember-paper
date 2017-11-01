/**
 * @module ember-paper
 */
import { Promise } from 'rsvp';

import ArrayProxy from '@ember/array/proxy';
import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';

// See http://emberjs.com/api/data/classes/DS.PromiseArray.html
export const PromiseArray = ArrayProxy.extend(PromiseProxyMixin);
// See http://emberjs.com/api/data/classes/DS.PromiseObject.html
export const PromiseObject = ObjectProxy.extend(PromiseProxyMixin);

export function promiseObject(promise, label) {
  return PromiseObject.create({
    promise: Promise.resolve(promise, label)
  });
}

export function promiseArray(promise, label) {
  return PromiseArray.create({
    promise: Promise.resolve(promise, label)
  });
}
