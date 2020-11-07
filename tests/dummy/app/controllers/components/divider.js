import Controller from '@ember/controller';
import { A } from '@ember/array';

export default class extends Controller {
  messages = A([{
    face: '/assets/tomster.png',
    who: 'tomster 1',
    what: 'a message for you',
    notes: 'this is a message for you about ember'
  }, {
    face: '/assets/tomster.png',
    who: 'tomster 2',
    what: 'a message for you',
    notes: 'this is a message for you about ember'
  }, {
    face: '/assets/tomster.png',
    who: 'tomster 3',
    what: 'a message for you',
    notes: 'this is a message for you about ember'
  }, {
    face: '/assets/tomster.png',
    who: 'tomster 4',
    what: 'a message for you',
    notes: 'this is a message for you about ember'
  }, {
    face: '/assets/tomster.png',
    who: 'tomster 5',
    what: 'a message for you',
    notes: 'this is a message for you about ember'
  }]);
}
