(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ezplatform-admin-ui-content-type-edit-js"],{

/***/ "./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/field-type/ezspecifications.js":
/*!************************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/field-type/ezspecifications.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function (global, doc) {
  var SELECTOR_FIELD = '.ez-field-edit--ezspecifications';
  var EVENT_VALUE_CHANGED = 'valueChanged';
  var fieldWrappers = doc.querySelectorAll(SELECTOR_FIELD);

  var getOptionsData = function getOptionsData(option) {
    return option.value;
  };

  var getRowData = function getRowData(row) {
    var rowOutput = {
      id: row.dataset.id,
      label: row.querySelector('.ez-field--ezspecifications').value,
      value: row.querySelector('.ez-field--value').value
    };
    var valueSuffix = row.querySelector('.ez-field--value-suffix');

    if (!valueSuffix.hasAttribute('hidden')) {
      rowOutput.selected_option = valueSuffix.value;
      rowOutput.options = _toConsumableArray(valueSuffix.querySelectorAll('option')).map(getOptionsData);
    }

    return rowOutput;
  };

  var saveData = function saveData(groupWrapper) {
    var shouldSave = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (!shouldSave) {
      return;
    }

    var fieldWrapper = groupWrapper.closest(SELECTOR_FIELD);
    var input = fieldWrapper.querySelector('.ez-field-edit--stored-value');
    var output = [];

    _toConsumableArray(fieldWrapper.querySelectorAll('.ez-specifications')).forEach(function (group) {
      var data = _toConsumableArray(group.querySelectorAll('.ez-table tbody tr')).map(getRowData);

      if (data.length === 0) {
        return;
      }

      output.push({
        name: group.dataset.id,
        label: group.querySelector('.ez-card__header .ez-label').innerHTML.trim(),
        data: data
      });
    });

    input.value = JSON.stringify(output);
    input.dispatchEvent(new CustomEvent(EVENT_VALUE_CHANGED));
  };

  var hideWidget = function hideWidget(widget) {
    widget.classList.remove('ez-specifications-selector__list-wrapper--visible');
    doc.removeEventListener('click', hideAddValueWidget, false);
  };

  var hideAddValueWidget = function hideAddValueWidget(event) {
    var widget = doc.querySelector('.ez-specifications-selector__list-wrapper--visible');
    var closestWidget = event.target.closest('.ez-specifications-selector__list-wrapper');

    if (closestWidget && closestWidget.isSameNode(widget)) {
      return;
    }

    hideWidget(widget);
  };

  var showAddValueWidget = function showAddValueWidget(event) {
    var groupWrapper = event.currentTarget.closest('.ez-specifications');

    if (groupWrapper.querySelector('.ez-specifications-selector__list-wrapper--visible')) {
      return;
    }

    var tableWrapper = groupWrapper.querySelector('.ez-table');
    var widget = event.target.closest('.ez-specifications-selector').querySelector('.ez-specifications-selector__list-wrapper');
    var listWrapper = widget.querySelector('.ez-specifications-selector__list');
    var groupId = groupWrapper.dataset.id;
    var predefinedValues = JSON.parse(event.target.closest(SELECTOR_FIELD).dataset["default"]);
    var defaultGroupData = predefinedValues.find(function (_ref) {
      var code = _ref.code;
      return code === groupId;
    });

    var alreadyUsedPredefined = _toConsumableArray(tableWrapper.querySelectorAll('tr[data-id]')).map(function (row) {
      return row.dataset.id;
    });

    if (defaultGroupData.default_values === null || defaultGroupData.default_values.length === alreadyUsedPredefined.length) {
      addRow(tableWrapper);
      return;
    }

    var predefinedList = doc.createDocumentFragment();

    _toConsumableArray(listWrapper.querySelectorAll('.ez-btn--predefined-value')).forEach(function (button) {
      return button.remove();
    });

    defaultGroupData.default_values.forEach(function (predefinedValue) {
      if (alreadyUsedPredefined.includes(predefinedValue.id)) {
        return;
      }

      var predefinedButton = doc.createElement('div');
      predefinedButton.insertAdjacentHTML('beforeend', widget.dataset.template.replace('{{ LABEL }}', predefinedValue.label));
      predefinedButton.querySelector('button').addEventListener('click', function () {
        return addRow(tableWrapper, predefinedValue);
      }, false);
      predefinedList.append(predefinedButton.querySelector('button'));
    });
    listWrapper.append(predefinedList);
    widget.classList.add('ez-specifications-selector__list-wrapper--visible');
    setTimeout(function () {
      doc.addEventListener('click', hideAddValueWidget, false);
    });
  };

  var deleteRow = function deleteRow(event) {
    var groupWrapper = event.currentTarget.closest('.ez-specifications');
    event.currentTarget.closest('tr').remove();
    saveData(groupWrapper);
  };

  var addRow = function addRow(tableWrapper) {
    var groupData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var shouldSave = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var range = doc.createRange();
    var template = tableWrapper.dataset.template;
    var groupWrapper = tableWrapper.closest('.ez-specifications');
    var widget = doc.querySelector('.ez-specifications-selector__list-wrapper--visible');
    range.selectNodeContents(doc.createElement('tbody'));
    var row = range.createContextualFragment(template);
    var specificationInput = row.querySelector('.ez-field--ezspecifications');
    var valueInput = row.querySelector('.ez-field--value');
    var selectWrapper = row.querySelector('.ez-field--value-suffix');

    if (groupData.id) {
      row.querySelector('tr').dataset.id = groupData.id;
    }

    specificationInput.value = groupData.label !== undefined ? groupData.label : '';
    specificationInput.addEventListener('blur', function () {
      return saveData(groupWrapper);
    }, false);
    valueInput.value = groupData.value !== undefined ? groupData.value : '';
    valueInput.addEventListener('blur', function () {
      return saveData(groupWrapper);
    }, false);

    if (groupData.options) {
      groupData.options.forEach(function (optionValue) {
        var option = "<option value=\"".concat(optionValue, "\">").concat(optionValue, "</option>");
        selectWrapper.insertAdjacentHTML('beforeend', option);
      });
      selectWrapper.value = groupData.selected_option;
      selectWrapper.addEventListener('change', function () {
        return saveData(groupWrapper);
      }, false);
    } else {
      row.querySelector('.ez-field--value-suffix').setAttribute('hidden', 'hidden');
    }

    row.querySelector('.ez-btn--delete').addEventListener('click', deleteRow, false);
    tableWrapper.querySelector('tbody').append(row);

    if (widget) {
      hideWidget(widget);
    }

    saveData(groupWrapper, shouldSave);
  };

  var initializeField = function initializeField(fieldWrapper) {
    var defaultData = JSON.parse(fieldWrapper.dataset["default"]);
    var rawSavedData = fieldWrapper.querySelector('.ez-field-edit--stored-value').value;
    var savedData = rawSavedData ? JSON.parse(rawSavedData) : [];
    var groups = fieldWrapper.querySelectorAll('.ez-specifications');
    var data = defaultData.map(function (group) {
      var savedGroup = savedData.find(function (_ref2) {
        var name = _ref2.name;
        return name === group.code;
      });

      if (savedGroup) {
        return _objectSpread(_objectSpread({}, group), {}, {
          default_values: savedGroup.data
        });
      }

      return group;
    });
    groups.forEach(function (group) {
      var defaultGroupData = data.find(function (_ref3) {
        var code = _ref3.code;
        return code === group.dataset.id;
      });
      var tableWrapper = group.querySelector('.ez-table');
      var addButton = group.querySelector('.ez-btn--open-add-value-widget');
      var addCustomButton = group.querySelector('.ez-btn--custom-value');

      if (defaultGroupData.default_values) {
        defaultGroupData.default_values.forEach(function (groupData) {
          return addRow(tableWrapper, groupData, false);
        });
      }

      addCustomButton.addEventListener('click', function () {
        return addRow(tableWrapper);
      }, false);
      addButton.addEventListener('click', showAddValueWidget, false);
    });
  };

  fieldWrappers.forEach(initializeField);
})(window, window.document);

/***/ }),

