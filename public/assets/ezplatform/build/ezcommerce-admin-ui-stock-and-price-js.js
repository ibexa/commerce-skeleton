(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ezcommerce-admin-ui-stock-and-price-js"],{

/***/ "./public/bundles/ezplatformadminui/js/scripts/admin.location.tab.js":
/*!***************************************************************************!*\
  !*** ./public/bundles/ezplatformadminui/js/scripts/admin.location.tab.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (global, doc, $) {
  $(".ez-tabs a[href=\"#".concat(global.location.hash.split('#')[1], "\"]")).tab('show'); // Change hash for page-reload

  $('.ez-tabs a').on('shown.bs.tab', function (event) {
    global.location.hash = "".concat(event.target.hash, "#tab");
  });
})(window, window.document, window.jQuery);

/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/helpers/form.data.helper.js":
/*!*********************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/helpers/form.data.helper.js ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var addKeyToFormData = function addKeyToFormData(formData, data, parentKey) {
  if (data && _typeof(data) === 'object') {
    Object.entries(data).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      addKeyToFormData(formData, value, parentKey ? "".concat(parentKey, "[").concat(key, "]") : key);
    });
  } else {
    var value = data === null ? '' : data;
    formData.append(parentKey, value);
  }
};

var getFormDataFromObject = function getFormDataFromObject(object) {
  var formData = new FormData();
  addKeyToFormData(formData, object);
  return formData;
};

/* harmony default export */ __webpack_exports__["default"] = (getFormDataFromObject);

/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/price.sku.search.js":
/*!*************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/price.sku.search.js ***!
  \*************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_form_data_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/form.data.helper.js */ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/helpers/form.data.helper.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



(function (global, doc, eZ) {
  var skuWrapper = doc.querySelector('.ez-sku-search--price');

  if (!skuWrapper) {
    return;
  }

  var searchInput = skuWrapper.querySelector('.ez-sku-search__input');
  var searchButton = skuWrapper.querySelector('.ez-btn--search');
  var searchResults = skuWrapper.querySelector('.ez-sku-search__results');
  var tableWrapper = skuWrapper.querySelector('.ez-price-management');
  var saveButton = skuWrapper.querySelector('.ez-btn--save');
  var enterKeyCode = 13;
  var skuData = {};

  var handleKeyUp = function handleKeyUp(event) {
    var keyCode = event.charCode || event.keyCode || 0;

    if (keyCode === enterKeyCode) {
      search();
    }
  };

  var search = function search(skuCode) {
    var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'EUR';
    var sku = skuCode || searchInput.value;
    var request = new Request(Routing.generate('siso_menu_admin_fetch_prices', {
      shopId: 'MAIN',
      currency: currency
    }), {
      method: 'POST',
      body: Object(_helpers_form_data_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        sku: sku
      }),
      mode: 'same-origin',
      credentials: 'same-origin'
    });
    fetch(request).then(eZ.helpers.request.getJsonFromResponse).then(handleSearchResponse)["catch"](eZ.helpers.notification.showErrorNotification);
  };

  var handleSearchResponse = function handleSearchResponse(response) {
    if (response.result.message !== undefined) {
      var notFoundMessage = Translator.trans(
      /*@Desc("Product not found")*/
      'product.not_found', {}, 'price_stock_ui');
      eZ.helpers.notification.showWarningNotification(notFoundMessage);

      if (searchResults) {
        searchResults.classList.add('ez-sku-search__results--hidden');
      }

      return;
    }

    skuData = response.result;
    tableWrapper.innerHTML = '';

    if (_typeof(skuData.variants) === 'object' && Object.keys(skuData.variants).length > 0) {
      Object.keys(skuData.variants).forEach(renderPriceTable);
    } else {
      renderPriceTable('-');
    }
  };

  var renderPriceTable = function renderPriceTable(variantSku) {
    var tableFragment = doc.createDocumentFragment();
    var currencySelectFragment = doc.createDocumentFragment();
    var tableRowFragment = doc.createDocumentFragment();
    var contentName = variantSku === '-' ? skuData.name : "".concat(skuData.name, "/").concat(variantSku);
    var skuPrices = skuData.prices[variantSku] || [];
    var variantListPrice = skuData.variants[variantSku] !== undefined ? skuData.variants[variantSku].listPrice : skuData.baseprice;
    var tableHeaderText = Translator.trans(
    /*@Desc("Prices for %contentName%, List price %price%")*/
    'price.table.header', {
      contentName: contentName,
      price: "".concat(variantListPrice * skuData.currencyList[skuData.currency], " ").concat(skuData.currency)
    }, 'price_stock_ui');
    var tableTemplate = tableWrapper.dataset.tableTemplate;
    var renderedTableTemplate = tableTemplate.replace('{{ header_text }}', tableHeaderText).replace('{{ variant_sku }}', variantSku);
    var tableWrapperContainer = doc.createElement('div');
    tableWrapperContainer.insertAdjacentHTML('beforeend', renderedTableTemplate);
    var priceTableWrapper = tableWrapperContainer.querySelector('.ez-price-table');
    tableFragment.append(priceTableWrapper);
    skuPrices.forEach(function (price) {
      var container = doc.createElement('tbody');
      var template = tableFragment.querySelector('table').dataset.rowTemplate;
      var sku = skuWrapper.dataset.sku || searchInput.value;
      var renderTemplate = template.replace('{{ sku }}', sku);
      container.insertAdjacentHTML('beforeend', renderTemplate);
      var row = container.querySelector('tr');
      var customerGroupSelect = row.querySelector('.ez-table__customer-group-select');
      var customGroupFragment = createCustomGroupsFragment();
      customerGroupSelect.append(customGroupFragment);
      customerGroupSelect.value = price.customerGroup.groupId;
      row.querySelector('.ez-table__base-price').value = price.basePrice;
      row.querySelector('.ez-table__offer-price').value = price.offerPrice;
      row.querySelector('.btn').addEventListener('click', function (event) {
        event.currentTarget.closest('tr').remove();
      }, false);
      tableRowFragment.append(row);
    });
    Object.keys(skuData.currencyList).forEach(function (currency) {
      var container = doc.createElement('select');
      var option = "<option value=\"".concat(currency, "\">").concat(currency, "</option>");
      container.insertAdjacentHTML('beforeend', option);
      currencySelectFragment.append(container.querySelector('option'));
    });
    var currencySelect = tableFragment.querySelector('.ez-table-header__price-select');
    var addPriceButton = tableFragment.querySelector('.ez-btn--add-price');
    currencySelect.innerHTML = '';
    currencySelect.append(currencySelectFragment);
    currencySelect.value = skuData.currency;
    currencySelect.addEventListener('change', function (event) {
      return search(skuWrapper.dataset.sku, event.target.value);
    }, false);
    addPriceButton.addEventListener('click', function (event) {
      return addPriceRow(event.target.closest('.ez-price-table').querySelector('table'));
    }, false);
    tableFragment.querySelector('tbody').append(tableRowFragment);
    tableWrapper.append(tableFragment);
    saveButton.classList.remove('ez-btn--hidden');

    if (searchResults) {
      searchResults.classList.remove('ez-sku-search__results--hidden');
    }
  };

  var addPriceRow = function addPriceRow(table) {
    var container = doc.createElement('tbody');
    var template = table.dataset.rowTemplate;
    var sku = skuWrapper.dataset.sku || searchInput.value;
    var renderTemplate = template.replace('{{ sku }}', sku);
    var customGroupFragment = createCustomGroupsFragment();
    container.insertAdjacentHTML('beforeend', renderTemplate);
    var row = container.querySelector('tr');
    row.querySelector('.ez-table__customer-group-select').append(customGroupFragment);
    row.querySelector('.btn').addEventListener('click', function (event) {
      event.currentTarget.closest('tr').remove();
    }, false);
    table.querySelector('tbody').append(row);
  };

  var createCustomGroupsFragment = function createCustomGroupsFragment() {
    var customGroupFragment = doc.createDocumentFragment();
    skuData.customerGroups.forEach(function (customerGroup) {
      var container = doc.createElement('select');
      var option = "<option value=\"".concat(customerGroup.groupId, "\">").concat(customerGroup.label, "</option>");
      container.insertAdjacentHTML('beforeend', option);
      customGroupFragment.append(container.querySelector('option'));
    });
    return customGroupFragment;
  };

  var save = function save() {
    var tables = tableWrapper.querySelectorAll('.ez-price-table');
    tables.forEach(function (table) {
      var variantSku = table.dataset.sku;

      var tableRows = _toConsumableArray(table.querySelectorAll('tbody tr'));

      var prices = tableRows.map(function (tableRow) {
        var groupId = tableRow.querySelector('.ez-table__customer-group-select').value;
        var groupLabel = skuData.customerGroups.find(function (group) {
          return groupId === group.groupId;
        }).label;
        return {
          currency: skuData.currency,
          shopId: 'MAIN',
          sku: skuData.sku,
          variantCode: variantSku,
          basePrice: parseFloat(tableRow.querySelector('.ez-table__base-price').value),
          offerPrice: parseFloat(tableRow.querySelector('.ez-table__offer-price').value),
          groupId: groupId,
          customerGroup: {
            groupId: groupId,
            label: groupLabel
          }
        };
      });
      skuData.prices[variantSku] = prices;
    });
    var request = new Request(Routing.generate('siso_menu_admin_update_prices'), {
      method: 'POST',
      body: Object(_helpers_form_data_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        prices: skuData
      }),
      mode: 'same-origin',
      credentials: 'same-origin'
    });
    fetch(request).then(eZ.helpers.request.getJsonFromResponse).then(function (response) {
      if (response.message !== '') {
        var notSavedMessage = Translator.trans(
        /*@Desc("Couldn't save the prices")*/
        'price.not_saved', {}, 'price_stock_ui');
        eZ.helpers.notification.showErrorNotification(notSavedMessage);
      } else {
        var savedMessage = Translator.trans(
        /*@Desc("Prices saved successfully")*/
        'price.saved', {}, 'price_stock_ui');
        eZ.helpers.notification.showSuccessNotification(savedMessage);
      }
    })["catch"](eZ.helpers.notification.showErrorNotification);
  };

  if (searchInput) {
    searchInput.addEventListener('keyup', handleKeyUp, false);
  }

  if (searchButton) {
    searchButton.addEventListener('click', function () {
      return search();
    }, false);
  }

  if (skuWrapper.dataset.sku) {
    search(skuWrapper.dataset.sku);
  }

  saveButton.addEventListener('click', save, false);
})(window, window.document, window.eZ);

