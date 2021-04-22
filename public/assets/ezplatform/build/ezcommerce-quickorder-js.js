(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ezcommerce-quickorder-js"],{

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

/***/ "./vendor/ezsystems/ezcommerce-transaction/src/Siso/Bundle/ShopFrontendBundle/Resources/public/js/quick.order.js":
/*!***********************************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-transaction/src/Siso/Bundle/ShopFrontendBundle/Resources/public/js/quick.order.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (global, doc, ibexa) {
  var accordion = new ibexa.eshop.widgets.Accordion();

  var addLine = function addLine() {
    var linesContainer = doc.querySelector('.ezcommerce-basket__lines');
    var lines = linesContainer.querySelectorAll('.ezcommerce-basket__line');
    var emptyRowTemplate = linesContainer.dataset.emptyRowTemplate;
    var emptyRowTemplateRendered = emptyRowTemplate.replaceAll('{{ name }}', lines.length);
    linesContainer.insertAdjacentHTML('beforeend', emptyRowTemplateRendered);
  };

  var addLines = function addLines() {
    var numberOfLines = parseInt(doc.querySelector('.ezcommerce-quickorder__rows-number-select').value, 10);

    for (var i = 0; i < numberOfLines; i++) {
      addLine();
    }
  };

  var removeLastLine = function removeLastLine() {
    var lastLine = doc.querySelector('.ezcommerce-basket__lines .ezcommerce-basket__line:last-child');

    if (lastLine) {
      lastLine.remove();
    }
  };

  var attachEventListeners = function attachEventListeners() {
    doc.querySelector('.ezcommerce-basket__button--add-line').addEventListener('click', addLine, false);
    doc.querySelector('.ezcommerce-basket__button--remove-line').addEventListener('click', removeLastLine, false);
    doc.querySelector('.ezcommerce-basket__button--add-lines').addEventListener('click', addLines, false);
    doc.querySelector('.ezcommerce-quickorder__csv-file-upload-input').addEventListener('change', addLinesFromCSVFile, false);
    doc.querySelectorAll('.ezcommerce-basket__button--quantity').forEach(function (button) {
      button.addEventListener('click', changeQuantity, false);
    });
  };

  var addLinesFromCSVFile = function addLinesFromCSVFile(event) {
    var fileInput = event.currentTarget;
    var formData = new FormData();
    formData.append('files[]', fileInput.files[0]);
    var request = new Request('/quickorder/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData,
      mode: 'same-origin',
      credentials: 'same-origin'
    });
    fetch(request).then(function (response) {
      return response.json();
    }).then(function (data) {
      doc.querySelector('.ezcommerce-quickorder').innerHTML = data.content;
      attachEventListeners();
      doc.body.dispatchEvent(new CustomEvent('ibexa-reinit-accordion', {
        detail: {
          selectors: ['.ezcommerce-quickorder .ezcommerce-accordion__navigation-label']
        }
      }));
    });
  };

  var changeQuantity = function changeQuantity(event) {
    var button = event.target;
    var actionType = button.dataset.actionType;
    var packingUnit = Number(button.dataset.packingunit);
    var quantityInput = button.closest('.ezcommerce-basket__line-content-item--quantity').querySelector('.ezcommerce-quickorder__form-quantity-input');
    var quantityValue = Number(quantityInput.value);

    if (actionType === 'increment') {
      quantityValue = Math.floor(quantityValue / packingUnit) * packingUnit;
      quantityValue = quantityValue + packingUnit;
    } else {
      var ceil = Math.ceil(quantityValue / packingUnit);
      quantityValue = ceil * packingUnit;
      quantityValue = Math.max(0, quantityValue - packingUnit);
    }

    quantityInput.setAttribute('value', quantityValue);
  };

  attachEventListeners();
  accordion.init('.ezcommerce-accordion--quickorder');
})(window, window.document, window.ibexa);

/***/ }),

/***/ 158:
/*!***********************************************************************************************************************************************************************************************!*\
  !*** multi ./public/bundles/ibexaplatformcommerceshopui/js/core/accordion.js ./vendor/ezsystems/ezcommerce-transaction/src/Siso/Bundle/ShopFrontendBundle/Resources/public/js/quick.order.js ***!
  \***********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/public/bundles/ibexaplatformcommerceshopui/js/core/accordion.js */"./public/bundles/ibexaplatformcommerceshopui/js/core/accordion.js");
module.exports = __webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-transaction/src/Siso/Bundle/ShopFrontendBundle/Resources/public/js/quick.order.js */"./vendor/ezsystems/ezcommerce-transaction/src/Siso/Bundle/ShopFrontendBundle/Resources/public/js/quick.order.js");


/***/ })

},[[158,"runtime"]]]);