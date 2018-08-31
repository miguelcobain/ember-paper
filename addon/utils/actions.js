export function safeClosureAction(ctx, action, ...args) {

  const func = ctx.get(action);

  if(typeof func === 'function') {
    func(...args);
  }

}
