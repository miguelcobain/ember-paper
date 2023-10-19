import Component from '@glimmer/component';
import { addColors } from 'ember-paper/mixins-class';

export default class PaperToolbarComponent extends addColors(Component) {
  get tall() {
    return this.args.tall ?? false;
  }

  get classes() {
    const { tall, colorClasses } = this;
    const classes = ['md-default-theme'];

    if (tall) classes.push('md-tall');

    return [...classes, ...colorClasses].join(' ');
  }
}
