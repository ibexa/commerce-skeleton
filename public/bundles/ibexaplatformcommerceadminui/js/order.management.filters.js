(function(global, doc, eZ, flatpickr, moment, React, ReactDOM) {
    const udwContainer = doc.getElementById('react-udw');
    const userButton = doc.querySelector('.ez-btn--udw-select-user');
    const dateInputs = doc.querySelectorAll('.ez-date-select');
    const clearTagBtn = doc.querySelector('#user-breadcrumbs .ez-tag__remove-btn');
    const userInput = doc.querySelector('.ez-filters__input--name');
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const dropdownContainers = doc.querySelectorAll('.ez-custom-dropdown');
    const { convertDateToTimezone, formatShortDateTime } = eZ.helpers.timezone;
    const userTimezone = eZ.adminUiConfig.timezone;
    const closeUDW = () => ReactDOM.unmountComponentAtNode(udwContainer);
    const toggleVisibility = (btn, isLocationSelected) => {
        const contentBreadcrumbsWrapper = doc.getElementById('user-breadcrumbs');

        btn.hidden = isLocationSelected;

        if (contentBreadcrumbsWrapper) {
            contentBreadcrumbsWrapper.hidden = !isLocationSelected;
        }
    };
    const updateBreadcrumbsState = (userId) => {
        const contentBreadcrumbsContainer = doc.getElementById('user-breadcrumbs');
        const contentBreadcrumbs = contentBreadcrumbsContainer.querySelector('.ez-tag__content');

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
    const onConfirm = (btn, items) => {
        closeUDW();

        const { id } = items[0];

        updateBreadcrumbsState(id);
        toggleVisibility(btn, !!id);
    };
    const onCancel = () => closeUDW();
    const openUserUDW = (event) => {
        event.preventDefault();

        const config = JSON.parse(event.currentTarget.dataset.udwConfig);

        ReactDOM.render(
            React.createElement(
                eZ.modules.UniversalDiscovery,
                Object.assign(
                    {
                        onConfirm: onConfirm.bind(null, event.currentTarget),
                        onCancel,
                        title: event.currentTarget.dataset.universalDiscoveryTitle,
                        restInfo: {
                            token,
                            siteaccess,
                        },
                    },
                    config
                )
            ),
            udwContainer
        );
    };
    const clearSelection = (btn) => {
        updateBreadcrumbsState('');
        toggleVisibility(btn, false);
    };
    /*
        This function is required because backend needs to get date in format YYYY-MM-DD, so we set it in hidden field with correct name
    */
    const updateValue = function(dates) {
        const isDateSelected = !!dates[0];

        if (!isDateSelected) {
            return;
        }

        const selectedDate = dates[0];
        const selectedDateWithUserTimezone = convertDateToTimezone(selectedDate, userTimezone, true);
        const timestamp = Math.floor(selectedDateWithUserTimezone.valueOf() / 1000);

        this.input.closest('.ez-filters__item').querySelector('.ez-date-server').value = moment(timestamp, 'X').format('YYYY-MM-DD');
    };
    const initFlatpickr = (flatpickrInput) => {
        flatpickr(flatpickrInput, {
            enableTime: false,
            formatDate: (date) => formatShortDateTime(date, null),
            onChange: updateValue,
        });
    };

    dateInputs.forEach(initFlatpickr);

    if (userButton) {
        userButton.addEventListener('click', openUserUDW, false);
    }

    if (clearTagBtn) {
        clearTagBtn.addEventListener('click', clearSelection.bind(null, userButton), false);
    }

    dropdownContainers.forEach((container) => {
        const dropdown = new eZ.core.CustomDropdown({
            container,
            itemsContainer: container.querySelector('.ez-custom-dropdown__items'),
            sourceInput: container.querySelector('.ez-custom-dropdown__source-input'),
        });

        dropdown.init();
    });
})(window, window.document, window.eZ, window.flatpickr, window.moment, window.React, window.ReactDOM);
