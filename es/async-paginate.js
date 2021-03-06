import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SelectBase, components as defaultComponents } from 'react-select';
import defaultShouldLoadMore from './default-should-load-more';
import defaultReduceOptions from './default-reduce-options';
import wrapMenuList from './wrap-menu-list';
export var MenuList = wrapMenuList(defaultComponents.MenuList);

var sleep = function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}; // Supports forwardRef https://github.com/facebook/prop-types/issues/200


var ComponentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.shape({
  render: PropTypes.func.isRequired
})]);

var AsyncPaginate =
/*#__PURE__*/
function (_Component) {
  _inherits(AsyncPaginate, _Component);

  function AsyncPaginate(props) {
    var _this;

    _classCallCheck(this, AsyncPaginate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AsyncPaginate).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onMenuClose", function () {
      _this.setState({
        search: '',
        menuIsOpen: false
      });

      if (_this.props.onMenuClose) _this.props.onMenuClose.call(_assertThisInitialized(_this));
      if (_this.props.dropCacheOnMenuClose) _this.dropCache();
    });

    _defineProperty(_assertThisInitialized(_this), "onMenuOpen",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      var optionsCache;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
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
              if (_this.props.onMenuOpen) _this.props.onMenuOpen.call(_assertThisInitialized(_this));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "onInputChange",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(search) {
        var optionsCache;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.setState({
                  search: search
                });

              case 2:
                optionsCache = _this.state.optionsCache;

                if (!(!optionsCache[search] && _this.state.menuIsOpen)) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 6;
                return _this.loadOptions();

              case 6:
                if (_this.props.onInputChange) _this.props.onInputChange.call(_assertThisInitialized(_this));

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

    _defineProperty(_assertThisInitialized(_this), "handleScrolledToBottom",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee3() {
      var _this$state, search, optionsCache, currentOptions;

      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
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

  _createClass(AsyncPaginate, [{
    key: "dropCache",
    value: function dropCache() {
      this.setState({
        optionsCache: {}
      });
    }
  }, {
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
      var _loadOptions = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4() {
        var _this$state2, search, optionsCache, currentOptions, debounceTimeout, newSearch, hasError, additional, options, hasMore, _loadOptions2, response, newAdditional, reduceOptions;

        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
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
                    optionsCache: _objectSpread({}, prevState.optionsCache, _defineProperty({}, search, _objectSpread({}, currentOptions, {
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
                    optionsCache: _objectSpread({}, prevState.optionsCache, _defineProperty({}, search, _objectSpread({}, currentOptions, {
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
                    optionsCache: _objectSpread({}, prevState.optionsCache, _defineProperty({}, search, _objectSpread({}, currentOptions, {
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
          props = _objectWithoutProperties(_this$props, ["selectRef", "components", "SelectComponent"]);

      var _this$state3 = this.state,
          search = _this$state3.search,
          optionsCache = _this$state3.optionsCache,
          menuIsOpen = _this$state3.menuIsOpen;
      var currentOptions = optionsCache[search] || this.getInitialCache();
      return React.createElement(SelectComponent, _extends({}, props, {
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
        components: _objectSpread({
          MenuList: MenuList
        }, components),
        ref: selectRef
      }));
    }
  }]);

  return AsyncPaginate;
}(Component);

_defineProperty(AsyncPaginate, "propTypes", {
  loadOptions: PropTypes.func.isRequired,
  debounceTimeout: PropTypes.number,
  shouldLoadMore: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  additional: PropTypes.any,
  reduceOptions: PropTypes.func,
  SelectComponent: ComponentPropType,
  components: PropTypes.objectOf(PropTypes.func),
  onInputChange: PropTypes.func,
  onMenuClose: PropTypes.func,
  dropCacheOnMenuClose: PropTypes.bool,
  onMenuOpen: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  cacheUniq: PropTypes.any,
  selectRef: PropTypes.func
});

_defineProperty(AsyncPaginate, "defaultProps", {
  debounceTimeout: 0,
  shouldLoadMore: defaultShouldLoadMore,
  options: null,
  additional: null,
  reduceOptions: defaultReduceOptions,
  SelectComponent: SelectBase,
  components: {},
  cacheUniq: null,
  selectRef: function selectRef() {}
});

export default AsyncPaginate;