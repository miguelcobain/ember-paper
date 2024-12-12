/**
 * @module ember-paper
 */
import Component from '@glimmer/component';

/**
 * @class PaperAutocompleteHighlight
 * @extends Component
 */
export default class PaperAutocompleteHighlight extends Component {
  get tokens() {
    let string = `${this.args.label}`;
    let regex = this.regex;

    let tokens = [];
    let lastIndex = 0;

    // Use replace here, because it supports global and single regular expressions at same time.
    string.replace(regex, (match, index) => {
      let prev = string.slice(lastIndex, index);
      if (prev) {
        tokens.push({
          text: prev,
          isMatch: false,
        });
      }

      tokens.push({
        text: match,
        isMatch: true,
      });

      lastIndex = index + match.length;
    });

    // Append the missing text as a token.
    let last = string.slice(lastIndex);
    if (last) {
      tokens.push({
        text: last,
        isMatch: false,
      });
    }

    return tokens;
  }

  get regex() {
    let flags = this.args.flags;
    let text = this.args.searchText;
    return this.getRegExp(text, flags);
  }

  getRegExp(term, flags) {
    let startFlag = '';
    let endFlag = '';
    let regexTerm = this.sanitizeRegex(term);

    if (flags.indexOf('^') >= 0) {
      startFlag = '^';
    }

    if (flags.indexOf('$') >= 0) {
      endFlag = '$';
    }

    return new RegExp(
      startFlag + regexTerm + endFlag,
      flags.replace(/[$^]/g, '')
    );
  }

  sanitizeRegex(term) {
    return term && term.toString().replace(/[\\^$*+?.()|{}[\]]/g, '\\$&');
  }
}
