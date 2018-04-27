export default (functions) => {
  let context = {};

  functions.reduce((doNext, fn) => {
    if (!doNext) {
      return false;
    }
    const output = fn(context);
    if (output === false) {
      return false;
    }
    if (typeof output === "object") {
      context = Object.assign({}, context, output);
    }
    return true;
  }, true);

  return context;
};