/***/ "./vendor/ezsystems/ezplatform-admin-ui/src/bundle/Resources/public/js/scripts/admin.card.toggle.group.js":
/*!****************************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezplatform-admin-ui/src/bundle/Resources/public/js/scripts/admin.card.toggle.group.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (global, doc) {
  var togglers = doc.querySelectorAll('.ez-card__body-display-toggler');

  var toggleFieldTypeView = function toggleFieldTypeView(event) {
    event.preventDefault();
    event.currentTarget.closest('.ez-card--toggle-group').classList.toggle('ez-card--collapsed');
  };

  var attachToggleField = function attachToggleField(btn) {
    return btn.addEventListener('click', toggleFieldTypeView);
  };

  togglers.forEach(function (btn) {
    return attachToggleField(btn);
  });
  doc.body.addEventListener('ez-initialize-card-toggle-group', function (event) {
    return attachToggleField(event.detail.button);
  });
})(window, window.document);

/***/ }),

/***/ "./vendor/ezsystems/ezplatform-admin-ui/src/bundle/Resources/public/js/scripts/admin.contenttype.relation.default.location.js":
/*!************************************************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezplatform-admin-ui/src/bundle/Resources/public/js/scripts/admin.contenttype.relation.default.location.js ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function (global, doc, eZ, React, ReactDOM) {
  var btns = doc.querySelectorAll('.btn--udw-relation-default-location');
  var udwContainer = doc.getElementById('react-udw');

  var closeUDW = function closeUDW() {
    return ReactDOM.unmountComponentAtNode(udwContainer);
  };

  var onConfirm = function onConfirm(btn, items) {
    closeUDW();
    var locationId = items[0].id;
    var locationName = items[0].ContentInfo.Content.TranslatedName;
    var objectRelationListSettingsWrapper = btn.closest('.ezobjectrelationlist-settings');
    var objectRelationSettingsWrapper = btn.closest('.ezobjectrelation-settings');

    if (objectRelationListSettingsWrapper) {
      objectRelationListSettingsWrapper.querySelector(btn.dataset.relationRootInputSelector).value = locationId;
      objectRelationListSettingsWrapper.querySelector(btn.dataset.relationSelectedRootNameSelector).innerHTML = locationName;
    } else {
      objectRelationSettingsWrapper.querySelector(btn.dataset.relationRootInputSelector).value = locationId;
      objectRelationSettingsWrapper.querySelector(btn.dataset.relationSelectedRootNameSelector).innerHTML = locationName;
    }
  };

  var onCancel = function onCancel() {
    return closeUDW();
  };

  var openUDW = function openUDW(event) {
    event.preventDefault();
    var config = JSON.parse(event.currentTarget.dataset.udwConfig);
    ReactDOM.render(React.createElement(eZ.modules.UniversalDiscovery, _objectSpread({
      onConfirm: onConfirm.bind(null, event.currentTarget),
      onCancel: onCancel,
      title: event.currentTarget.dataset.universaldiscoveryTitle,
      multiple: false
    }, config)), udwContainer);
  };

  btns.forEach(function (btn) {
    return btn.addEventListener('click', openUDW, false);
  });
})(window, window.document, window.eZ, window.React, window.ReactDOM);

/***/ }),

