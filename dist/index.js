(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "babel-runtime/core-js/promise", "babel-runtime/helpers/slicedToArray", "babel-runtime/regenerator", "babel-runtime/helpers/asyncToGenerator", "babel-runtime/core-js/object/assign", "babel-runtime/helpers/typeof"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("babel-runtime/core-js/promise"), require("babel-runtime/helpers/slicedToArray"), require("babel-runtime/regenerator"), require("babel-runtime/helpers/asyncToGenerator"), require("babel-runtime/core-js/object/assign"), require("babel-runtime/helpers/typeof"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.promise, global.slicedToArray, global.regenerator, global.asyncToGenerator, global.assign, global._typeof);
    global.index = mod.exports;
  }
})(this, function (exports, _promise, _slicedToArray2, _regenerator, _asyncToGenerator2, _assign, _typeof2) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _promise2 = _interopRequireDefault(_promise);

  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _assign2 = _interopRequireDefault(_assign);

  var _typeof3 = _interopRequireDefault(_typeof2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var handleReturnValue = function handleReturnValue(value, prevState) {
    return (typeof value === "undefined" ? "undefined" : (0, _typeof3.default)(value)) === "object" ? [true, (0, _assign2.default)({}, prevState, value)] : [value === false ? false : true, prevState];
  };

  var callFunction = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(fn, state) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = handleReturnValue;
              _context.next = 3;
              return fn(state);

            case 3:
              _context.t1 = _context.sent;
              _context.t2 = state;
              return _context.abrupt("return", (0, _context.t0)(_context.t1, _context.t2));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function callFunction(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  exports.default = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(functions) {
      var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var finalState;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return functions.reduce(function () {
                var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(previousPromise, fn) {
                  var _ref4, _ref5, doNext, state;

                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return previousPromise;

                        case 2:
                          _ref4 = _context2.sent;
                          _ref5 = (0, _slicedToArray3.default)(_ref4, 2);
                          doNext = _ref5[0];
                          state = _ref5[1];

                          if (!doNext) {
                            _context2.next = 12;
                            break;
                          }

                          _context2.next = 9;
                          return callFunction(fn, state);

                        case 9:
                          _context2.t0 = _context2.sent;
                          _context2.next = 13;
                          break;

                        case 12:
                          _context2.t0 = [false, state];

                        case 13:
                          return _context2.abrupt("return", _context2.t0);

                        case 14:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, undefined);
                }));

                return function (_x5, _x6) {
                  return _ref3.apply(this, arguments);
                };
              }(), _promise2.default.resolve([true, initialState]));

            case 2:
              finalState = _context3.sent;
              return _context3.abrupt("return", finalState[1]);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }();
});