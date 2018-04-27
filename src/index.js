const handleReturnValue = (returnVal, prevContext) =>
  typeof returnVal === "object"
    ? [true, Object.assign({}, prevContext, returnVal)]
    : [returnVal === false ? false : true, context];

const callFunction = (fn, context) => handleReturnValue(fn(context), context);

export default functions =>
  functions.reduce(
    ([doNext, context], fn) =>
      doNext ? callFunction(fn, context) : [false, context],
    [true, {}]
  )[1];
