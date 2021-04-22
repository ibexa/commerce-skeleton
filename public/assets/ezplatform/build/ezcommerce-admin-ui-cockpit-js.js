(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ezcommerce-admin-ui-cockpit-js"],{

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

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.charts.filters.js":
/*!*******************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.charts.filters.js ***!
  \*******************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_predefined_dates_setter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/predefined.dates.setter.js */ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/helpers/predefined.dates.setter.js");


(function (global, doc, eZ, flatpickr, moment) {
  var _eZ$helpers$timezone = eZ.helpers.timezone,
      convertDateToTimezone = _eZ$helpers$timezone.convertDateToTimezone,
      formatShortDateTime = _eZ$helpers$timezone.formatShortDateTime;
  var userTimezone = eZ.adminUiConfig.timezone;
  var dateInputs = doc.querySelectorAll('.ez-date-select');
  var dateStartInput = doc.querySelector('.ez-date-select--start');
  var dateEndInput = doc.querySelector('.ez-date-select--end');
  var predefinedInput = doc.querySelector('select[name="limit"]');
  var predefinedDateSetter = new _helpers_predefined_dates_setter_js__WEBPACK_IMPORTED_MODULE_0__["default"](dateStartInput, dateEndInput);
  /*
      This function is required because backend needs to get date in format YYYY-MM-DD, so we set it in hidden field with correct name
  */

  var updateValue = function updateValue(dates) {
    var isDateSelected = !!dates[0];

    if (!isDateSelected) {
      return;
    }

    var selectedDate = dates[0];
    var selectedDateWithUserTimezone = convertDateToTimezone(selectedDate, userTimezone, true);
    var timestamp = Math.floor(selectedDateWithUserTimezone.valueOf() / 1000);
    this.input.closest('.ez-filters__item').querySelector('.ez-date-server').value = moment(timestamp, 'X').format('YYYY-MM-DD');

    if (parseInt(this.input.dataset.jsChanged)) {
      this.input.dataset.jsChanged = 0;
    } else {
      predefinedInput.value = 'custom_range';
    }
  };

  var initFlatpickr = function initFlatpickr(flatpickrInput) {
    flatpickr(flatpickrInput, {
      enableTime: false,
      formatDate: function formatDate(date) {
        return formatShortDateTime(date, null);
      },
      onChange: updateValue
    });
  };

  var setDates = function setDates() {
    var selectedRange = predefinedInput.value;
    dateEndInput.dataset.jsChanged = 1;
    dateStartInput.dataset.jsChanged = 1;
    predefinedDateSetter.setDates(selectedRange);
  };

  predefinedInput.addEventListener('change', setDates, false);
  dateInputs.forEach(initFlatpickr);
  setDates();
})(window, window.document, window.eZ, window.flatpickr, window.moment);

/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.charts.js":
/*!***********************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.charts.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function (global, doc, eZ, $, c3) {
  var convertDateToTimezone = eZ.helpers.timezone.convertDateToTimezone;
  var userTimezone = eZ.adminUiConfig.timezone;
  var token = doc.querySelector('meta[name="CSRF-Token"]').content;
  var siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
  var shopSelect = doc.querySelector('select[name="shop_id"]');
  var currencySelect = doc.querySelector('select[name="currency"]');
  var dateStartInput = doc.querySelector('.ez-date-select--start');
  var dateEndInput = doc.querySelector('.ez-date-select--end');
  var charts = doc.querySelectorAll('.ez-ecommerce-cockpit-charts');
  var chartsObject = [];

  var showChartsGeneric = function showChartsGeneric(type, chart) {
    var startDateWithUserTimezone = convertDateToTimezone(dateStartInput.closest('.ez-filters__item').querySelector('.ez-date-server').value, userTimezone, true);
    var startDateTimestamp = Math.floor(startDateWithUserTimezone.valueOf() / 1000);
    var startDate = moment(startDateTimestamp, 'X').format('DD-MM-YYYY');
    var endDateWithUserTimezone = convertDateToTimezone(dateEndInput.closest('.ez-filters__item').querySelector('.ez-date-server').value, userTimezone, true);
    var endDateTimestamp = Math.floor(endDateWithUserTimezone.valueOf() / 1000);
    var endDate = moment(endDateTimestamp, 'X').format('DD-MM-YYYY');
    var request = new Request('/api/ezp/v2/rest/dashboard-charts', {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.ez.api.dashboardData+json',
        'Content-Type': 'application/vnd.chart.Data+json',
        'X-Siteaccess': siteaccess,
        'X-CSRF-Token': token
      },
      body: JSON.stringify({
        get_tab_data: [{
          range: [startDate, endDate],
          wrapper: '#main-chart',
          module: type,
          title: type,
          type: 'dashboard',
          trends: 0,
          shopId: shopSelect.value,
          currency: currencySelect.value,
          userId: 'all',
          partyId: 'all'
        }]
      }),
      mode: 'same-origin',
      credentials: 'same-origin'
    });
    fetch(request).then(eZ.helpers.request.getJsonFromResponse).then(function (response) {
      if (response.data.dashboardData.columns) {
        var bindTo = ".".concat(_toConsumableArray(chart.classList).join('.'), " .ez-ecommerce-cockpit-charts__chart");
        chartsObject.push(c3.generate({
          bindto: bindTo,
          data: {
            x: 'Date',
            // the same name should be returned as the first column in the response
            columns: [Object.values(response.data.dashboardData.columns[0]), Object.values(response.data.dashboardData.columns[1])],
            type: 'area'
          },
          axis: {
            x: {
              type: 'timeseries',
              tick: {
                count: 30,
                format: '%Y-%m-%d'
              }
            }
          }
        }));
      }
    })["catch"](eZ.helpers.notification.showErrorNotification);
  };

  var showCharts = function showCharts() {
    if (parseInt(dateStartInput.dataset.omitNextRequest)) {
      dateStartInput.dataset.omitNextRequest = 0;
      return;
    }

    if (!shopSelect.value || !currencySelect.value || !dateStartInput.value || !dateEndInput.value) {
      return;
    }

    charts.forEach(function (chart) {
      showChartsGeneric(chart.dataset.name, chart);
    });
  };

  shopSelect.addEventListener('change', showCharts, false);
  currencySelect.addEventListener('change', showCharts, false);
  dateStartInput.addEventListener('change', showCharts, false);
  dateEndInput.addEventListener('change', showCharts, false);
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
    var resizeChartsAfterShow = event.target.dataset.resizeChartsAfterShow;

    if (resizeChartsAfterShow) {
      chartsObject.forEach(function (chart) {
        chart.resize();
      });
    }
  });
})(window, window.document, window.eZ, window.jQuery, window.c3);

/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.filters.js":
/*!************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.filters.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (global, doc, eZ) {
  var DEFAULT_SHOP_ID = 'MAIN';
  var token = doc.querySelector('meta[name="CSRF-Token"]').content;
  var siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
  var shopSelect = doc.querySelector('select[name="shop_id"]');
  var currencySelect = doc.querySelector('select[name="currency"]');
  var shopDropdownContainer = doc.querySelector('.ez-custom-dropdown--shop');
  var currencyDropdownContainer = doc.querySelector('.ez-custom-dropdown--currency');

  var showShopIds = function showShopIds() {
    var request = new Request('/api/ezp/v2/rest/shop-list', {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.ez.api.ShopList+json',
        'Content-Type': 'application/vnd.ez.api.ShopList+json',
        'X-Siteaccess': siteaccess,
        'X-CSRF-Token': token
      },
      mode: 'same-origin',
      credentials: 'same-origin'
    });
    fetch(request).then(eZ.helpers.request.getJsonFromResponse).then(function (response) {
      var shopList = Object.values(response.ShopList.shopList).length ? Object.values(response.ShopList.shopList).map(function (_ref) {
        var shop = _ref.shop;
        return shop;
      }) : [DEFAULT_SHOP_ID];
      var dropdownItemTemplate = shopDropdownContainer.dataset.itemTemplate;
      var selectedDropdownItemTemplate = shopDropdownContainer.dataset.selectedItemTemplate;
      shopList.forEach(function (shopId, index) {
        var option = doc.createRange().createContextualFragment("\n                        <option value=\"".concat(shopId, "\">").concat(shopId, "</option>\n                    "));
        var dropdownItem = dropdownItemTemplate.replace('{{ item_value }}', shopId).replace('{{ item_selected }}', index === 0 ? 'ez-custom-dropdown__item--selected' : '').replace('{{ item_checked }}', index === 0 ? 'checked' : '').replace('{{ item_label }}', shopId);
        var selectedItem = selectedDropdownItemTemplate.replace('{{ item_value }}', shopId).replace('{{ item_label }}', shopId);

        if (index === 0) {
          shopDropdownContainer.querySelector('.ez-custom-dropdown__selection-info').insertAdjacentHTML('beforeend', selectedItem);
        }

        shopDropdownContainer.querySelector('.ez-custom-dropdown__items').insertAdjacentHTML('beforeend', dropdownItem);
        shopSelect.append(option);
      });
      initDropdown(shopDropdownContainer);
      shopSelect.value = shopList[0];
      shopSelect.dispatchEvent(new Event('change'));
    })["catch"](eZ.helpers.notification.showErrorNotification);
  };

  var showCurrencies = function showCurrencies() {
    var request = new Request('/api/ezp/v2/rest/currency-list', {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.ez.api.CurrencyList+json',
        'Content-Type': 'application/vnd.ez.api.CurrencyList+json',
        'X-Siteaccess': siteaccess,
        'X-CSRF-Token': token
      },
      mode: 'same-origin',
      credentials: 'same-origin'
    });
    fetch(request).then(eZ.helpers.request.getJsonFromResponse).then(function (response) {
      var currencyList = Object.keys(response.CurrencyList.currencyList);
      var dropdownItemTemplate = currencyDropdownContainer.dataset.itemTemplate;
      var selectedDropdownItemTemplate = currencyDropdownContainer.dataset.selectedItemTemplate;
      currencyList.forEach(function (currency, index) {
        var option = doc.createRange().createContextualFragment("\n                        <option value=\"".concat(currency, "\">").concat(currency, "</option>\n                    "));
        var dropdownItem = dropdownItemTemplate.replace('{{ item_value }}', currency).replace('{{ item_selected }}', index === 0 ? 'ez-custom-dropdown__item--selected' : '').replace('{{ item_checked }}', index === 0 ? 'checked' : '').replace('{{ item_label }}', currency);
        var selectedItem = selectedDropdownItemTemplate.replace('{{ item_value }}', currency).replace('{{ item_label }}', currency);

        if (index === 0) {
          currencyDropdownContainer.querySelector('.ez-custom-dropdown__selection-info').insertAdjacentHTML('beforeend', selectedItem);
        }

        currencyDropdownContainer.querySelector('.ez-custom-dropdown__items').insertAdjacentHTML('beforeend', dropdownItem);
        currencySelect.append(option);
      });
      initDropdown(currencyDropdownContainer);
      currencySelect.value = currencyList[0];
      currencySelect.dispatchEvent(new Event('change'));
    })["catch"](eZ.helpers.notification.showErrorNotification);
  };

  var initDropdown = function initDropdown(container) {
    var dropdown = new eZ.core.CustomDropdown({
      container: container,
      itemsContainer: container.querySelector('.ez-custom-dropdown__items'),
      sourceInput: container.querySelector('.ez-custom-dropdown__select')
    });
    dropdown.init();
  };

  showShopIds();
  showCurrencies();
})(window, window.document, window.eZ);

/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.products.and.sales.js":
/*!***********************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.products.and.sales.js ***!
  \***********************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_row_template_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/row.template.helper.js */ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/helpers/row.template.helper.js");


(function (global, doc, eZ) {
  var token = doc.querySelector('meta[name="CSRF-Token"]').content;
  var siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
  var shopSelect = doc.querySelector('select[name="shop_id"]');
  var currencySelect = doc.querySelector('select[name="currency"]');
  var productsAndSalesTables = doc.querySelectorAll('.ez-ecommerce-cockpit-products-and-sales');

  var showProductsAndSalesGeneric = function showProductsAndSalesGeneric(type, table) {
    var rowTemplateGenerator = new _helpers_row_template_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"](type, table.dataset.template);
    var request = new Request('/api/ezp/v2/rest/dashboard-bestseller', {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.ez.api.dashboardData+json',
        'Content-Type': 'application/vnd.chart.Data+json',
        'X-Siteaccess': siteaccess,
        'X-CSRF-Token': token
      },
      body: JSON.stringify({
        get_tab_data: [{
          panel: 'tabs',
          type: type,
          trends: 0,
          shopId: shopSelect.value,
          currency: currencySelect.value,
          userId: 'all'
        }]
      }),
      mode: 'same-origin',
      credentials: 'same-origin'
    });
    rowTemplateGenerator.set;
    fetch(request).then(eZ.helpers.request.getJsonFromResponse).then(function (response) {
      if (response.data.dashboardData.content) {
        var body = table.querySelector('tbody');
        body.textContent = '';
        Object.values(response.data.dashboardData.content.dataTable).forEach(function (row) {
          var range = doc.createRange();
          var rowTemplate = rowTemplateGenerator.getTemplate(row);
          range.selectNodeContents(document.createElement("tbody"));
          var rowWidget = range.createContextualFragment(rowTemplate);
          body.append(rowWidget);
        });
      }
    })["catch"](eZ.helpers.notification.showErrorNotification);
  };

  var showProductsAndSales = function showProductsAndSales() {
    if (!shopSelect.value || !currencySelect.value) {
      return;
    }

    productsAndSalesTables.forEach(function (table) {
      showProductsAndSalesGeneric(table.dataset.name, table);
    });
  };

  shopSelect.addEventListener('change', showProductsAndSales, false);
  currencySelect.addEventListener('change', showProductsAndSales, false);
})(window, window.document, window.eZ);

