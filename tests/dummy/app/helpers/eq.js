import Helper from '@ember/component/helper';

export default class extends Helper {
  compute([a, b]) {
    return a === b;
  }
}
