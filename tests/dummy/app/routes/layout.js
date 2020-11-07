import Route from '@ember/routing/route';

export default class extends Route {
  beforeModel(transition) {
    if(transition.to.name === 'layout.index') {
      this.transitionTo('layout.introduction');
    }
  }
}