/***/ "./vendor/ezsystems/ezplatform-admin-ui/src/bundle/Resources/public/js/scripts/admin.contenttype.selection.js":
/*!********************************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezplatform-admin-ui/src/bundle/Resources/public/js/scripts/admin.contenttype.selection.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (global, doc) {
  var SELECTOR_TEMPLATE = '.ezselection-settings-option-value-prototype';
  var SELECTOR_OPTION = '.ezselection-settings-option-value';
  var SELECTOR_OPTIONS_LIST = '.ezselection-settings-option-list';
  var SELECTOR_BTN_REMOVE = '.ezselection-settings-option-remove';
  var SELECTOR_BTN_ADD = '.ezselection-settings-option-add';
  var NUMBER_PLACEHOLDER = /__number__/g;
  doc.querySelectorAll('.ezselection-settings.options').forEach(function (container) {
    var findCheckedOptions = function findCheckedOptions() {
      return container.querySelectorAll('.ezselection-settings-option-checkbox:checked');
    };

    var toggleDisableState = function toggleDisableState() {
      var disabledState = !!findCheckedOptions().length;
      var methodName = disabledState ? 'removeAttribute' : 'setAttribute';
      container.querySelector(SELECTOR_BTN_REMOVE)[methodName]('disabled', disabledState);
    };

    var addOption = function addOption() {
      var template = container.querySelector(SELECTOR_TEMPLATE).innerHTML;
      var optionsList = container.querySelector(SELECTOR_OPTIONS_LIST);
      var nextId = parseInt(optionsList.dataset.nextOptionId, 10);
      optionsList.dataset.nextOptionId = nextId + 1;
      optionsList.insertAdjacentHTML('beforeend', template.replace(NUMBER_PLACEHOLDER, nextId));
    };

    var removeOptions = function removeOptions() {
      findCheckedOptions().forEach(function (element) {
        return element.closest(SELECTOR_OPTION).remove();
      });
      toggleDisableState();
    };

    container.querySelector(SELECTOR_OPTIONS_LIST).addEventListener('click', toggleDisableState, false);
    container.querySelector(SELECTOR_BTN_ADD).addEventListener('click', addOption, false);
    container.querySelector(SELECTOR_BTN_REMOVE).addEventListener('click', removeOptions, false);
  });
})(window, window.document);

/***/ }),

