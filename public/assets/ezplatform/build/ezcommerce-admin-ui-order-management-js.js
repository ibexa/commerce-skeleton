(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ezcommerce-admin-ui-order-management-js"],{

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.delete.order.js":
/*!**************************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.delete.order.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (global, doc, eZ) {
  var deleteButtons = doc.querySelectorAll('.ez-btn--trash');

  var deleteOrder = function deleteOrder(event) {
    var token = doc.querySelector('meta[name="CSRF-Token"]').content;
    var siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    var request = new Request("/api/ezp/v2/rest/lostorders/remove-lostorder/".concat(event.currentTarget.dataset.id), {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.ez.api.LostOrdersData+json',
        'Content-Type': 'application/vnd.ez.api.LostOrdersData+json',
        'X-Siteaccess': siteaccess,
        'X-CSRF-Token': token
      },
      mode: 'same-origin',
      credentials: 'same-origin'
    });
    fetch(request).then(eZ.helpers.request.getJsonFromResponse).then(function (response) {
      var data = response.data.messages;
      var showNotification = data.status ? eZ.helpers.notification.showSuccessNotification : eZ.helpers.notification.showErrorNotification;
      Object.values(data.messages).forEach(showNotification);
    })["catch"](eZ.helpers.notification.showErrorNotification);
  };

  deleteButtons.forEach(function (button) {
    return button.addEventListener('click', deleteOrder, false);
  });
})(window, window.document, window.eZ);

/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.export.orders.js":
/*!***************************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.export.orders.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (global, doc) {
  var exportButton = doc.querySelector('.ez-btn--export-orders');
  exportButton.addEventListener('click', function () {
    global.onbeforeunload = function () {
      return null;
    };
  }, false);
})(window, window.document);

/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.filters.js":
/*!*********************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.filters.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (global, doc, eZ, flatpickr, moment, React, ReactDOM) {
  var udwContainer = doc.getElementById('react-udw');
  var userButton = doc.querySelector('.ez-btn--udw-select-user');
  var dateInputs = doc.querySelectorAll('.ez-date-select');
  var clearTagBtn = doc.querySelector('#user-breadcrumbs .ez-tag__remove-btn');
  var userInput = doc.querySelector('.ez-filters__input--name');
  var token = doc.querySelector('meta[name="CSRF-Token"]').content;
  var siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
  var dropdownContainers = doc.querySelectorAll('.ez-custom-dropdown');
  var _eZ$helpers$timezone = eZ.helpers.timezone,
      convertDateToTimezone = _eZ$helpers$timezone.convertDateToTimezone,
      formatShortDateTime = _eZ$helpers$timezone.formatShortDateTime;
  var userTimezone = eZ.adminUiConfig.timezone;

  var closeUDW = function closeUDW() {
    return ReactDOM.unmountComponentAtNode(udwContainer);
  };

  var toggleVisibility = function toggleVisibility(btn, isLocationSelected) {
    var contentBreadcrumbsWrapper = doc.getElementById('user-breadcrumbs');
    btn.hidden = isLocationSelected;

    if (contentBreadcrumbsWrapper) {
      contentBreadcrumbsWrapper.hidden = !isLocationSelected;
    }
  };

  var updateBreadcrumbsState = function updateBreadcrumbsState(userId) {
    var contentBreadcrumbsContainer = doc.getElementById('user-breadcrumbs');
    var contentBreadcrumbs = contentBreadcrumbsContainer.querySelector('.ez-tag__content');
    userInput.value = userId;

    if (!contentBreadcrumbs) {
      return;
    }

    if (!userId) {
      contentBreadcrumbs.innerHTML = '';
      contentBreadcrumbs.hidden = true;
    } else {
      contentBreadcrumbs.innerHTML = userId;
      contentBreadcrumbs.hidden = false;
    }
  };

  var onConfirm = function onConfirm(btn, items) {
    closeUDW();
    var id = items[0].id;
    updateBreadcrumbsState(id);
    toggleVisibility(btn, !!id);
  };

  var onCancel = function onCancel() {
    return closeUDW();
  };

  var openUserUDW = function openUserUDW(event) {
    event.preventDefault();
    var config = JSON.parse(event.currentTarget.dataset.udwConfig);
    ReactDOM.render(React.createElement(eZ.modules.UniversalDiscovery, Object.assign({
      onConfirm: onConfirm.bind(null, event.currentTarget),
      onCancel: onCancel,
      title: event.currentTarget.dataset.universalDiscoveryTitle,
      restInfo: {
        token: token,
        siteaccess: siteaccess
      }
    }, config)), udwContainer);
  };

  var clearSelection = function clearSelection(btn) {
    updateBreadcrumbsState('');
    toggleVisibility(btn, false);
  };
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

  dateInputs.forEach(initFlatpickr);

  if (userButton) {
    userButton.addEventListener('click', openUserUDW, false);
  }

  if (clearTagBtn) {
    clearTagBtn.addEventListener('click', clearSelection.bind(null, userButton), false);
  }

  dropdownContainers.forEach(function (container) {
    var dropdown = new eZ.core.CustomDropdown({
      container: container,
      itemsContainer: container.querySelector('.ez-custom-dropdown__items'),
      sourceInput: container.querySelector('.ez-custom-dropdown__source-input')
    });
    dropdown.init();
  });
})(window, window.document, window.eZ, window.flatpickr, window.moment, window.React, window.ReactDOM);

/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.transfer.order.js":
/*!****************************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.transfer.order.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (global, doc, eZ) {
  var transferButtons = doc.querySelectorAll('.ez-btn--transfer');

  var transferOrder = function transferOrder(event) {
    var token = doc.querySelector('meta[name="CSRF-Token"]').content;
    var siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    var request = new Request("/api/ezp/v2/rest/lostorders/erp-transfer/".concat(event.currentTarget.dataset.id), {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.ez.api.LostOrdersData+json',
        'Content-Type': 'application/vnd.ez.api.LostOrdersData+json',
        'X-Siteaccess': siteaccess,
        'X-CSRF-Token': token
      },
      mode: 'same-origin',
      credentials: 'same-origin'
    });
    fetch(request).then(eZ.helpers.request.getJsonFromResponse).then(function (response) {
      var data = response.data.messages;
      var showNotification = data.status ? eZ.helpers.notification.showSuccessNotification : eZ.helpers.notification.showErrorNotification;
      Object.values(data.messages).forEach(showNotification);
    })["catch"](eZ.helpers.notification.showErrorNotification);
  };

  transferButtons.forEach(function (button) {
    return button.addEventListener('click', transferOrder, false);
  });
})(window, window.document, window.eZ);

/***/ }),

/***/ 158:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.export.orders.js ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.delete.order.js ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.transfer.order.js ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.filters.js ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.export.orders.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.export.orders.js");
__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.delete.order.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.delete.order.js");
__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.transfer.order.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.transfer.order.js");
module.exports = __webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.filters.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/order.management.filters.js");


/***/ })

},[[158,"runtime"]]]);