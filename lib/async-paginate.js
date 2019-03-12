"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MenuList = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread5 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSelect = require("react-select");

var _defaultShouldLoadMore = _interopRequireDefault(require("./default-should-load-more"));

var _defaultReduceOptions = _interopRequireDefault(require("./default-reduce-options"));

var _wrapMenuList = _interopRequireDefault(require("./wrap-menu-list"));

var MenuList = (0, _wrapMenuList.default)(_reactSelect.components.MenuList);
exports.MenuList = MenuList;

var sleep = function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}; // Supports forwardRef https://github.com/facebook/prop-types/issues/200


var ComponentPropType = _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string, _propTypes.default.shape({
  render: _propTypes.default.func.isRequired
})]);

var AsyncPaginate =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(AsyncPaginate, _Component);

  function AsyncPaginate(props) {
    var _this;

    (0, _classCallCheck2.default)(this, AsyncPaginate);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AsyncPaginate).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onMenuClose", function () {
      _this.setState({
        search: '',
        menuIsOpen: false
      });

      if (_this.props.onMenuClose) _this.props.onMenuClose.call((0, _assertThisInitialized2.default)(_this));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onMenuOpen",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var optionsCache;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.setState({
                menuIsOpen: true
              });

            case 2:
              optionsCache = _this.state.optionsCache;

              if (optionsCache['']) {
                _context.next = 6;
                break;
              }

              _context.next = 6;
              return _this.loadOptions();

            case 6:
              if (_this.props.onMenuOpen) _this.props.onMenuOpen.call((0, _assertThisInitialized2.default)(_this));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onInputChange",
    /*#__PURE__*/
    function () {
      var _ref2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(search) {
        var optionsCache;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.setState({
                  search: search
                });

              case 2:
                optionsCache = _this.state.optionsCache;

                if (optionsCache[search]) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 6;
                return _this.loadOptions();

              case 6:
                if (_this.props.onInputChange) _this.props.onInputChange.call((0, _assertThisInitialized2.default)(_this));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleScrolledToBottom",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3() {
      var _this$state, search, optionsCache, currentOptions;

      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this$state = _this.state, search = _this$state.search, optionsCache = _this$state.optionsCache;
              currentOptions = optionsCache[search];

              if (!currentOptions) {
                _context3.next = 5;
                break;
              }

              _context3.next = 5;
              return _this.loadOptions();

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    var initialOptionsCache = props.options ? {
      '': {
        isFirstLoad: false,
        isLoading: false,
        options: props.options,
        hasMore: true,
        additional: props.additional
      }
    } : {};
    _this.state = {
      search: '',
      optionsCache: initialOptionsCache,
      menuIsOpen: false
    };
    return _this;
  }

  (0, _createClass2.default)(AsyncPaginate, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(oldProps) {
      var cacheUniq = this.props.cacheUniq;

      if (oldProps.cacheUniq !== cacheUniq) {
        this.setState({
          optionsCache: {}
        });
      }
    }
  }, {
    key: "getInitialCache",
    value: function getInitialCache() {
      var additional = this.props.additional;
      return {
        isFirstLoad: true,
        options: [],
        hasMore: true,
        isLoading: false,
        additional: additional
      };
    }
  }, {
    key: "loadOptions",
    value: function () {
      var _loadOptions = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4() {
        var _this$state2, search, optionsCache, currentOptions, debounceTimeout, newSearch, hasError, additional, options, hasMore, _loadOptions2, response, newAdditional, reduceOptions;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this$state2 = this.state, search = _this$state2.search, optionsCache = _this$state2.optionsCache;
                currentOptions = optionsCache[search] || this.getInitialCache();

                if (!(currentOptions.isLoading || !currentOptions.hasMore)) {
                  _context4.next = 4;
                  break;
                }

                return _context4.abrupt("return");

              case 4:
                _context4.next = 6;
                return this.setState(function (prevState) {
                  var prevSearches = Object.keys(prevState.optionsCache);
                  var prevOptionsCache = prevState.optionsCache;
                  prevSearches.forEach(function (ps) {
                    prevOptionsCache[ps].isLoading = false;
                  });
                  return {
                    search: search,
                    optionsCache: (0, _objectSpread5.default)({}, prevState.optionsCache, (0, _defineProperty2.default)({}, search, (0, _objectSpread5.default)({}, currentOptions, {
                      isLoading: true
                    })))
                  };
                });

              case 6:
                debounceTimeout = this.props.debounceTimeout;

                if (!(debounceTimeout > 0)) {
                  _context4.next = 13;
                  break;
                }

                _context4.next = 10;
                return sleep(debounceTimeout);

              case 10:
                newSearch = this.state.search;

                if (!(search !== newSearch)) {
                  _context4.next = 13;
                  break;
                }

                return _context4.abrupt("return");

              case 13:
                _context4.prev = 13;
                _loadOptions2 = this.props.loadOptions;
                _context4.next = 17;
                return _loadOptions2(search, currentOptions.options, currentOptions.additional);

              case 17:
                response = _context4.sent;
                options = response.options;
                hasMore = response.hasMore;
                additional = response.additional;
                hasError = false;
                _context4.next = 27;
                break;

              case 24:
                _context4.prev = 24;
                _context4.t0 = _context4["catch"](13);
                hasError = true;

              case 27:
                if (!hasError) {
                  _context4.next = 32;
                  break;
                }

                _context4.next = 30;
                return this.setState(function (prevState) {
                  return {
                    optionsCache: (0, _objectSpread5.default)({}, prevState.optionsCache, (0, _defineProperty2.default)({}, search, (0, _objectSpread5.default)({}, currentOptions, {
                      isLoading: false
                    })))
                  };
                });

              case 30:
                _context4.next = 36;
                break;

              case 32:
                newAdditional = typeof additional === 'undefined' ? null : additional;
                reduceOptions = this.props.reduceOptions;
                _context4.next = 36;
                return this.setState(function (prevState) {
                  return {
                    optionsCache: (0, _objectSpread5.default)({}, prevState.optionsCache, (0, _defineProperty2.default)({}, search, (0, _objectSpread5.default)({}, currentOptions, {
                      options: reduceOptions(currentOptions.options, options, newAdditional),
                      hasMore: !!hasMore,
                      isLoading: false,
                      isFirstLoad: false,
                      additional: newAdditional
                    })))
                  };
                });

              case 36:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[13, 24]]);
      }));

      function loadOptions() {
        return _loadOptions.apply(this, arguments);
      }

      return loadOptions;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          selectRef = _this$props.selectRef,
          components = _this$props.components,
          SelectComponent = _this$props.SelectComponent,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["selectRef", "components", "SelectComponent"]);
      var _this$state3 = this.state,
          search = _this$state3.search,
          optionsCache = _this$state3.optionsCache,
          menuIsOpen = _this$state3.menuIsOpen;
      var currentOptions = optionsCache[search] || this.getInitialCache();
      return _react.default.createElement(SelectComponent, (0, _extends2.default)({}, props, {
        inputValue: search,
        menuIsOpen: menuIsOpen,
        onMenuClose: this.onMenuClose,
        onMenuOpen: this.onMenuOpen,
        onInputChange: this.onInputChange,
        onMenuScrollToBottom: this.handleScrolledToBottom,
        handleScrolledToBottom: this.handleScrolledToBottom,
        isLoading: currentOptions.isLoading,
        isFirstLoad: currentOptions.isFirstLoad,
        options: currentOptions.options,
        components: (0, _objectSpread5.default)({
          MenuList: MenuList
        }, components),
        ref: selectRef
      }));
    }
  }]);
  return AsyncPaginate;
}(_react.Component);

