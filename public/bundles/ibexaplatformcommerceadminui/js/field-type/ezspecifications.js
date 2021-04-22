(function(global, doc) {
    const SELECTOR_FIELD = '.ez-field-edit--ezspecifications';
    const EVENT_VALUE_CHANGED = 'valueChanged';
    const fieldWrappers = doc.querySelectorAll(SELECTOR_FIELD);
    const getOptionsData = (option) => option.value;
    const getRowData = (row) => {
        const rowOutput = {
            id: row.dataset.id,
            label: row.querySelector('.ez-field--ezspecifications').value,
            value: row.querySelector('.ez-field--value').value,
        };
        const valueSuffix = row.querySelector('.ez-field--value-suffix');

        if (!valueSuffix.hasAttribute('hidden')) {
            rowOutput.selected_option = valueSuffix.value;
            rowOutput.options = [...valueSuffix.querySelectorAll('option')].map(getOptionsData);
        }

        return rowOutput;
    };
    const saveData = (groupWrapper, shouldSave = true) => {
        if (!shouldSave) {
            return;
        }

        const fieldWrapper = groupWrapper.closest(SELECTOR_FIELD);
        const input = fieldWrapper.querySelector('.ez-field-edit--stored-value');
        const output = [];

        [...fieldWrapper.querySelectorAll('.ez-specifications')].forEach((group) => {
            const data = [...group.querySelectorAll('.ez-table tbody tr')].map(getRowData);

            if (data.length === 0) {
                return;
            }

            output.push({
                name: group.dataset.id,
                label: group.querySelector('.ez-card__header .ez-label').innerHTML.trim(),
                data,
            });
        });
        input.value = JSON.stringify(output);
        input.dispatchEvent(new CustomEvent(EVENT_VALUE_CHANGED));
    };
    const hideWidget = (widget) => {
        widget.classList.remove('ez-specifications-selector__list-wrapper--visible');

        doc.removeEventListener('click', hideAddValueWidget, false);
    };
    const hideAddValueWidget = (event) => {
        const widget = doc.querySelector('.ez-specifications-selector__list-wrapper--visible');
        const closestWidget = event.target.closest('.ez-specifications-selector__list-wrapper');

        if (closestWidget && closestWidget.isSameNode(widget)) {
            return;
        }

        hideWidget(widget);
    };
    const showAddValueWidget = (event) => {
        const groupWrapper = event.currentTarget.closest('.ez-specifications');

        if (groupWrapper.querySelector('.ez-specifications-selector__list-wrapper--visible')) {
            return;
        }

        const tableWrapper = groupWrapper.querySelector('.ez-table');
        const widget = event.target.closest('.ez-specifications-selector').querySelector('.ez-specifications-selector__list-wrapper');
        const listWrapper = widget.querySelector('.ez-specifications-selector__list');
        const groupId = groupWrapper.dataset.id;
        const predefinedValues = JSON.parse(event.target.closest(SELECTOR_FIELD).dataset.default);
        const defaultGroupData = predefinedValues.find(({ code }) => code === groupId);
        const alreadyUsedPredefined = [...tableWrapper.querySelectorAll('tr[data-id]')].map((row) => row.dataset.id);

        if (defaultGroupData.default_values === null || defaultGroupData.default_values.length === alreadyUsedPredefined.length) {
            addRow(tableWrapper);

            return;
        }

        const predefinedList = doc.createDocumentFragment();

        [...listWrapper.querySelectorAll('.ez-btn--predefined-value')].forEach((button) => button.remove());

        defaultGroupData.default_values.forEach((predefinedValue) => {
            if (alreadyUsedPredefined.includes(predefinedValue.id)) {
                return;
            }

            const predefinedButton = doc.createElement('div');

            predefinedButton.insertAdjacentHTML('beforeend', widget.dataset.template.replace('{{ LABEL }}', predefinedValue.label));
            predefinedButton.querySelector('button').addEventListener('click', () => addRow(tableWrapper, predefinedValue), false);
            predefinedList.append(predefinedButton.querySelector('button'));
        });

        listWrapper.append(predefinedList);
        widget.classList.add('ez-specifications-selector__list-wrapper--visible');
        setTimeout(() => {
            doc.addEventListener('click', hideAddValueWidget, false);
        });
    };
    const deleteRow = (event) => {
        const groupWrapper = event.currentTarget.closest('.ez-specifications');

        event.currentTarget.closest('tr').remove();

        saveData(groupWrapper);
    };
    const addRow = (tableWrapper, groupData = {}, shouldSave = true) => {
        const range = doc.createRange();
        const { template } = tableWrapper.dataset;
        const groupWrapper = tableWrapper.closest('.ez-specifications');
        const widget = doc.querySelector('.ez-specifications-selector__list-wrapper--visible');

        range.selectNodeContents(doc.createElement('tbody'));

        const row = range.createContextualFragment(template);
        const specificationInput = row.querySelector('.ez-field--ezspecifications');
        const valueInput = row.querySelector('.ez-field--value');
        const selectWrapper = row.querySelector('.ez-field--value-suffix');

        if (groupData.id) {
            row.querySelector('tr').dataset.id = groupData.id;
        }

        specificationInput.value = groupData.label !== undefined ? groupData.label : '';
        specificationInput.addEventListener('blur', () => saveData(groupWrapper), false);

        valueInput.value = groupData.value !== undefined ? groupData.value : '';
        valueInput.addEventListener('blur', () => saveData(groupWrapper), false);

        if (groupData.options) {
            groupData.options.forEach((optionValue) => {
                const option = `<option value="${optionValue}">${optionValue}</option>`;

                selectWrapper.insertAdjacentHTML('beforeend', option);
            });

            selectWrapper.value = groupData.selected_option;
            selectWrapper.addEventListener('change', () => saveData(groupWrapper), false);
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
    const initializeField = (fieldWrapper) => {
        const defaultData = JSON.parse(fieldWrapper.dataset.default);
        const rawSavedData = fieldWrapper.querySelector('.ez-field-edit--stored-value').value;
        const savedData = rawSavedData ? JSON.parse(rawSavedData) : [];
        const groups = fieldWrapper.querySelectorAll('.ez-specifications');

        const data = defaultData.map((group) => {
            const savedGroup = savedData.find(({ name }) => name === group.code);

            if (savedGroup) {
                return {
                    ...group,
                    default_values: savedGroup.data,
                };
            }

            return group;
        });

        groups.forEach((group) => {
            const defaultGroupData = data.find(({ code }) => code === group.dataset.id);
            const tableWrapper = group.querySelector('.ez-table');
            const addButton = group.querySelector('.ez-btn--open-add-value-widget');
            const addCustomButton = group.querySelector('.ez-btn--custom-value');

            if (defaultGroupData.default_values) {
                defaultGroupData.default_values.forEach((groupData) => addRow(tableWrapper, groupData, false));
            }

            addCustomButton.addEventListener('click', () => addRow(tableWrapper), false);
            addButton.addEventListener('click', showAddValueWidget, false);
        });
    };

    fieldWrappers.forEach(initializeField);
})(window, window.document);
