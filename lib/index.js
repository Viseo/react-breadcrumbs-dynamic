'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Breadcrumbs = exports.BreadcrumbsItem = exports.BreadcrumbsProvider = exports.Item = exports.Dummy = exports.withBreadcrumbsContainer = exports.withBreadcrumbsItem = exports.withBreadcrumbs = exports.breadcrumbsBearingKey = exports.breadcrumbsThroughArea = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = require('ramda');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactThrough = require('react-through');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var breadcrumbsThroughArea = exports.breadcrumbsThroughArea = 'breadcrumbs';
var breadcrumbsBearingKey = exports.breadcrumbsBearingKey = 'to';

var withBreadcrumbs = exports.withBreadcrumbs = (0, _reactThrough.throughInterface)(breadcrumbsThroughArea);
var withBreadcrumbsItem = exports.withBreadcrumbsItem = (0, _reactThrough.throughAgent)(breadcrumbsThroughArea, breadcrumbsBearingKey);
var withBreadcrumbsContainer = exports.withBreadcrumbsContainer = (0, _reactThrough.throughContainer)(breadcrumbsThroughArea);

var Dummy = exports.Dummy = function Dummy() {
  return null;
};
var Item = exports.Item = function Item() {
  return null;
};

var BreadcrumbsProvider = exports.BreadcrumbsProvider = _reactThrough.ThroughProvider;
var BreadcrumbsItem = exports.BreadcrumbsItem = (0, _reactThrough.createAdvAgent)(breadcrumbsThroughArea, breadcrumbsBearingKey);

function prepareProps(props, rename, duplicate, remove) {
  var p = Object.assign({}, props);
  Object.keys(duplicate).forEach(function (k) {
    p[duplicate[k]] = p[k];
  });
  Object.keys(rename).forEach(function (k) {
    p[rename[k]] = p[k];
    delete p[k];
  });
  Object.keys(remove).forEach(function (k) {
    delete p[k];
  });
  return p;
}

var defaultCompare = function defaultCompare(a, b) {
  return a[breadcrumbsBearingKey].length - b[breadcrumbsBearingKey].length;
};

var Breadcrumbs_ = function Breadcrumbs_(_ref) {
  var _ref$breadcrumbsThrou = _ref[breadcrumbsThroughArea],
      data = _ref$breadcrumbsThrou === undefined ? {} : _ref$breadcrumbsThrou,
      _ref$hideIfEmpty = _ref.hideIfEmpty,
      hideIfEmpty = _ref$hideIfEmpty === undefined ? false : _ref$hideIfEmpty,
      _ref$compare = _ref.compare,
      compare = _ref$compare === undefined ? defaultCompare : _ref$compare,
      _ref$container = _ref.container,
      Container = _ref$container === undefined ? 'span' : _ref$container,
      _ref$containerProps = _ref.containerProps,
      containerProps = _ref$containerProps === undefined ? {} : _ref$containerProps,
      _ref$item = _ref.item,
      Item = _ref$item === undefined ? 'a' : _ref$item,
      _ref$finalItem = _ref.finalItem,
      FinalItem = _ref$finalItem === undefined ? Item : _ref$finalItem,
      _ref$finalProps = _ref.finalProps,
      finalProps = _ref$finalProps === undefined ? {} : _ref$finalProps,
      _ref$separator = _ref.separator,
      separator = _ref$separator === undefined ? '/' : _ref$separator,
      _ref$duplicateProps = _ref.duplicateProps,
      duplicate = _ref$duplicateProps === undefined ? {} : _ref$duplicateProps,
      _ref$removeProps = _ref.removeProps,
      remove = _ref$removeProps === undefined ? {} : _ref$removeProps,
      _ref$renameProps = _ref.renameProps,
      rename = _ref$renameProps === undefined ? Item === 'a' ? { to: 'href' } : {} : _ref$renameProps;

  var breadcrumbsData = (0, _ramda.values)(data);

  if (hideIfEmpty && breadcrumbsData.length === 0) {
    return null;
  }

  var separatorElement = _react2.default.createElement(
    'span',
    { className: 'separator' },
    separator
  );

  var sortedBreadcrumbsData = (0, _ramda.sort)(compare, breadcrumbsData);

  var startItems = (0, _ramda.compose)((0, _ramda.ifElse)(_ramda.isEmpty, _ramda.identity, (0, _ramda.append)(separatorElement)), (0, _ramda.intersperse)(separatorElement), (0, _ramda.map)(function (item) {
    return _react2.default.createElement(
      'span',
      { className: 'item' },
      _react2.default.createElement(Item, prepareProps(item, rename, duplicate, remove))
    );
  }), _ramda.init)(sortedBreadcrumbsData);

  var lastData = (0, _ramda.last)(sortedBreadcrumbsData);
  var lastItem = lastData ? _react2.default.createElement(
    'span',
    { /*key={length(startItems)}*/className: 'item item--final' },
    _react2.default.createElement(FinalItem, _extends({}, prepareProps(lastData, rename, duplicate, remove), finalProps))
  ) : null;

  return _react2.default.createElement(
    Container,
    containerProps,
    startItems.map(function (Item, i) {
      return _react2.default.createElement(Item.type, _extends({ key: i }, Item.props));
    }),
    lastItem
  );
};

var Breadcrumbs = exports.Breadcrumbs = withBreadcrumbsContainer(Breadcrumbs_);