(0, _defineProperty2.default)(AsyncPaginate, "propTypes", {
  loadOptions: _propTypes.default.func.isRequired,
  debounceTimeout: _propTypes.default.number,
  shouldLoadMore: _propTypes.default.func,
  options: _propTypes.default.arrayOf(_propTypes.default.object),
  // eslint-disable-next-line react/forbid-prop-types
  additional: _propTypes.default.any,
  reduceOptions: _propTypes.default.func,
  SelectComponent: ComponentPropType,
  components: _propTypes.default.objectOf(_propTypes.default.func),
  onInputChange: _propTypes.default.func,
  onMenuClose: _propTypes.default.func,
  onMenuOpen: _propTypes.default.func,
  // eslint-disable-next-line react/forbid-prop-types
  cacheUniq: _propTypes.default.any,
  selectRef: _propTypes.default.func
});
(0, _defineProperty2.default)(AsyncPaginate, "defaultProps", {
  debounceTimeout: 0,
  shouldLoadMore: _defaultShouldLoadMore.default,
  options: null,
  additional: null,
  reduceOptions: _defaultReduceOptions.default,
  SelectComponent: _reactSelect.SelectBase,
  components: {},
  cacheUniq: null,
  selectRef: function selectRef() {}
});
var _default = AsyncPaginate;
exports.default = _default;