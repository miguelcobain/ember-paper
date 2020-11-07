import Component from '@glimmer/component';
import { dasherize } from '@ember/string';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

export default class extends Component {
  @tracked selected;

  headers = A([]);

  @action
  onInsert() {
    const onPageHeaders = Array.from(document.querySelectorAll(".header"));

    onPageHeaders.forEach((header) => {
      const hashValue = dasherize(header.innerHTML.trim());
      header.id = hashValue;

      this.headers.pushObject({
        tagName: header.tagName,
        value: header.innerHTML,
        hashValue,
        top: offset(header).top
      });
    });

    document.addEventListener('scroll', () => {
      const maybeSelected = this.headers.sort((a, b) => {
        return Math.abs(window.scrollY - a.top) - Math.abs(window.scrollY - b.top);
      })[0];

      this.selected = maybeSelected.hashValue;
    })
  }
}
