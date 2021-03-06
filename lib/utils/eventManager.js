"use strict";

exports.__esModule = true;
exports.default = void 0;
var eventManager = {
  list: new Map(),
  on: function on(event, callback) {
    this.list.has(event) || this.list.set(event, []);
    this.list.get(event).push(callback);
    return this;
  },
  off: function off(event) {
    if (event === void 0) {
      event = null;
    }

    this.list.delete(event);
    return this;
  },
  emit: function emit(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (!this.list.has(event)) {
      return false;
    }

    this.list.get(event).forEach(function (callback) {
      return setTimeout(function () {
        return callback.call.apply(callback, [null].concat(args));
      }, 0);
    });
    return true;
  }
};
var _default = eventManager;
exports.default = _default;