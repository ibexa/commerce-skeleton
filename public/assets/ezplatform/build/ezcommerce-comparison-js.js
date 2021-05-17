(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ezcommerce-comparison-js"],{

/***/ "./public/bundles/ibexaplatformcommerceshopui/js/core/accordion.js":
/*!*************************************************************************!*\
  !*** ./public/bundles/ibexaplatformcommerceshopui/js/core/accordion.js ***!
  \*************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_addConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/addConfig */ "./public/bundles/ibexaplatformcommerceshopui/js/helpers/addConfig.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



(function (global, doc, eZ) {
  var Accordion = /*#__PURE__*/function () {
    function Accordion() {
      _classCallCheck(this, Accordion);
    }

    _createClass(Accordion, [{
      key: "attachEvents",
      value: function attachEvents() {
        var _this = this;

        this.accordionNodes.forEach(function (accordionNode) {
          accordionNode.querySelectorAll('.ezcommerce-accordion__navigation-label').forEach(function (navigation) {
            navigation.addEventListener('click', _this.toggle, false);
          });
        });
      }
    }, {
      key: "toggle",
      value: function toggle(event) {
        event.preventDefault();
        var container = event.currentTarget.closest('.ezcommerce-accordion');
        var targetSelector = event.currentTarget.dataset.targetSelector;
        var actionNode = container.querySelector(targetSelector);
        actionNode.classList.toggle('ezcommerce-accordion__navigation-content--expanded');
      }
    }, {
      key: "init",
      value: function init(accordionSelector) {
        this.accordionNodes = doc.querySelectorAll(accordionSelector);
        this.attachEvents();
      }
    }]);

    return Accordion;
  }();

  Object(_helpers_addConfig__WEBPACK_IMPORTED_MODULE_0__["default"])('eshop.widgets.Accordion', Accordion);
})(window, window.document, window.eZ);

/***/ }),

/***/ "./public/bundles/ibexaplatformcommerceshopui/js/helpers/addConfig.js":
/*!****************************************************************************!*\
  !*** ./public/bundles/ibexaplatformcommerceshopui/js/helpers/addConfig.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (path, value) {
  var keys = path.split('.');
  var lastIndex = keys.length - 1;
  window.ibexa = window.ibexa || {};
  keys.reduce(function (currentObject, key, index) {
    if (index === lastIndex) {
      currentObject[key] = value;
      return;
    }

    if (currentObject[key] === undefined) {
      currentObject[key] = {};
    }

    return currentObject[key];
  }, window.ibexa);
});

/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-transaction/src/Siso/Bundle/ShopFrontendBundle/Resources/public/js/comparison.js":
/*!**********************************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-transaction/src/Siso/Bundle/ShopFrontendBundle/Resources/public/js/comparison.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function (global, doc, eZ) {
  var COMPARISON_ITEM_WIDTH = 310;
  var TOGGLE_CLASSES = ['ezcommerce-comparison__tab-toggler', 'ezcommerce-comparison__delete-list', 'ezcommerce-comparison__tab', 'ezcommerce-comparison__attributes-name', 'ezcommerce-comparison__attributes-value'];

  var toggleTab = function toggleTab(event) {
    event.preventDefault();
    var basketId = event.currentTarget.dataset.basketId;
    TOGGLE_CLASSES.forEach(function (toggleClass) {
      doc.querySelectorAll(".".concat(toggleClass)).forEach(function (node) {
        node.classList.remove("".concat(toggleClass, "--active"));
      });
    });
    TOGGLE_CLASSES.forEach(function (toggleClass) {
      doc.querySelector(".".concat(toggleClass, "--").concat(basketId)).classList.add("".concat(toggleClass, "--active"));
    });
  };

  var paginateItems = function paginateItems(event) {
    var marginLeftAfterAction = 0;
    var tab = event.currentTarget.closest('.ezcommerce-comparison__tab');
    var tabWidth = tab.offsetWidth;
    var direction = event.currentTarget.dataset.direction;
    var basketId = tab.dataset.basketId;
    var itemsContainer = tab.querySelector('.ezcommerce-comparison__items');
    var technicalItemsContainer = doc.querySelector(".ezcommerce-comparison__attributes-value--".concat(basketId));
    var firstItem = tab.querySelector('.ezcommerce-comparison__item:first-child');
    var technicalFirstItem = technicalItemsContainer.querySelector('.ezcommerce-comparison__attributes-values-group:first-child');
    var items = itemsContainer.querySelectorAll('.ezcommerce-comparison__item');

    var _getComputedStyle = getComputedStyle(firstItem),
        marginLeft = _getComputedStyle.marginLeft;

    var parsedMarginLeft = parseInt(marginLeft, 10);

    var itemsWidth = _toConsumableArray(items).reduce(function (sum, item) {
      return sum += item.offsetWidth;
    }, 0);

    var itemsDiffContainerSize = itemsWidth - tabWidth;

    if (direction === 'next') {
      if (Math.abs(parsedMarginLeft) < itemsDiffContainerSize) {
        marginLeftAfterAction = parsedMarginLeft - COMPARISON_ITEM_WIDTH;
      }
    } else {
      if (parsedMarginLeft < 0) {
        marginLeftAfterAction = parsedMarginLeft + COMPARISON_ITEM_WIDTH;
      }
    }

    firstItem.style.marginLeft = "".concat(marginLeftAfterAction, "px");
    technicalFirstItem.style.marginLeft = "".concat(marginLeftAfterAction, "px");
  };

  doc.querySelectorAll('.ezcommerce-comparison__tab-toggler').forEach(function (toggler) {
    toggler.addEventListener('click', toggleTab, false);
  });
  doc.querySelectorAll('.ezcommerce-comparison__icon-button--pagination-button').forEach(function (toggler) {
    toggler.addEventListener('click', paginateItems, false);
  });
  TOGGLE_CLASSES.forEach(function (toggleClass) {
    var toggleNode = doc.querySelector(".".concat(toggleClass));

    if (toggleNode) {
      toggleNode.classList.add("".concat(toggleClass, "--active"));
    }
  });
})(window, window.document, window.eZ);

/***/ }),

/***/ 160:
/*!**********************************************************************************************************************************************************************************************!*\
  !*** multi ./public/bundles/ibexaplatformcommerceshopui/js/core/accordion.js ./vendor/ezsystems/ezcommerce-transaction/src/Siso/Bundle/ShopFrontendBundle/Resources/public/js/comparison.js ***!
  \**********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/public/bundles/ibexaplatformcommerceshopui/js/core/accordion.js */"./public/bundles/ibexaplatformcommerceshopui/js/core/accordion.js");
module.exports = __webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-transaction/src/Siso/Bundle/ShopFrontendBundle/Resources/public/js/comparison.js */"./vendor/ezsystems/ezcommerce-transaction/src/Siso/Bundle/ShopFrontendBundle/Resources/public/js/comparison.js");


/***/ })

},[[160,"runtime"]]]);