/***/ "./vendor/ezsystems/ezplatform-matrix-fieldtype/src/bundle/Resources/public/js/scripts/admin.contenttype.matrix.js":
/*!*************************************************************************************************************************!*\
  !*** ./vendor/ezsystems/ezplatform-matrix-fieldtype/src/bundle/Resources/public/js/scripts/admin.contenttype.matrix.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function (global, doc) {
  var SELECTOR_SETTINGS_COLUMNS = '.ez-matrix-settings__columns';
  var SELECTOR_COLUMN = '.ez-matrix-settings__column';
  var SELECTOR_COLUMNS_CONTAINER = '.ez-table__body';
  var SELECTOR_COLUMN_CHECKBOX = '.ez-matrix-settings__column-checkbox';
  var SELECTOR_ADD_COLUMN = '.ez-btn--add-column';
  var SELECTOR_REMOVE_COLUMN = '.ez-btn--remove-column';
  var SELECTOR_TEMPLATE = '.ez-matrix-settings__column-template';
  var NUMBER_PLACEHOLDER = /__number__/g;

  if (!doc.querySelector(SELECTOR_SETTINGS_COLUMNS)) {
    return;
  }

  doc.querySelectorAll(SELECTOR_SETTINGS_COLUMNS).forEach(function (container) {
    var getNextIndex = function getNextIndex(parentNode) {
      return parentNode.dataset.nextIndex++;
    };

    var findCheckedColumns = function findCheckedColumns(parentNode) {
      return parentNode.querySelectorAll("".concat(SELECTOR_COLUMN_CHECKBOX, ":checked"));
    };

    var updateDisabledState = function updateDisabledState(parentNode) {
      var isEnabled = findCheckedColumns(parentNode).length > 0;
      var methodName = isEnabled ? 'removeAttribute' : 'setAttribute';
      parentNode.querySelectorAll(SELECTOR_REMOVE_COLUMN).forEach(function (btn) {
        return btn[methodName]('disabled', !isEnabled);
      });
    };

    var addItem = function addItem(event) {
      var settingsNode = event.target.closest(SELECTOR_SETTINGS_COLUMNS);
      var template = settingsNode.querySelector(SELECTOR_TEMPLATE).innerHTML;
      var node = settingsNode.querySelector(SELECTOR_COLUMNS_CONTAINER);
      node.insertAdjacentHTML('beforeend', template.replace(NUMBER_PLACEHOLDER, getNextIndex(node)));
      initColumns(settingsNode);
    };

    var removeItems = function removeItems(event) {
      var settingsNode = event.target.closest(SELECTOR_SETTINGS_COLUMNS);
      findCheckedColumns(settingsNode).forEach(function (btn) {
        return btn.closest(SELECTOR_COLUMN).remove();
      });
      initColumns(settingsNode);
    };

    var checkColumn = function checkColumn(event) {
      var settingsNode = event.target.closest(SELECTOR_SETTINGS_COLUMNS);
      updateDisabledState(settingsNode);
    };

    var initColumns = function initColumns(parentNode) {
      updateDisabledState(parentNode);
      parentNode.querySelectorAll(SELECTOR_COLUMN_CHECKBOX).forEach(function (btn) {
        btn.removeEventListener('click', checkColumn, false);
        btn.addEventListener('click', checkColumn, false);
      });
    };

    container.querySelector(SELECTOR_ADD_COLUMN).addEventListener('click', addItem, false);
    container.querySelector(SELECTOR_REMOVE_COLUMN).addEventListener('click', removeItems, false);
    initColumns(container);
  });
})(window, document);

/***/ }),

