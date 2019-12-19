import Component from '@ember/component';
import template from './template';

import { tagName, layout } from '@ember-decorators/component';

@tagName('')
@layout(template)
class PaperAutocompleteEbdContent extends Component {

  customStyles = {
    'overflow-y': 'auto',
    'overflow-x': 'hidden',
    'height': 'auto!important'
  };

  shouldReposition(mutations) {
    let shouldReposition = false;

    shouldReposition = Array.prototype.slice.call(mutations[0].addedNodes).some((node) => {
      if (node.classList) {
        return !node.classList.contains('md-ripple') && (node.nodeName !== '#comment') && !(node.nodeName === '#text' && node.nodeValue === '');
      }
      return false;
    });

    shouldReposition = shouldReposition || Array.prototype.slice.call(mutations[0].removedNodes).some((node) => {
      if (node.classList) {
        return !node.classList.contains('md-ripple') && (node.nodeName !== '#comment') && !(node.nodeName === '#text' && node.nodeValue === '');
      }
      return false;
    });

    return shouldReposition;
  }

}

export default PaperAutocompleteEbdContent;
