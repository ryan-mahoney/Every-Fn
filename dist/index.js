"use strict";

var _objectmodel = require("objectmodel");

var FunctionModel = _objectmodel.FunctionModel;
var Model = _objectmodel.Model;


const handleReturnValue = (value, prevState) => typeof value === "object" ? [true, Object.assign({}, prevState, value)] : [value === false ? false : true, prevState];

const callFunction = async (fn, state) => handleReturnValue((await fn(state)), state);

const every = exports.every = async (functions, initialState = {}) => {
  const finalState = await functions.reduce(async (previousPromise, fn) => {
    const [doNext, state] = await previousPromise;
    return doNext ? await callFunction(fn, state) : [false, state];
  }, Promise.resolve([true, initialState]));
  return finalState[1];
};

const typed = exports.typed = (typeIn, typeOut, fn) => fn === undefined ? FunctionModel(Model(typeIn))(typeOut) : FunctionModel(Model(typeIn)).return(Model(typeOut))(fn);