/***/ 4:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./vendor/ezsystems/ezplatform-admin-ui/src/bundle/Resources/public/js/scripts/admin.contenttype.selection.js ./vendor/ezsystems/ezplatform-admin-ui/src/bundle/Resources/public/js/scripts/admin.card.toggle.group.js ./vendor/ezsystems/ezplatform-admin-ui/src/bundle/Resources/public/js/scripts/admin.contenttype.relation.default.location.js ./vendor/ezsystems/ezplatform-matrix-fieldtype/src/bundle/Resources/public/js/scripts/admin.contenttype.matrix.js ./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/field-type/ezspecifications.js ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezplatform-admin-ui/src/bundle/Resources/public/js/scripts/admin.contenttype.selection.js */"./vendor/ezsystems/ezplatform-admin-ui/src/bundle/Resources/public/js/scripts/admin.contenttype.selection.js");
__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezplatform-admin-ui/src/bundle/Resources/public/js/scripts/admin.card.toggle.group.js */"./vendor/ezsystems/ezplatform-admin-ui/src/bundle/Resources/public/js/scripts/admin.card.toggle.group.js");
__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezplatform-admin-ui/src/bundle/Resources/public/js/scripts/admin.contenttype.relation.default.location.js */"./vendor/ezsystems/ezplatform-admin-ui/src/bundle/Resources/public/js/scripts/admin.contenttype.relation.default.location.js");
__webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezplatform-matrix-fieldtype/src/bundle/Resources/public/js/scripts/admin.contenttype.matrix.js */"./vendor/ezsystems/ezplatform-matrix-fieldtype/src/bundle/Resources/public/js/scripts/admin.contenttype.matrix.js");
module.exports = __webpack_require__(/*! /home/jenkins/workspace/DXP/Archive_Maker_Commerce/ibexa-commerce/vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/field-type/ezspecifications.js */"./vendor/ezsystems/ezcommerce-admin-ui/src/bundle/Resources/public/js/field-type/ezspecifications.js");


/***/ })

},[[4,"runtime"]]]);