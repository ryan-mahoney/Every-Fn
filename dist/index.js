(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "babel-runtime/helpers/slicedToArray", "babel-runtime/core-js/object/assign", "babel-runtime/helpers/typeof"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("babel-runtime/helpers/slicedToArray"), require("babel-runtime/core-js/object/assign"), require("babel-runtime/helpers/typeof"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.slicedToArray, global.assign, global._typeof);
    global.index = mod.exports;
  }
})(this, function (exports, _slicedToArray2, _assign, _typeof2) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

  var _assign2 = _interopRequireDefault(_assign);

  var _typeof3 = _interopRequireDefault(_typeof2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var handleReturnValue = function handleReturnValue(value, prevState) {
    return (typeof value === "undefined" ? "undefined" : (0, _typeof3.default)(value)) === "object" ? [true, (0, _assign2.default)({}, prevState, value)] : [value === false ? false : true, context];
  };

  var callFunction = function callFunction(fn, context) {
    return handleReturnValue(fn(context), context);
  };

  exports.default = function (functions) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return functions.reduce(function (_ref, fn) {
      var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
          doNext = _ref2[0],
          state = _ref2[1];

      return doNext ? callFunction(fn, state) : [false, state];
    }, [true, initialState || {}])[1];
  };
});