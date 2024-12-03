import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class PaperInkBar extends Component {
  get style() {
    return htmlSafe(`left: ${this.args.left}px; right: ${this.args.right}px;`);
  }
}
