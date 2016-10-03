/**
 * @module ember-paper
 */
import Ember from 'ember';
const { RSVP: { Promise }, ArrayProxy, ObjectProxy, PromiseProxyMixin } = Ember;

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
