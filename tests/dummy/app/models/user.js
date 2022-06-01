/* eslint-disable ember/use-ember-data-rfc-395-imports */
// models/user.js

import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  username: attr('string'),
  password: attr('string'),
  email: attr('string')
});
