"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapMenuList;
exports.CHECK_TIMEOUT = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var CHECK_TIMEOUT = 300;
exports.CHECK_TIMEOUT = CHECK_TIMEOUT;

function wrapMenuList(MenuList) {
  var WrappedMenuList =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(WrappedMenuList, _Component);

    function WrappedMenuList() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, WrappedMenuList);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(WrappedMenuList)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "innerRef", function (ref) {
        if (ref === _this.menuListRef) {
          return;
        }

        var innerRef = _this.props.innerRef;
        _this.menuListRef = ref;
        innerRef(ref);
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setCheckAndHandleTimeount", function () {
        _this.checkAndHandle();

        _this.checkTimeout = setTimeout(_this.setCheckAndHandleTimeount, CHECK_TIMEOUT);
      });
      return _this;
    }

    (0, _createClass2.default)(WrappedMenuList, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.setCheckAndHandleTimeount();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.checkTimeout) {
          clearTimeout(this.checkTimeout);
        }
      }
    }, {
      key: "checkAndHandle",
      value: function checkAndHandle() {
        if (this.shouldHandle()) {
          var handleScrolledToBottom = this.props.selectProps.handleScrolledToBottom;

          if (handleScrolledToBottom) {
            handleScrolledToBottom();
          }
        }
      }
    }, {
      key: "shouldHandle",
      value: function shouldHandle() {
        var el = this.menuListRef; // menu not rendered

        if (!el) {
          return false;
        }

        var scrollTop = el.scrollTop,
            scrollHeight = el.scrollHeight,
            clientHeight = el.clientHeight; // menu hasn't scroll

        if (scrollHeight <= clientHeight) {
          return true;
        }

        var shouldLoadMore = this.props.selectProps.shouldLoadMore;
        return shouldLoadMore(scrollHeight, clientHeight, scrollTop);
      }
    }, {
      key: "render",
      value: function render() {
        return _react.default.createElement(MenuList, (0, _extends2.default)({}, this.props, {
          innerRef: this.innerRef
        }));
      }
    }]);
    return WrappedMenuList;
  }(_react.Component);

  (0, _defineProperty2.default)(WrappedMenuList, "propTypes", {
    innerRef: _propTypes.default.func.isRequired,
    selectProps: _propTypes.default.shape({
      handleScrolledToBottom: _propTypes.default.func.isRequired,
      shouldLoadMore: _propTypes.default.func.isRequired
    }).isRequired
  });
  return WrappedMenuList;
}