/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/shipping.cost.js":
/*!**********************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/shipping.cost.js ***!
  \**********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_form_data_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/form.data.helper.js */ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/helpers/form.data.helper.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



(function (global, doc, eZ) {
  var addButton = doc.querySelector('.ez-shipping-management .ez-btn--add-shipping');
  var saveButton = doc.querySelector('.ez-shipping-management .ez-btn--save');
  var table = doc.querySelector('.ez-table--shipping-management');
  var shippingCostsList = [];
  var shippingMethods = [];
  var newRowNumber = 0;

  var fetchShippingCosts = function fetchShippingCosts() {
    var url = Routing.generate('siso_menu_admin_fetch_shipping_costs');
    fetch(url, {
      mode: 'same-origin',
      credentials: 'same-origin'
    }).then(eZ.helpers.request.getJsonFromResponse).then(renderShippingCosts)["catch"](eZ.helpers.notification.showErrorNotification);
  };

  var renderShippingCosts = function renderShippingCosts(response) {
    shippingCostsList = response.shippingCostsList;
    shippingMethods = response.shippingMethods;
    shippingCostsList.forEach(addRow);
  };

  var selectCustomDropdownItem = function selectCustomDropdownItem(value, container) {
    container.querySelector(".ez-custom-dropdown__item[data-value=\"".concat(value, "\"]")).classList.add('ez-custom-dropdown__item--selected');
    container.querySelector('.ez-custom-dropdown__item--selected input').checked = true;
  };

  var addRow = function addRow(shippingCosts) {
    var container = doc.createElement('tbody');
    var template = table.dataset.rowTemplate.replaceAll('{{ name }}', shippingCosts ? shippingCosts.id : "shipping-costs-".concat(newRowNumber));
    container.insertAdjacentHTML('beforeend', template);
    var row = container.querySelector('tr');
    var countrySelect = row.querySelector('.ez-table__country-select');
    var stateInput = row.querySelector('.ez-table__state-input');
    var zipInput = row.querySelector('.ez-table__zip-input');
    var shippingMethodsSelect = row.querySelector('.ez-table__shipping-method');
    var shippingCostInput = row.querySelector('.ez-table__shipping-cost');
    var valueInput = row.querySelector('.ez-table__value');
    var currencyInput = row.querySelector('.ez-table__currency');
    var shippingMethodsFragment = doc.createDocumentFragment();
    var countrySelectedDropdown = countrySelect.closest('.ez-custom-dropdown');
    var shippingMethodsDropdown = shippingMethodsSelect.closest('.ez-custom-dropdown');
    shippingMethods.forEach(function (shippingMethod) {
      var container = doc.createElement('select');
      var option = "<option value=\"".concat(shippingMethod.value, "\">").concat(shippingMethod.label, "</option>");
      var dropdownItemsContainer = shippingMethodsDropdown.querySelector('.ez-custom-dropdown__items');
      var dropdownItem = shippingMethodsDropdown.dataset.itemTemplate.replace('{{ item_value }}', shippingMethod.value).replace('{{ item_label }}', shippingMethod.label).replace('{{ name }}', shippingMethod.id || "shipping-method-".concat(newRowNumber));
      container.insertAdjacentHTML('beforeend', option);
      shippingMethodsFragment.append(container.querySelector('option'));
      dropdownItemsContainer.insertAdjacentHTML('beforeend', dropdownItem);
    });
    shippingMethodsSelect.append(shippingMethodsFragment);
    row.querySelectorAll('.ez-custom-dropdown').forEach(function (node) {
      var dropdown = new eZ.core.CustomDropdown({
        container: node,
        itemsContainer: node.querySelector('.ez-custom-dropdown__items'),
        sourceInput: node.querySelector('.ez-custom-dropdown__source-input')
      });
      dropdown.init();
    });

    if (shippingCosts) {
      var selectedItemContainer = countrySelectedDropdown.querySelector('.ez-custom-dropdown__selection-info');
      var selectedItem = countrySelectedDropdown.dataset.selectedItemTemplate.replace('{{ item_value }}', shippingCosts.country.value).replace('{{ item_label }}', shippingCosts.country.value);
      countrySelect.value = shippingCosts.country.value;
      selectedItemContainer.insertAdjacentHTML('beforeend', selectedItem);
      selectCustomDropdownItem(shippingCosts.country.value, countrySelectedDropdown);
    }

    stateInput.value = shippingCosts ? shippingCosts.state : '';
    zipInput.value = shippingCosts ? shippingCosts.zip : '';

    if (shippingCosts) {
      var _selectedItemContainer = shippingMethodsDropdown.querySelector('.ez-custom-dropdown__selection-info');

      var _selectedItem = shippingMethodsDropdown.dataset.selectedItemTemplate.replace('{{ item_value }}', shippingCosts.shippingMethod.label).replace('{{ item_label }}', shippingCosts.shippingMethod.value);

      shippingMethodsSelect.value = shippingCosts.shippingMethod.value;

      _selectedItemContainer.insertAdjacentHTML('beforeend', _selectedItem);

      selectCustomDropdownItem(shippingCosts.shippingMethod.value, shippingMethodsDropdown);
    }

    shippingCostInput.value = shippingCosts ? shippingCosts.shippingCost : 0;
    valueInput.value = shippingCosts ? shippingCosts.valueOfGoods : 0;
    currencyInput.value = shippingCosts ? shippingCosts.currency : '';
    row.querySelector('.btn').addEventListener('click', function (event) {
      event.currentTarget.closest('tr').remove();
    }, false);
    table.querySelector('tbody').append(row);
    newRowNumber++;
  };

  var save = function save() {
    var tableRows = _toConsumableArray(table.querySelectorAll('tbody tr'));

    var shippingCostsList = tableRows.map(function (tableRow) {
      var countrySelect = tableRow.querySelector('.ez-table__country-select');
      var stateInput = tableRow.querySelector('.ez-table__state-input');
      var zipInput = tableRow.querySelector('.ez-table__zip-input');
      var shippingMethodsSelect = tableRow.querySelector('.ez-table__shipping-method');
      var shippingCostInput = tableRow.querySelector('.ez-table__shipping-cost');
      var valueInput = tableRow.querySelector('.ez-table__value');
      var currencyInput = tableRow.querySelector('.ez-table__currency');
      var countryValue = countrySelect.value;
      var countryLabel = countrySelect.querySelector("[value=".concat(countryValue, "]")).innerHTML;
      var shippingMethodValue = shippingMethodsSelect.value;
      var shippingMethodLabel = shippingMethods.find(function (shippingMethod) {
        return shippingMethodValue === shippingMethod.value;
      }).label;
      return {
        country: {
          value: countryValue,
          label: countryLabel
        },
        state: stateInput.value,
        zip: zipInput.value,
        shippingMethod: {
          value: shippingMethodValue,
          label: shippingMethodLabel
        },
        shippingCost: shippingCostInput.value,
        valueOfGoods: valueInput.value,
        currency: currencyInput.value,
        shopId: {
          value: 'MAIN',
          label: 'MAIN'
        }
      };
    });
    var request = new Request(Routing.generate('siso_menu_admin_update_shipping_costs'), {
      method: 'POST',
      body: Object(_helpers_form_data_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        shippingCostsList: shippingCostsList
      }),
      mode: 'same-origin',
      credentials: 'same-origin'
    });
    fetch(request).then(eZ.helpers.request.getJsonFromResponse).then(function (response) {
      if (!response.success) {
        var notSavedMessage = Translator.trans(
        /*@Desc("Couldn't save shipping costs")*/
        'shipping_management.not_saved', {}, 'price_stock_ui');
        eZ.helpers.notification.showErrorNotification(notSavedMessage);
      } else {
        var savedMessage = Translator.trans(
        /*@Desc("Shipping costs saved successfully")*/
        'shipping_management.saved', {}, 'price_stock_ui');
        eZ.helpers.notification.showSuccessNotification(savedMessage);
      }
    })["catch"](eZ.helpers.notification.showErrorNotification);
  };

  fetchShippingCosts();
  addButton.addEventListener('click', function () {
    return addRow();
  }, false);
  saveButton.addEventListener('click', save, false);
})(window, window.document, window.eZ);

