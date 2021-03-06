"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _TransitionGroup = _interopRequireDefault(require("react-transition-group/TransitionGroup"));

var _Toast = _interopRequireDefault(require("./Toast"));

var _CloseButton = _interopRequireDefault(require("./CloseButton"));

var _Transitions = require("./Transitions");

var _constant = require("./../utils/constant");

var _eventManager = _interopRequireDefault(require("./../utils/eventManager"));

var _propValidator = require("./../utils/propValidator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ToastContainer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ToastContainer, _Component);

  function ToastContainer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      toast: []
    };
    _this.collection = {};

    _this.isToastActive = function (id) {
      return _this.state.toast.indexOf(id) !== -1;
    };

    return _this;
  }

  var _proto = ToastContainer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    _eventManager.default.on(_constant.ACTION.SHOW, function (content, options) {
      return _this2.show(content, options);
    }).on(_constant.ACTION.CLEAR, function (id) {
      return id !== null ? _this2.removeToast(id) : _this2.clear();
    }).emit(_constant.ACTION.DID_MOUNT, this);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _eventManager.default.off(_constant.ACTION.SHOW).off(_constant.ACTION.CLEAR).emit(_constant.ACTION.WILL_UNMOUNT);
  };

  _proto.removeToast = function removeToast(id) {
    this.setState({
      toast: this.state.toast.filter(function (v) {
        return v !== id;
      })
    }, this.dispatchChange);
  };

  _proto.dispatchChange = function dispatchChange() {
    _eventManager.default.emit(_constant.ACTION.ON_CHANGE, this.state.toast.length);
  };

  _proto.makeCloseButton = function makeCloseButton(toastClose, toastId, type) {
    var _this3 = this;

    var closeButton = this.props.closeButton;

    if ((0, _react.isValidElement)(toastClose) || toastClose === false) {
      closeButton = toastClose;
    }

    return closeButton === false ? false : (0, _react.cloneElement)(closeButton, {
      closeToast: function closeToast() {
        return _this3.removeToast(toastId);
      },
      type: type
    });
  };

  _proto.getAutoCloseDelay = function getAutoCloseDelay(toastAutoClose) {
    return toastAutoClose === false || (0, _propValidator.isValidDelay)(toastAutoClose) ? toastAutoClose : this.props.autoClose;
  };

  _proto.canBeRendered = function canBeRendered(content) {
    return (0, _react.isValidElement)(content) || typeof content === 'string' || typeof content === 'number' || typeof content === 'function';
  };

  _proto.parseClassName = function parseClassName(prop) {
    if (typeof prop === 'string') {
      return prop;
    } else if (prop !== null && typeof prop === 'object' && 'toString' in prop) {
      return prop.toString();
    }

    return null;
  };

  _proto.show = function show(content, options) {
    var _this4 = this,
        _extends2;

    if (!this.canBeRendered(content)) {
      throw new Error("The element you provided cannot be rendered. You provided an element of type " + typeof content);
    }

    var toastId = options.toastId;

    var closeToast = function closeToast() {
      return _this4.removeToast(toastId);
    };

    var toastOptions = {
      id: toastId,
      type: options.type,
      closeToast: closeToast,
      updateId: options.updateId,
      rtl: this.props.rtl,
      position: options.position || this.props.position,
      transition: options.transition || this.props.transition,
      className: this.parseClassName(options.className || this.props.toastClassName),
      bodyClassName: this.parseClassName(options.bodyClassName || this.props.bodyClassName),
      closeButton: this.makeCloseButton(options.closeButton, toastId, options.type),
      pauseOnHover: typeof options.pauseOnHover === 'boolean' ? options.pauseOnHover : this.props.pauseOnHover,
      pauseOnFocusLoss: typeof options.pauseOnFocusLoss === 'boolean' ? options.pauseOnFocusLoss : this.props.pauseOnFocusLoss,
      draggable: typeof options.draggable === 'boolean' ? options.draggable : this.props.draggable,
      draggablePercent: typeof options.draggablePercent === 'number' && !isNaN(options.draggablePercent) ? options.draggablePercent : this.props.draggablePercent,
      closeOnClick: typeof options.closeOnClick === 'boolean' ? options.closeOnClick : this.props.closeOnClick,
      progressClassName: this.parseClassName(options.progressClassName || this.props.progressClassName),
      progressStyle: this.props.progressStyle,
      autoClose: this.getAutoCloseDelay(options.autoClose),
      hideProgressBar: typeof options.hideProgressBar === 'boolean' ? options.hideProgressBar : this.props.hideProgressBar
    };
    typeof options.onOpen === 'function' && (toastOptions.onOpen = options.onOpen);
    typeof options.onClose === 'function' && (toastOptions.onClose = options.onClose); // add closeToast function to react component only

    if ((0, _react.isValidElement)(content) && typeof content.type !== 'string' && typeof content.type !== 'number') {
      content = (0, _react.cloneElement)(content, {
        closeToast: closeToast
      });
    } else if (typeof content === 'function') {
      content = content({
        closeToast: closeToast
      });
    }

    this.collection = _extends({}, this.collection, (_extends2 = {}, _extends2[toastId] = {
      position: toastOptions.position,
      options: toastOptions,
      content: content
    }, _extends2));
    this.setState({
      toast: toastOptions.updateId ? _toConsumableArray(this.state.toast) : _toConsumableArray(this.state.toast).concat([toastId])
    }, this.dispatchChange);
  };

  _proto.makeToast = function makeToast(content, options) {
    return _react.default.createElement(_Toast.default, _extends({}, options, {
      isDocumentHidden: this.state.isDocumentHidden,
      key: "toast-" + options.id
    }), content);
  };

  _proto.clear = function clear() {
    this.setState({
      toast: []
    });
  };

  _proto.renderToast = function renderToast() {
    var _this5 = this;

    var toastToRender = {};
    var _this$props = this.props,
        className = _this$props.className,
        style = _this$props.style,
        newestOnTop = _this$props.newestOnTop;
    var collection = newestOnTop ? Object.keys(this.collection).reverse() : Object.keys(this.collection); // group toast by position

    collection.forEach(function (toastId) {
      var _this5$collection$toa = _this5.collection[toastId],
          position = _this5$collection$toa.position,
          options = _this5$collection$toa.options,
          content = _this5$collection$toa.content;
      toastToRender[position] || (toastToRender[position] = []);

      if (_this5.state.toast.indexOf(options.id) !== -1) {
        toastToRender[position].push(_this5.makeToast(content, options));
      } else {
        toastToRender[position].push(null);
        delete _this5.collection[toastId];
      }
    });
    return Object.keys(toastToRender).map(function (position) {
      var disablePointer = toastToRender[position].length === 1 && toastToRender[position][0] === null;
      var props = {
        className: (0, _classnames.default)('Toastify__toast-container', "Toastify__toast-container--" + position, {
          'Toastify__toast-container--rtl': _this5.props.rtl
        }, _this5.parseClassName(className)),
        style: disablePointer ? _extends({}, style, {
          pointerEvents: 'none'
        }) : _extends({}, style)
      };
      return _react.default.createElement(_TransitionGroup.default, _extends({}, props, {
        key: "container-" + position
      }), toastToRender[position]);
    });
  };

  _proto.render = function render() {
    return _react.default.createElement("div", {
      className: "Toastify"
    }, this.renderToast());
  };

  return ToastContainer;
}(_react.Component);

