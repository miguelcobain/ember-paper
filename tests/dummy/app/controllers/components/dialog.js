import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Controller {
  @tracked
  dogName = '';

  @action
  openDialog(event) {
    this.set('dialogOrigin', event.currentTarget);
    this.set('showDialog', true);
  }

  @action
  closeDialog(result) {
    this.set('result', result);
    this.set('showDialog', false);
  }


  @action
  openPromptDialog() {
    this.set('dialogOrigin', null);
    this.set('showPromptDialog', true);
  }

  @action
  closePromptDialog(result, dogName) {
    if (result === 'ok') {
      result = `${result} and dog named ${dogName}`;
    }
    this.set('result', result);
    this.set('showPromptDialog', false);
  }

  @action
  toggleSourceCode() {
    this.toggleProperty('showSourceCode');
  }

  @action
  openAnimatedDialog() {
    this.set('showAnimatedDialog', true);
  }

  @action
  closeAnimatedDialog() {
    this.set('showAnimatedDialog', false);
  }
}
