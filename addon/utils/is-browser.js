/*
Ye' ol annoying isBrower function to allow use of this library with fastboot.

Use this within init() within components
*/

export default function isBrowser() {
  return typeof window   !== 'undefined' &&
         typeof document !== 'undefined' &&
         typeof process  === 'undefined' &&
         !!window.document               &&
         !!window.document.createElement;
}