ToastContainer.propTypes = {
  /**
   * Set toast position
   */
  position: _propTypes.default.oneOf((0, _propValidator.objectValues)(_constant.POSITION)),

  /**
   * Disable or set autoClose delay
   */
  autoClose: _propValidator.falseOrDelay,

  /**
   * Disable or set a custom react element for the close button
   */
  closeButton: _propValidator.falseOrElement,

  /**
   * Hide or not progress bar when autoClose is enabled
   */
  hideProgressBar: _propTypes.default.bool,

  /**
   * Pause toast duration on hover
   */
  pauseOnHover: _propTypes.default.bool,

  /**
   * Dismiss toast on click
   */
  closeOnClick: _propTypes.default.bool,

  /**
   * Newest on top
   */
  newestOnTop: _propTypes.default.bool,

  /**
   * An optional className
   */
  className: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),

  /**
   * An optional style
   */
  style: _propTypes.default.object,

  /**
   * An optional className for the toast
   */
  toastClassName: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),

  /**
   * An optional className for the toast body
   */
  bodyClassName: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),

  /**
   * An optional className for the toast progress bar
   */
  progressClassName: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),

  /**
   * An optional style for the toast progress bar
   */
  progressStyle: _propTypes.default.object,

  /**
   * Define enter and exit transition using react-transition-group
   */
  transition: _propTypes.default.func,

  /**
   * Support rtl display
   */
  rtl: _propTypes.default.bool,

  /**
   * Allow toast to be draggable
   */
  draggable: _propTypes.default.bool,

  /**
   * The percentage of the toast's width it takes for a drag to dismiss a toast
   */
  draggablePercent: _propTypes.default.number,

  /**
   * Pause the toast on focus loss
   */
  pauseOnFocusLoss: _propTypes.default.bool
};
ToastContainer.defaultProps = {
  position: _constant.POSITION.TOP_RIGHT,
  transition: _Transitions.Bounce,
  rtl: false,
  autoClose: 5000,
  hideProgressBar: false,
  closeButton: _react.default.createElement(_CloseButton.default, null),
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  closeOnClick: true,
  newestOnTop: false,
  draggable: true,
  draggablePercent: 80,
  className: null,
  style: null,
  toastClassName: null,
  bodyClassName: null,
  progressClassName: null,
  progressStyle: null
};
var _default = ToastContainer;
exports.default = _default;