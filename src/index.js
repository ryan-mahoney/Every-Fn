const handleReturnValue = (value, prevState) =>
  typeof value === "object"
    ? [true, Object.assign({}, prevState, value)]
    : [value === false ? false : true, prevState];

const callFunction = (fn, state) => handleReturnValue(fn(state), state);

export default (functions, initialState = {}) =>
  functions.reduce(
    ([doNext, state], fn) =>
      doNext ? callFunction(fn, state) : [false, state],
    [true, initialState || {}]
  )[1];
