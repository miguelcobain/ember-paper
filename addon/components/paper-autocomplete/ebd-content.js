/**
 * @module ember-paper
 */
import Component from '@glimmer/component';

const defaultStyles = Object.freeze({
  'overflow-y': 'auto',
  'overflow-x': 'hidden',
  height: 'auto!important',
});

/**
 * @class PaperAutocompleteEbdContent
 * @extends Component
 */
export default class PaperAutocompleteEbdContent extends Component {
  get customStyles() {
    return this.args.customStyles ?? defaultStyles;
  }

  shouldReposition(mutations) {
    let shouldReposition = false;

    shouldReposition = Array.prototype.slice
      .call(mutations[0].addedNodes)
      .some((node) => {
        if (node.classList) {
          return (
            !node.classList.contains('md-ripple') &&
            node.nodeName !== '#comment' &&
            !(node.nodeName === '#text' && node.nodeValue === '')
          );
        }
        return false;
      });

    shouldReposition =
      shouldReposition ||
      Array.prototype.slice.call(mutations[0].removedNodes).some((node) => {
        if (node.classList) {
          return (
            !node.classList.contains('md-ripple') &&
            node.nodeName !== '#comment' &&
            !(node.nodeName === '#text' && node.nodeValue === '')
          );
        }
        return false;
      });

    return shouldReposition;
  }
}