/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/stock.sku.search.js":
/*!*************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/stock.sku.search.js ***!
  \*************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_form_data_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/form.data.helper.js */ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/helpers/form.data.helper.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



(function (global, doc, eZ) {
  var skuWrapper = doc.querySelector('.ez-sku-search--stock');

  if (!skuWrapper) {
    return;
  }

  var searchInput = skuWrapper.querySelector('.ez-sku-search__input');
  var searchButton = skuWrapper.querySelector('.ez-btn--search');
  var searchResults = skuWrapper.querySelector('.ez-sku-search__results');
  var saveButton = skuWrapper.querySelector('.ez-btn--save');
  var skuUpdateWrapper = skuWrapper.querySelector('.ez-stock-management');
  var enterKeyCode = 13;
  var skuData = {};

  var handleKeyUp = function handleKeyUp(event) {
    var keyCode = event.charCode || event.keyCode || 0;

    if (keyCode === enterKeyCode) {
      search();
    }
  };

  var search = function search(skuCode) {
    var sku = skuCode || searchInput.value;
    var request = new Request(Routing.generate('siso_menu_admin_fetch_stock', {
      shopId: 'MAIN'
    }), {
      method: 'POST',
      body: Object(_helpers_form_data_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        sku: sku
      }),
      mode: 'same-origin',
      credentials: 'same-origin'
    });
    fetch(request).then(eZ.helpers.request.getJsonFromResponse).then(handleSearchResponse)["catch"](eZ.helpers.notification.showErrorNotification);
  };

  var handleSearchResponse = function handleSearchResponse(response) {
    if (response.result && response.result.message !== undefined) {
      var notFoundMessage = Translator.trans(
      /*@Desc("Product not found")*/
      'product.not_found', {}, 'price_stock_ui');
      eZ.helpers.notification.showWarningNotification(notFoundMessage);

      if (searchResults) {
        searchResults.classList.add('ez-sku-search__results--hidden');
      }

      return;
    }

    skuData = response;
    skuUpdateWrapper.innerHTML = '';
    Object.entries(skuData.stock).forEach(renderSkuUpdate);
  };

  var renderSkuUpdate = function renderSkuUpdate(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        variantSku = _ref2[0],
        stockData = _ref2[1];

    var skuUpdateFragment = doc.createDocumentFragment();
    var skuUpdateContainer = doc.createElement('div');
    var template = skuUpdateWrapper.dataset.template;
    var renderedTemplate = template.replace('{{ sku }}', variantSku).replace('{{ variant_sku }}', variantSku);
    skuUpdateContainer.insertAdjacentHTML('beforeend', renderedTemplate);
    var stockUpdateWrapper = skuUpdateContainer.querySelector('.ez-stock-update');
    var onStockInput = stockUpdateWrapper.querySelector('.ez-stock-update__input--on-stock');
    var stockTextInput = stockUpdateWrapper.querySelector('.ez-stock-update__input--stock-text');
    onStockInput.value = stockData ? stockData.stock : '';
    stockTextInput.value = stockData ? stockData.stockSign : '';
    skuUpdateFragment.append(stockUpdateWrapper);
    skuUpdateWrapper.append(skuUpdateFragment);
    saveButton.classList.remove('ez-btn--hidden');

    if (searchResults) {
      searchResults.classList.remove('ez-sku-search__results--hidden');
    }
  };

  var save = function save() {
    var stockUpdateNodes = skuUpdateWrapper.querySelectorAll('.ez-stock-update');
    stockUpdateNodes.forEach(function (stockUpdateNode) {
      var variantSku = stockUpdateNode.dataset.sku;
      var onStockInput = stockUpdateNode.querySelector('.ez-stock-update__input--on-stock');
      var stockTextInput = stockUpdateNode.querySelector('.ez-stock-update__input--stock-text');
      skuData.stock[variantSku].stock = onStockInput.value;
      skuData.stock[variantSku].stockSign = stockTextInput.value;
    });
    var request = new Request(Routing.generate('siso_menu_admin_update_stock'), {
      method: 'POST',
      body: Object(_helpers_form_data_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
        stock: skuData
      }),
      mode: 'same-origin',
      credentials: 'same-origin'
    });
    fetch(request).then(eZ.helpers.request.getJsonFromResponse).then(function (response) {
      if (response.message !== undefined) {
        var notSavedMessage = Translator.trans(
        /*@Desc("Couldn't save stock")*/
        'stock.not_saved', {}, 'price_stock_ui');
        eZ.helpers.notification.showErrorNotification(notSavedMessage);
      } else {
        var savedMessage = Translator.trans(
        /*@Desc("Stock saved successfully")*/
        'stock.saved', {}, 'price_stock_ui');
        eZ.helpers.notification.showSuccessNotification(savedMessage);
      }
    })["catch"](eZ.helpers.notification.showErrorNotification);
  };

  if (searchInput) {
    searchInput.addEventListener('keyup', handleKeyUp, false);
  }

  if (searchButton) {
    searchButton.addEventListener('click', function () {
      return search();
    }, false);
  }

  if (skuWrapper.dataset.sku) {
    search(skuWrapper.dataset.sku);
  }

  saveButton.addEventListener('click', save, false);
})(window, window.document, window.eZ);

/***/ }),

/***/ 156:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/price.sku.search.js ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/stock.sku.search.js ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/shipping.cost.js ./public/bundles/ezplatformadminui/js/scripts/admin.location.tab.js ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/price.sku.search.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/price.sku.search.js");
__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/stock.sku.search.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/stock.sku.search.js");
__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/shipping.cost.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/shipping.cost.js");
module.exports = __webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/public/bundles/ezplatformadminui/js/scripts/admin.location.tab.js */"./public/bundles/ezplatformadminui/js/scripts/admin.location.tab.js");


/***/ })

},[[156,"runtime"]]]);