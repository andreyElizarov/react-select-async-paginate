"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var defaultReduceOptions = function defaultReduceOptions(prevOptions, loadedOptions) {
  return prevOptions.concat(loadedOptions);
};

var _default = defaultReduceOptions;
exports.default = _default;