/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.search.js":
/*!***********************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.search.js ***!
  \***********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_row_template_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/row.template.helper.js */ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/helpers/row.template.helper.js");


(function (global, doc, eZ) {
  var token = doc.querySelector('meta[name="CSRF-Token"]').content;
  var siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
  var shopSelect = doc.querySelector('select[name="shop_id"]');
  var serchTables = doc.querySelectorAll('.ez-ecommerce-cockpit-search');

  var showSearchTermsGeneric = function showSearchTermsGeneric(type, table) {
    var rowTemplateGenerator = new _helpers_row_template_helper_js__WEBPACK_IMPORTED_MODULE_0__["default"](type, table.dataset.template);
    var request = new Request('/api/ezp/v2/rest/dashboard-searchterms', {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.ez.api.dashboardData+json',
        'Content-Type': 'application/vnd.chart.Data+json',
        'X-Siteaccess': siteaccess,
        'X-CSRF-Token': token
      },
      body: JSON.stringify({
        get_tab_data: [{
          tab: type,
          form: '',
          type: 'dashboard',
          trends: 0,
          shopId: shopSelect.value
        }]
      }),
      mode: 'same-origin',
      credentials: 'same-origin'
    });
    fetch(request).then(eZ.helpers.request.getJsonFromResponse).then(function (response) {
      if (response.data.dashboardData.content) {
        var body = table.querySelector('tbody');
        body.textContent = '';
        Object.values(response.data.dashboardData.content.dataTable).forEach(function (row) {
          var range = doc.createRange();
          var rowTemplate = rowTemplateGenerator.getTemplate(row);
          range.selectNodeContents(document.createElement("tbody"));
          var rowWidget = range.createContextualFragment(rowTemplate);
          body.append(rowWidget);
        });
      }
    })["catch"](eZ.helpers.notification.showErrorNotification);
  };

  var showSearchTerms = function showSearchTerms() {
    if (!shopSelect.value) {
      return;
    }

    serchTables.forEach(function (table) {
      showSearchTermsGeneric(table.dataset.name, table);
    });
  };

  shopSelect.addEventListener('change', showSearchTerms, false);
})(window, window.document, window.eZ);

