import Ember from 'ember';

var Promise = Ember.RSVP.Promise;
var PromiseArray = Ember.ArrayProxy.extend(Ember.PromiseProxyMixin);
var PromiseObject = Ember.ObjectProxy.extend(Ember.PromiseProxyMixin);

var promiseObject = function(promise, label) {
  return PromiseObject.create({
    promise: Promise.resolve(promise, label)
  });
};

var promiseArray = function(promise, label) {
  return PromiseArray.create({
    promise: Promise.resolve(promise, label)
  });
};

export {
  PromiseArray,
  PromiseObject,
  promiseArray,
  promiseObject
};
