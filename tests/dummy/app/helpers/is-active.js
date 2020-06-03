import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class extends Helper {
  @service router;

  compute([routeName]) {
    if(this.router.currentRouteName.indexOf('.') > -1) {
      const routeParts = this.router.currentRouteName.split('.');
      let isParentRoute = false;
      let fullRoute = '';
      routeParts.forEach((part, i) => {
        fullRoute += i === 0 ? part : '.' + part;

        if(fullRoute === routeName) {
          isParentRoute = true;
        }
      });

      if(isParentRoute) return true;
    }

    return this.router.currentRouteName === routeName;
  }
}
