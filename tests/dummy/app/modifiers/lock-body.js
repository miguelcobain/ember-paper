import { modifier } from 'ember-modifier';

const LOCK_BODY_CLASS = 'ember-paper-lockbody';

export default modifier(
  function lockBody(/*element /*, positional, named*/) {
    document.querySelector('body').classList.add(LOCK_BODY_CLASS);

    return () => {
      document.querySelector('body').classList.remove(LOCK_BODY_CLASS);
    };
  },
  {
    eager: true,
  }
);
