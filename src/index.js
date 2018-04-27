const handleReturnValue = (value, prevState) =>
  typeof value === "object"
    ? [true, Object.assign({}, prevState, value)]
    : [value === false ? false : true, context];

const callFunction = (fn, context) => handleReturnValue(fn(context), context);

export default (functions, initialState = {}) =>
  functions.reduce(
    ([doNext, state], fn) =>
      doNext ? callFunction(fn, state) : [false, state],
    [true, initialState || {}]
  )[1];
