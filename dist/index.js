(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "babel-runtime/core-js/object/assign", "babel-runtime/helpers/typeof"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("babel-runtime/core-js/object/assign"), require("babel-runtime/helpers/typeof"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.assign, global._typeof);
    global.index = mod.exports;
  }
})(this, function (exports, _assign, _typeof2) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _assign2 = _interopRequireDefault(_assign);

  var _typeof3 = _interopRequireDefault(_typeof2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = function (functions) {
    var context = {};

    functions.reduce(function (doNext, fn) {
      if (!doNext) {
        return false;
      }
      var output = fn(context);
      if (output === false) {
        return false;
      }
      if ((typeof output === "undefined" ? "undefined" : (0, _typeof3.default)(output)) === "object") {
        context = (0, _assign2.default)({}, context, output);
      }
      return true;
    }, true);

    return context;
  };
});