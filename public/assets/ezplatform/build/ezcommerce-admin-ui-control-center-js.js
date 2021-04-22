(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ezcommerce-admin-ui-control-center-js"],{

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

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/econtent.info.js":
/*!**********************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/econtent.info.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(function (global, doc, eZ, Routing, $) {
  var INTERVAL = 10000;
  var liveTablesContainer = doc.querySelector('.ez-live-tables');
  var temporaryTablesContainer = doc.querySelector('.ez-temporary-tables');
  var swapWrapper = doc.querySelector('.ez-swap-tables__swap-wrapper');
  var inProgressNode = doc.querySelector('.ez-swap-tables__in-progress');
  var notPossibleNode = doc.querySelector('.ez-swap-tables__not-possible');
  var importActiveNode = doc.querySelector('.ez-swap-tables__import-active');
  var swapTablesButton = doc.querySelector('.ez-swap-tables__btn-swap');
  var backupAlert = doc.querySelector('.ez-alert--backup');
  var backupDirNode = doc.querySelector('.ez-backup__dir');
  var backupOptionsWrapper = doc.querySelector('.ez-backup__options-wrapper');
  var backupInputName = doc.querySelector('.ez-backup__input-name');
  var backupExportButton = doc.querySelector('.ez-btn--export');
  var backupExportStartedNode = doc.querySelector('.ez-backup__export-started');
  var backupImportInProgress = doc.querySelector('.ez-import-backup__import-in-progress');
  var backupImportNoFiles = doc.querySelector('.ez-import-backup__no-files');
  var backupImportOptionsWrapper = doc.querySelector('.ez-import-backup__options-wrapper');
  var backupImportList = doc.querySelector('.ez-import-backup__list');
  var backupImportButton = doc.querySelector('.ez-btn--import');
  var jobsList = doc.querySelector('.ez-table--jobs-list');
  var activeJobsList = doc.querySelector('.ez-table--active-jobs tbody');
  var econtentTypes = doc.querySelector('.ez-econtent-types');
  var showJobModal = doc.querySelector('.ez-modal--show-job');
  var econtentInfo = {};
  var backupData = {};
  var swapInProgress = false;
  var importAllowed = false;

  var startExport = function startExport() {
    var url = Routing.generate('siso_admin_econtent_start_export', {
      name: backupInputName.value
    });
    backupExportStartedNode.classList.remove('ez-backup__export-started--hidden');
    fetch(url, {
      mode: 'same-origin',
      credentials: 'same-origin'
    }).then(eZ.helpers.request.getJsonFromResponse).then(fetchBackupList)["catch"](eZ.helpers.notification.showErrorNotification);
  };

  var startImport = function startImport() {
    var name = doc.querySelector('.ez-import-backup__list input:checked').value;
    var url = Routing.generate('siso_admin_econtent_start_import', {
      name: name
    });
    fetch(url, {
      mode: 'same-origin',
      credentials: 'same-origin'
    }).then(eZ.helpers.request.getJsonFromResponse).then(function () {
      backupImportInProgress.classList.remove('ez-import-backup__import-in-progress--hidden');
      backupImportOptionsWrapper.classList.add('ez-import-backup__options-wrapper--hidden');
    })["catch"](eZ.helpers.notification.showErrorNotification);
  };

  var startJob = function startJob(event) {
    var jobIdentifier = event.currentTarget.dataset.jobIdentifier;
    var url = Routing.generate('siso_admin_start_job', {
      job_id: jobIdentifier
    });
    fetch(url, {
      mode: 'same-origin',
      credentials: 'same-origin'
    }).then(eZ.helpers.request.getJsonFromResponse)["catch"](eZ.helpers.notification.showErrorNotification);
  };

  var removeJob = function removeJob(id) {
    var url = Routing.generate('siso_admin_econtent_remove_job', {
      id: id
    });
    fetch(url, {
      mode: 'same-origin',
      credentials: 'same-origin'
    }).then(eZ.helpers.request.getJsonFromResponse)["catch"](eZ.helpers.notification.showErrorNotification);
  };

  var swapTables = function swapTables() {
    var url = Routing.generate('siso_admin_econtent_swap');
    fetch(url, {
      mode: 'same-origin',
      credentials: 'same-origin'
    }).then(eZ.helpers.request.getStatusFromResponse).then(fetchEcontentInfo)["catch"](eZ.helpers.notification.showErrorNotification);
  };

  var fetchEcontentInfo = function fetchEcontentInfo() {
    var url = Routing.generate('siso_admin_econtent_info');
    fetch(url, {
      mode: 'same-origin',
      credentials: 'same-origin'
    }).then(eZ.helpers.request.getJsonFromResponse).then(setEcontentData)["catch"](eZ.helpers.notification.showErrorNotification);
  };

  var fetchJobs = function fetchJobs() {
    var url = Routing.generate('siso_admin_econtent_job_data');
    fetch(url, {
      mode: 'same-origin',
      credentials: 'same-origin'
    }).then(eZ.helpers.request.getJsonFromResponse).then(setJobsData)["catch"](eZ.helpers.notification.showErrorNotification);
  };

  var fetchBackupList = function fetchBackupList() {
    var url = Routing.generate('siso_admin_econtent_backuplist');
    fetch(url, {
      mode: 'same-origin',
      credentials: 'same-origin'
    }).then(eZ.helpers.request.getJsonFromResponse).then(setBackupListData)["catch"](eZ.helpers.notification.showErrorNotification);
  };

  var renderTablesData = function renderTablesData(types, listContainer, hiddenClass) {
    var template = listContainer.dataset.template;
    var fragment = doc.createDocumentFragment();
    var methodName = !!types.length ? 'remove' : 'add';
    types.forEach(function (type) {
      var renderedItem = template.replace('{{ class_name }}', type.class_name).replace('{{ count }}', type.count);
      var container = doc.createElement('ul');
      container.insertAdjacentHTML('beforeend', renderedItem);
      fragment.append(container.querySelector('li'));
    });
    listContainer.innerHTML = '';
    listContainer.append(fragment);
    listContainer.classList[methodName](hiddenClass);
  };

  var renderBackupItems = function renderBackupItems() {
    var template = backupImportList.dataset.template;
    var fragment = doc.createDocumentFragment();
    backupData.backup.forEach(function (backup) {
      var renderedItem = template.replace(/{{ name }}/g, backup.name).replace('{{ date }}', backup.date).replace('{{ size }}', backup.size);
      var container = doc.createElement('div');
      container.insertAdjacentHTML('beforeend', renderedItem);
      container.querySelector('input').addEventListener('change', engableImportButton, false);
      fragment.append(container.querySelector('label'));
    });
    backupImportList.innerHTML = '';
    backupImportList.append(fragment);

    if (importAllowed) {
      backupImportNoFiles.classList.add('ez-import-backup__no-files--hidden');
      backupImportOptionsWrapper.classList.remove('ez-import-backup__options-wrapper--hidden');
    }
  };

  var renderAddJobs = function renderAddJobs(jobs) {
    var template = jobsList.dataset.template;
    var fragment = doc.createDocumentFragment();
    Object.entries(jobs).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          jobIdentifier = _ref2[0],
          jobData = _ref2[1];

      var renderedItem = template.replace('{{ label }}', jobData.label).replace('{{ desc }}', jobData.desc).replace('{{ job_identifier }}', jobIdentifier);
      var container = doc.createElement('tbody');
      container.insertAdjacentHTML('beforeend', renderedItem);
      container.querySelector('button').addEventListener('click', startJob, false);
      fragment.append(container.querySelector('tr'));
    });
    jobsList.querySelectorAll('.ez-table__job-item').forEach(function (jobItem) {
      return jobItem.remove();
    });

    if (fragment.children.length) {
      jobsList.append(fragment);
    }
  };

  var renderTypes = function renderTypes(types) {
    var template = econtentTypes.dataset.template;
    var fragment = doc.createDocumentFragment();
    Object.entries(types).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          name = _ref4[0],
          values = _ref4[1];

      var renderedItem = template.replace('{{ name }}', name);
      var container = doc.createElement('div');
      container.insertAdjacentHTML('beforeend', renderedItem);
      var tableNode = container.querySelector('table');
      var rowTemplate = tableNode.dataset.template;
      values.forEach(function (attributes) {
        var renderedItem = rowTemplate.replace('{{ attribute_name }}', attributes.attribute_name).replace('{{ attribute_id }}', attributes.attribute_id).replace('{{ ezdatatype }}', attributes.ezdatatype).replace('{{ mapping }}', attributes.mapping ? "$productNode->".concat(attributes.mapping.attribute) : '');
        var container = doc.createElement('tbody');
        container.insertAdjacentHTML('beforeend', renderedItem);
        tableNode.append(container.querySelector('tr'));
      });
      fragment.append(container);
    });
    econtentTypes.innerHTML = '';
    econtentTypes.append(fragment);
  };

  var renderJobs = function renderJobs(jobs) {
    var template = activeJobsList.dataset.template;
    var noContentTemplate = activeJobsList.dataset.templateNoContent;
    var fragment = doc.createDocumentFragment();
    jobs.forEach(function (job) {
      var renderedItem = template.replace('{{ id }}', job.id).replace('{{ command }}', job.command).replace('{{ state }}', job.state).replace('{{ createdAt }}', job.createdAt).replace('{{ runtime }}', job.runtime ? "".concat(job.runtime, "s") : '').replace('{{ queue }}', job.queue);
      var container = doc.createElement('tbody');
      container.insertAdjacentHTML('beforeend', renderedItem);
      container.querySelector('.ez-btn--view').addEventListener('click', showJob.bind(null, job.args, job.output, job.error), false);
      container.querySelector('.ez-btn--remove').addEventListener('click', removeJob.bind(null, job.id), false);
      fragment.append(container.querySelector('tr'));
    });

    if (fragment.children.length) {
      activeJobsList.innerHTML = '';
      activeJobsList.append(fragment);
    } else {
      activeJobsList.innerHTML = noContentTemplate;
    }
  };

  var hideAllSwapTables = function hideAllSwapTables() {
    swapWrapper.classList.add('ez-swap-tables__swap-wrapper--hidden');
    inProgressNode.classList.add('ez-swap-tables__in-progress--hidden');
    notPossibleNode.classList.add('ez-swap-tables__not-possible--hidden');
    importActiveNode.classList.add('ez-swap-tables__import-active--hidden');
  };

  var setEcontentData = function setEcontentData(data) {
    econtentInfo = data;
    renderTablesData(data.productive, liveTablesContainer, 'ez-live-tables--hidden');
    renderTablesData(data.tmp, temporaryTablesContainer, 'ez-temporary-tables--hidden');
    renderTypes(data.types);
  };

  var setJobsData = function setJobsData(data) {
    hideAllSwapTables();
    renderAddJobs(data.addJobs);
    renderJobs(data.jobs);
    importAllowed = data.importAllowed;

    if (!data.importAllowed) {
      importActiveNode.classList.remove('ez-swap-tables__import-active--hidden');
      backupImportInProgress.classList.remove('ez-import-backup__import-in-progress--hidden');
      backupImportNoFiles.classList.add('ez-import-backup__no-files--hidden');
      backupImportOptionsWrapper.classList.add('ez-import-backup__options-wrapper--hidden');
      return;
    }

    backupImportNoFiles.classList.add('ez-import-backup__no-files--hidden');
    backupImportOptionsWrapper.classList.remove('ez-import-backup__options-wrapper--hidden');

    if (econtentInfo.tmp && !econtentInfo.tmp.length) {
      notPossibleNode.classList.remove('ez-swap-tables__not-possible--hidden');
      return;
    }

    if (swapInProgress) {
      inProgressNode.classList.remove('ez-swap-tables__in-progress--hidden');
      return;
    }

    swapWrapper.classList.remove('ez-swap-tables__swap-wrapper--hidden');
  };

  var setBackupListData = function setBackupListData(data) {
    backupData = data;
    backupDirNode.innerText = data.dir;

    if (data.msg !== '') {
      backupAlert.innerText = data.msg;
      backupAlert.classList.remove('ez-alert--hidden');
      return;
    }

    if (!!data.backup.length) {
      renderBackupItems();
    }

    backupOptionsWrapper.classList.remove('ez-backup__options-wrapper--hidden');
  };

  var toggleExportButton = function toggleExportButton(event) {
    var methodName = event.currentTarget.value === '' ? 'setAttribute' : 'removeAttribute';
    backupExportButton[methodName]('disabled', 'disabled');
  };

  var engableImportButton = function engableImportButton() {
    backupImportButton.removeAttribute('disabled');
  };

  var showJob = function showJob(args, output, error) {
    var argsNode = showJobModal.querySelector('.ez-modal__args');
    var outputNode = showJobModal.querySelector('.ez-modal__output-wrapper');
    var errorNode = showJobModal.querySelector('.ez-modal__error-wrapper');
    argsNode.innerHTML = args;
    outputNode.innerHTML = output;
    errorNode.innerHTML = error;
    $(showJobModal).modal('show');
  };

  if (!swapTablesButton) {
    return;
  }

  swapTablesButton.addEventListener('click', swapTables, false);
  backupInputName.addEventListener('keyup', toggleExportButton, false);
  backupExportButton.addEventListener('click', startExport, false);
  backupImportButton.addEventListener('click', startImport, false);
  fetchEcontentInfo();
  fetchJobs();
  fetchBackupList();
  global.setInterval(fetchEcontentInfo, INTERVAL);
  global.setInterval(fetchJobs, INTERVAL);
})(window, window.document, window.eZ, window.Routing, window.jQuery);

/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/email.actions.js":
/*!**********************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/email.actions.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (global, doc, eZ, $) {
  var resendEmailButtons = doc.querySelectorAll('.ez-btn--resend-email');
  var showEmailButtons = doc.querySelectorAll('.ez-btn--show-email');

  var resendEmail = function resendEmail(event) {
    var emailId = event.currentTarget.dataset.emailId;
    var url = Routing.generate('siso_admin_mail_resend_ajax', {
      id: emailId
    });
    fetch(url, {
      mode: 'same-origin',
      credentials: 'same-origin'
    }).then(eZ.helpers.request.getTextFromResponse).then(eZ.helpers.notification.showSuccessNotification)["catch"](eZ.helpers.notification.showErrorNotification);
  };

  var showEmail = function showEmail(emailPreview) {
    var modal = doc.querySelector('.ez-modal--show-email');
    var modalBody = modal.querySelector('iframe');
    modalBody.srcdoc = emailPreview;
    $(modal).modal('show');
  };

  var fetchEmailPreview = function fetchEmailPreview(event) {
    var emailId = event.currentTarget.dataset.emailId;
    var url = Routing.generate('siso_admin_mail_ajax', {
      id: emailId
    });
    fetch(url, {
      mode: 'same-origin',
      credentials: 'same-origin'
    }).then(eZ.helpers.request.getTextFromResponse).then(showEmail)["catch"](eZ.helpers.notification.showErrorNotification);
  };

  resendEmailButtons.forEach(function (resendEmailButton) {
    return resendEmailButton.addEventListener('click', resendEmail, false);
  });
  showEmailButtons.forEach(function (showEmailButton) {
    return showEmailButton.addEventListener('click', fetchEmailPreview, false);
  });
})(window, window.document, window.eZ, window.jQuery);

/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/erp.performance.chart.js":
/*!******************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/erp.performance.chart.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (global, doc) {
  var chart = doc.querySelector('#ez-performance-chart');

  if (!chart) {
    return;
  }

  var _chart$dataset = chart.dataset,
      dateTime = _chart$dataset.dateTime,
      columns = _chart$dataset.columns;
  c3.generate({
    bindto: '#ez-performance-chart',
    data: {
      columns: columns,
      type: 'area-spline',
      labels: false
    },
    point: {
      show: false
    },
    zoom: {
      enabled: true
    },
    subchart: {
      show: true
    },
    axis: {
      x: {
        type: 'category',
        categories: dateTime,
        tick: {
          count: 5
        }
      },
      y: {
        label: 'ms'
      }
    },
    padding: {
      right: 80
    }
  });
})(window, window.document);

/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/erp.show.log.js":
/*!*********************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/erp.show.log.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (global, doc, eZ, $) {
  var showLogButtons = doc.querySelectorAll('.ez-btn--show-erp-log');

  var showLog = function showLog(logPreviewData) {
    var modal = doc.querySelector('.ez-modal--show-log');
    var logTextNode = modal.querySelector('.ez-erp-log__preview--log-text');
    var inputXmlNode = modal.querySelector('.ez-erp-log__preview--input-xml');
    var outputHmlNode = modal.querySelector('.ez-erp-log__preview--output-xml');
    logTextNode.innerText = JSON.stringify(logPreviewData, null, 4);
    inputXmlNode.innerText = JSON.stringify(logPreviewData.input_xml, null, 4);
    outputHmlNode.innerText = JSON.stringify(logPreviewData.output_xml, null, 4);
    logTextNode.closest('.ez-erp-log__item').classList.toggle('ez-erp-log__item--hidden', logPreviewData.input_xml || logPreviewData.output_xml);
    inputXmlNode.closest('.ez-erp-log__item').classList.toggle('ez-erp-log__item--hidden', !logPreviewData.input_xml);
    outputHmlNode.closest('.ez-erp-log__item').classList.toggle('ez-erp-log__item--hidden', !logPreviewData.output_xml);
    $(modal).modal('show');
  };

  var fetchLogPreview = function fetchLogPreview(event) {
    var id = event.currentTarget.dataset.eventId;
    var url = Routing.generate('siso_admin_erp_ajax', {
      id: id
    });
    fetch(url, {
      mode: 'same-origin',
      credentials: 'same-origin'
    }).then(eZ.helpers.request.getJsonFromResponse).then(showLog)["catch"](eZ.helpers.notification.showErrorNotification);
  };

  showLogButtons.forEach(function (showLogButton) {
    return showLogButton.addEventListener('click', fetchLogPreview, false);
  });
})(window, window.document, window.eZ, window.jQuery);

/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/erp.status.js":
/*!*******************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/erp.status.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (global, doc, eZ, Routing) {
  var fetchStatus = function fetchStatus() {
    var token = doc.querySelector('meta[name="CSRF-Token"]').content;
    var siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    var request = new Request('/api/ezp/v2/rest/dashboard-overview', {
      method: 'POST',
      body: JSON.stringify({
        get_overview_data: [{
          type: 'dashboard',
          trends: 0,
          shopId: 'MAIN'
        }]
      }),
      headers: {
        'X-CSRF-Token': token,
        'X-Siteaccess': siteaccess,
        'Content-Type': 'application/vnd.chart.Data+json',
        Accept: 'application/vnd.ez.api.dashboardData+json'
      },
      mode: 'same-origin',
      credentials: 'same-origin'
    });
    fetch(request).then(eZ.helpers.request.getJsonFromResponse).then(function (response) {
      var isConnected = response.data.dashboardData.erpStatus;
      var statusCheckingNode = doc.querySelector('.ez-erp-overview__status-checking');
      var statusFineNode = doc.querySelector('.ez-erp-overview__status-fine');
      var statusNoConnectionNode = doc.querySelector('.ez-erp-overview__status-no-connection');
      statusCheckingNode.classList.add('ez-erp-overview__status-checking--hidden');
      statusFineNode.classList.toggle('ez-erp-overview__status-fine--hidden', !isConnected);
      statusNoConnectionNode.classList.toggle('ez-erp-overview__status-no-connection--hidden', isConnected);
    })["catch"](eZ.helpers.notification.showErrorNotification);
  };

  if (!doc.querySelector('.ez-erp-overview')) {
    return;
  }

  fetchStatus();
})(window, window.document, window.eZ, window.Routing);

/***/ }),

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/search.filters.js":
/*!***********************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/search.filters.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function (global, doc, eZ, $, flatpickr, React, ReactDOM, Translator) {
  var dateBtns = doc.querySelectorAll('.ez-filters__input--date');
  var openUdwButtons = doc.querySelectorAll('.ez-filters__item-udw-button');
  var resetButtons = doc.querySelectorAll('.ez-filters__btn-reset');
  var udwContainer = doc.querySelector('#react-udw');

  var updateInputValue = function updateInputValue(btn, dates) {
    var input = doc.querySelector(btn.dataset.targetSelector);
    var date = dates[0];
    var dateWithUserTimezone = eZ.helpers.timezone.convertDateToTimezone(date, eZ.adminUiConfig.timezone, true);
    var dateTimestamp = Math.floor(dateWithUserTimezone.valueOf() / 1000);
    var formattedDate = moment(dateTimestamp, 'X').format('YYYY-MM-DD');
    input.value = formattedDate;
  };

  var resetUserId = function resetUserId(event) {
    var filterItem = event.target.closest('.ez-filters__item');
    var btn = filterItem.querySelector('.ez-filters__item-udw-button');
    var input = filterItem.querySelector('input');
    var itemDesc = filterItem.querySelector('.ez-filters__item-desc');
    var userIdNode = filterItem.querySelector('.ez-filters__user-id');
    event.currentTarget.classList.remove('ez-filters__item-button--hidden');
    itemDesc.classList.add('ez-filters__item-desc--hidden');
    input.value = '';
    userIdNode.innerHTML = '';
    btn.classList.remove('ez-filters__item-button--hidden');
    itemDesc.classList.add('ez-filters__item-desc--hidden');
  };

  var initFlatPickr = function initFlatPickr(dateBtn) {
    var defaultDate = new Date(dateBtn.value);
    flatpickr(dateBtn, {
      onChange: updateInputValue.bind(null, dateBtn),
      defaultDate: defaultDate
    });
  };

  var closeUDW = function closeUDW() {
    return ReactDOM.unmountComponentAtNode(udwContainer);
  };

  var onConfirm = function onConfirm(btn, items) {
    var filterItem = btn.closest('.ez-filters__item');
    var input = filterItem.querySelector('input');
    var itemDesc = filterItem.querySelector('.ez-filters__item-desc');
    var userIdNode = filterItem.querySelector('.ez-filters__user-id');
    var userId = items[0].ContentInfo.Content._id;
    closeUDW();
    input.value = userId;
    userIdNode.innerHTML = userId;
    btn.classList.add('ez-filters__item-button--hidden');
    itemDesc.classList.remove('ez-filters__item-desc--hidden');
  };

  var onCancel = function onCancel() {
    return closeUDW();
  };

  var openUdw = function openUdw(event) {
    var config = JSON.parse(event.currentTarget.dataset.udwConfig);
    var title = Translator.trans(
    /*@Desc("Select user")*/
    'filters.select_user', {}, 'filters_ui');
    ReactDOM.render(React.createElement(eZ.modules.UniversalDiscovery, _objectSpread({
      onConfirm: onConfirm.bind(null, event.currentTarget),
      onCancel: onCancel,
      title: title
    }, config)), udwContainer);
  };

  dateBtns.forEach(initFlatPickr);
  resetButtons.forEach(function (resetButton) {
    return resetButton.addEventListener('click', resetUserId, false);
  });
  openUdwButtons.forEach(function (openUdwButton) {
    return openUdwButton.addEventListener('click', openUdw, false);
  });
})(window, window.document, window.eZ, window.jQuery, window.flatpickr, window.React, window.ReactDOM, window.Translator);

/***/ }),

/***/ 155:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/search.filters.js ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/email.actions.js ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/econtent.info.js ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/erp.status.js ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/erp.show.log.js ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/erp.performance.chart.js ./public/bundles/ezplatformadminui/js/scripts/admin.location.tab.js ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/search.filters.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/search.filters.js");
__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/email.actions.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/email.actions.js");
__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/econtent.info.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/econtent.info.js");
__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/erp.status.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/erp.status.js");
__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/erp.show.log.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/erp.show.log.js");
__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/erp.performance.chart.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/erp.performance.chart.js");
module.exports = __webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/public/bundles/ezplatformadminui/js/scripts/admin.location.tab.js */"./public/bundles/ezplatformadminui/js/scripts/admin.location.tab.js");


/***/ })

},[[155,"runtime"]]]);