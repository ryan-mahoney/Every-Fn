import { FunctionModel, Model } from "objectmodel";

const handleReturnValue = (value, prevState) =>
  typeof value === "object"
    ? [true, Object.assign({}, prevState, value)]
    : [value === false ? false : true, prevState];

const callFunction = async (fn, state) =>
  handleReturnValue(await fn(state), state);

export const every = async (functions, initialState = {}) => {
  const finalState = await functions.reduce(async (previousPromise, fn) => {
    const [doNext, state] = await previousPromise;
    return doNext ? await callFunction(fn, state) : [false, state];
  }, Promise.resolve([true, initialState]));
  return finalState[1];
};

export const typed = (typeIn, typeOut, fn) =>
  FunctionModel(Model(typeIn)).return(Model(typeOut))(fn);
