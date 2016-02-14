import Ember from 'ember';
const { RSVP: { Promise } } = Ember;

// See http://emberjs.com/api/data/classes/DS.PromiseArray.html
export const PromiseArray = Ember.ArrayProxy.extend(Ember.PromiseProxyMixin);
// See http://emberjs.com/api/data/classes/DS.PromiseObject.html
export const PromiseObject = Ember.ObjectProxy.extend(Ember.PromiseProxyMixin);

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
