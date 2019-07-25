import ArrayProxy from '@ember/array/proxy';
import ObjectProxy from '@ember/object/proxy';
import { get } from '@ember/object';

export default function unwrapProxy(o) {
  return isProxy(o) ? unwrapProxy(get(o, 'content')) : o;
}

export function isProxy(o) {
  return !!(o && (o instanceof ObjectProxy || o instanceof ArrayProxy));
}