/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.status.js":
/*!***********************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.status.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (global, doc, eZ) {
  var token = doc.querySelector('meta[name="CSRF-Token"]').content;
  var siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
  var shopSelect = doc.querySelector('select[name="shop_id"]');
  var currencySelect = doc.querySelector('select[name="currency"]');
  var chartsObject = [];

  var showHDDUsage = function showHDDUsage(data) {
    chartsObject.push(c3.generate({
      bindto: '.ez-ecommerce-cockpit-status__chart--hdd',
      data: {
        columns: [['data', data.gauge.hdd]],
        type: 'gauge'
      },
      color: {
        pattern: ['#60B044', '#F6C600', '#F97600', '#FF0000'],
        threshold: {
          values: [30, 60, 90, 100]
        }
      },
      size: {
        height: 80
      },
      expand: false
    }));
  };

  var showServerLoad = function showServerLoad(data) {
    chartsObject.push(c3.generate({
      bindto: '.ez-ecommerce-cockpit-status__chart--server',
      data: {
        columns: [['data', data.gauge.load]],
        type: 'gauge'
      },
      color: {
        pattern: ['#60B044', '#F6C600', '#F97600', '#FF0000'],
        threshold: {
          values: [30, 60, 90, 100]
        }
      },
      size: {
        height: 80
      },
      expand: false
    }));
  };

  var showERPStatus = function showERPStatus(data) {
    var statusName = data.erpStatus ? 'success' : 'error';
    doc.querySelector(".ez-ecommerce-cockpit-status__erp-status--".concat(statusName)).classList.remove('ez-ecommerce-cockpit-status__erp-status--hidden');
  };

  var showCartsStats = function showCartsStats(data) {
    var cartsWidget = doc.querySelector('.ez-ecommerce-cockpit-status__box--carts');
    cartsWidget.querySelector('.ez-icon').removeAttribute('hidden');
    cartsWidget.querySelector('.ez-ecommerce-cockpit-status__value').innerHTML = data.activeShoppingCarts;
  };

  var showCustomerStats = function showCustomerStats(data) {
    var customersWidget = doc.querySelector('.ez-ecommerce-cockpit-status__box--customers');
    customersWidget.querySelector('.ez-icon').removeAttribute('hidden');
    customersWidget.querySelector('.ez-ecommerce-cockpit-status__value').innerHTML = data.totalCustomers;
  };

  var showProductStats = function showProductStats(data) {
    var productsWidget = doc.querySelector('.ez-ecommerce-cockpit-status__box--products');
    productsWidget.querySelector('.ez-icon').removeAttribute('hidden');
    productsWidget.querySelector('.ez-ecommerce-cockpit-status__value').innerHTML = data.totalProducts;
  };

  var showSalesStats = function showSalesStats(data) {
    var salesWidget = doc.querySelector('.ez-ecommerce-cockpit-status__box--sales');
    var totalSales = Object.values(data.totalSales).find(function (sales) {
      return sales.currency === currencySelect.value;
    }) || {
      totalSales: 0
    };
    salesWidget.querySelector('.ez-icon').removeAttribute('hidden');
    salesWidget.querySelector('.ez-ecommerce-cockpit-status__value').innerHTML = totalSales.totalSales;
  };

  var showOrdersStats = function showOrdersStats(data) {
    var ordersWidget = doc.querySelector('.ez-ecommerce-cockpit-status__box--orders');
    ordersWidget.querySelector('.ez-icon').removeAttribute('hidden');
    ordersWidget.querySelector('.ez-ecommerce-cockpit-status__value').innerHTML = data.totalOrders;
  };

  var showOverview = function showOverview() {
    if (!shopSelect.value) {
      return;
    }

    var request = new Request('/api/ezp/v2/rest/dashboard-overview', {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.ez.api.dashboardData+json',
        'Content-Type': 'application/vnd.chart.Data+json',
        'X-Siteaccess': siteaccess,
        'X-CSRF-Token': token
      },
      body: JSON.stringify({
        get_overview_data: [{
          type: 'dashboard',
          trends: 0,
          shopId: shopSelect.value
        }]
      }),
      mode: 'same-origin',
      credentials: 'same-origin'
    });
    fetch(request).then(eZ.helpers.request.getJsonFromResponse).then(function (response) {
      var dashboardData = response.data.dashboardData;
      showHDDUsage(dashboardData);
      showServerLoad(dashboardData);
      showERPStatus(dashboardData);
      showCartsStats(dashboardData);
    })["catch"](eZ.helpers.notification.showErrorNotification);
  };

  var showStats = function showStats() {
    if (!shopSelect.value || !currencySelect.value) {
      return;
    }

    var request = new Request("/api/ezp/v2/rest/dashboard-summary/".concat(shopSelect.value, "/").concat(currencySelect.value), {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.ez.api.dashboardData+json',
        'Content-Type': 'application/vnd.ez.api.dashboardData+json',
        'X-Siteaccess': siteaccess,
        'X-CSRF-Token': token
      },
      mode: 'same-origin',
      credentials: 'same-origin'
    });
    fetch(request).then(eZ.helpers.request.getJsonFromResponse).then(function (response) {
      var dashboardData = response.data.dashboardData;
      showCustomerStats(dashboardData);
      showProductStats(dashboardData);
      showSalesStats(dashboardData);
      showOrdersStats(dashboardData);
    })["catch"](eZ.helpers.notification.showErrorNotification);
  };

  shopSelect.addEventListener('change', showOverview, false);
  shopSelect.addEventListener('change', showStats, false);
  currencySelect.addEventListener('change', showStats, false);
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
    var resizeChartsAfterShow = event.target.dataset.resizeChartsAfterShow;

    if (resizeChartsAfterShow) {
      chartsObject.forEach(function (chart) {
        chart.resize();
      });
    }
  });
})(window, window.document, window.eZ);

/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/helpers/predefined.dates.setter.js":
/*!****************************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/helpers/predefined.dates.setter.js ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PredefinedDateSetter; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PredefinedDateSetter = /*#__PURE__*/function () {
  function PredefinedDateSetter(startInput, endInput) {
    _classCallCheck(this, PredefinedDateSetter);

    this.start = startInput;
    this.end = endInput;
    this.methods = {
      this_week: 'thisWeek',
      this_month: 'thisMonth',
      last_7: 'last7',
      last_14: 'last14',
      last_30: 'last30'
    };
  }

  _createClass(PredefinedDateSetter, [{
    key: "thisWeek",
    value: function thisWeek(now) {
      this.end._flatpickr.setDate(now.endOf('week').unix() * 1000, true);

      this.start._flatpickr.setDate(now.startOf('week').unix() * 1000, true);
    }
  }, {
    key: "thisMonth",
    value: function thisMonth(now) {
      this.end._flatpickr.setDate(now.endOf('month').unix() * 1000, true);

      this.start._flatpickr.setDate(now.startOf('month').unix() * 1000, true);
    }
  }, {
    key: "last7",
    value: function last7(now) {
      this.end._flatpickr.setDate(now.unix() * 1000, true);

      this.start._flatpickr.setDate(now.subtract(7, 'days').unix() * 1000, true);
    }
  }, {
    key: "last14",
    value: function last14(now) {
      this.end._flatpickr.setDate(now.unix() * 1000, true);

      this.start._flatpickr.setDate(now.subtract(14, 'days').unix() * 1000, true);
    }
  }, {
    key: "last30",
    value: function last30(now) {
      this.end._flatpickr.setDate(now.unix() * 1000, true);

      this.start._flatpickr.setDate(now.subtract(30, 'days').unix() * 1000, true);
    }
  }, {
    key: "setDates",
    value: function setDates(id) {
      var methodName = this.methods[id];

      if (methodName) {
        var now = moment().startOf('day');
        this.start.dataset.omitNextRequest = 1;
        this[methodName](now);
      }
    }
  }]);

  return PredefinedDateSetter;
}();



