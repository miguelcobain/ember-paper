import Controller from '@ember/controller';
import { A } from '@ember/array';
import { action } from '@ember/object';

export default class MenuController extends Controller {

  options = A([1, 2, 3, 4, 5]);

  items = A([
    {
      icon: 'access_alarms',
      title: 'Alarm',
      isFirst: true
    },
    {
      icon: 'airplay',
      title: 'Airplay'
    },

    {
      icon: 'airplanemode_active',
      title: 'Airplane mode'
    }
  ]);

  @action
  openSomething() {
    alert('Some action handler.');
  }
}
