(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ezcommerce-wishlist-js"],{

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

/***/ "./vendor/ezsystems/ezcommerce-transaction/src/Siso/Bundle/ShopFrontendBundle/Resources/public/js/wishlist.js":
/*!********************************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-transaction/src/Siso/Bundle/ShopFrontendBundle/Resources/public/js/wishlist.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (global, doc, eZ, ibexa) {
  var accordion = new ibexa.eshop.widgets.Accordion();

  var updateQuantity = function updateQuantity(event) {
    var currentTarget = event.currentTarget;
    var relatedInputSelector = currentTarget.dataset.relatedInputSelector;
    var hiddenInputNode = doc.querySelector(relatedInputSelector);
    hiddenInputNode.value = currentTarget.value;
  };

  doc.querySelectorAll('.ezcommerce-wishlist__line-quantity-input').forEach(function (input) {
    input.addEventListener('change', updateQuantity, false);
  });
  accordion.init('.ezcommerce-accordion--wishlist');
})(window, window.document, window.eZ, window.ibexa);

/***/ }),

/***/ 157:
/*!********************************************************************************************************************************************************************************************!*\
  !*** multi ./public/bundles/ibexaplatformcommerceshopui/js/core/accordion.js ./vendor/ezsystems/ezcommerce-transaction/src/Siso/Bundle/ShopFrontendBundle/Resources/public/js/wishlist.js ***!
  \********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/public/bundles/ibexaplatformcommerceshopui/js/core/accordion.js */"./public/bundles/ibexaplatformcommerceshopui/js/core/accordion.js");
module.exports = __webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-transaction/src/Siso/Bundle/ShopFrontendBundle/Resources/public/js/wishlist.js */"./vendor/ezsystems/ezcommerce-transaction/src/Siso/Bundle/ShopFrontendBundle/Resources/public/js/wishlist.js");


/***/ })

},[[157,"runtime"]]]);