/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/helpers/row.template.helper.js":
/*!************************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/helpers/row.template.helper.js ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RowTemplateGenerator; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RowTemplateGenerator = /*#__PURE__*/function () {
  function RowTemplateGenerator(type, template) {
    _classCallCheck(this, RowTemplateGenerator);

    this.type = type;
    this.template = template;
    this.methods = {
      Mostsearch: 'mostSearch',
      lastsearch: 'lastSearch',
      Nohitssearch: 'noHitsSearch',
      dashboard: 'dashboard',
      lastorders: 'lastOrders',
      bestclients: 'bestClients'
    };
  }

  _createClass(RowTemplateGenerator, [{
    key: "mostSearch",
    value: function mostSearch(row) {
      var rowTemplate = this.template;
      rowTemplate = rowTemplate.replace('{{ LOG_MESSAGE }}', window.eZ.helpers.text.escapeHTML(row.logMessage || row[0]));
      rowTemplate = rowTemplate.replace('{{ AMOUNT }}', row.amount || row[1]);
      rowTemplate = rowTemplate.replace('{{ HITS }}', row.hits || row[2]);
      return rowTemplate;
    }
  }, {
    key: "lastSearch",
    value: function lastSearch(row) {
      var rowTemplate = this.template;
      rowTemplate = rowTemplate.replace('{{ TIMESTAMP }}', (row.logTimestamp || row[0]).string);
      rowTemplate = rowTemplate.replace('{{ LOG_MESSAGE }}', window.eZ.helpers.text.escapeHTML(row.logMessage || row[1]));
      rowTemplate = rowTemplate.replace('{{ RESULTS }}', row.results !== undefined ? row.results : row[2]);
      return rowTemplate;
    }
  }, {
    key: "noHitsSearch",
    value: function noHitsSearch(row) {
      var rowTemplate = this.template;
      rowTemplate = rowTemplate.replace('{{ LOG_MESSAGE }}', window.eZ.helpers.text.escapeHTML(row.logMessage || row[0]));
      rowTemplate = rowTemplate.replace('{{ AMOUNT }}', row.amount || row[1]);
      rowTemplate = rowTemplate.replace('{{ HITS }}', row.hits || row[2]);
      return rowTemplate;
    }
  }, {
    key: "dashboard",
    value: function dashboard(row) {
      var rowTemplate = this.template;
      rowTemplate = rowTemplate.replace('{{ SKU }}', window.eZ.helpers.text.escapeHTML(row.sku || row[0]));
      rowTemplate = rowTemplate.replace('{{ COUNT_SKU }}', row.countSku || row[1]);
      rowTemplate = rowTemplate.replace('{{ NAME }}', window.eZ.helpers.text.escapeHTML(row.name || row[2]));
      return rowTemplate;
    }
  }, {
    key: "lastOrders",
    value: function lastOrders(row) {
      var rowTemplate = this.template;
      rowTemplate = rowTemplate.replace('{{ DATE }}', row.date || row[0]);
      rowTemplate = rowTemplate.replace('{{ BUYER }}', window.eZ.helpers.text.escapeHTML(row.buyer || row[1] || ''));
      rowTemplate = rowTemplate.replace('{{ TOTAL }}', row.total || row[2]);
      rowTemplate = rowTemplate.replace('{{ CURRENCY }}', row.currency || row[3]);
      return rowTemplate;
    }
  }, {
    key: "bestClients",
    value: function bestClients(row) {
      var rowTemplate = this.template;
      rowTemplate = rowTemplate.replace('{{ NAME }}', window.eZ.helpers.text.escapeHTML(row.name || row[0] || ''));
      rowTemplate = rowTemplate.replace('{{ AMOUNT }}', row.amount || row[1]);
      rowTemplate = rowTemplate.replace('{{ CURRENCY }}', row.currency || row[2]);
      return rowTemplate;
    }
  }, {
    key: "getTemplate",
    value: function getTemplate(row) {
      var methodName = this.methods[this.type];
      return this[methodName](row);
    }
  }]);

  return RowTemplateGenerator;
}();



/***/ }),

/***/ 157:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./public/bundles/ezplatformadminui/js/scripts/admin.location.tab.js ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.charts.js ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.charts.filters.js ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.filters.js ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.status.js ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.products.and.sales.js ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.search.js ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/public/bundles/ezplatformadminui/js/scripts/admin.location.tab.js */"./public/bundles/ezplatformadminui/js/scripts/admin.location.tab.js");
__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.charts.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.charts.js");
__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.charts.filters.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.charts.filters.js");
__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.filters.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.filters.js");
__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.status.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.status.js");
__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.products.and.sales.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.products.and.sales.js");
module.exports = __webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.search.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/cockpit.search.js");


/***/ })

},[[157,"runtime"]]]);