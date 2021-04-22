import PredefinedDateSetter from './helpers/predefined.dates.setter.js';

(function(global, doc, eZ, flatpickr, moment) {
    const { convertDateToTimezone, formatShortDateTime } = eZ.helpers.timezone;
    const userTimezone = eZ.adminUiConfig.timezone;
    const dateInputs = doc.querySelectorAll('.ez-date-select');
    const dateStartInput = doc.querySelector('.ez-date-select--start');
    const dateEndInput = doc.querySelector('.ez-date-select--end');
    const predefinedInput = doc.querySelector('select[name="limit"]');
    const predefinedDateSetter = new PredefinedDateSetter(dateStartInput, dateEndInput);
    /*
        This function is required because backend needs to get date in format YYYY-MM-DD, so we set it in hidden field with correct name
    */
    const updateValue = function(dates, ...args) {
        const isDateSelected = !!dates[0];

        if (!isDateSelected) {
            return;
        }

        const selectedDate = dates[0];
        const selectedDateWithUserTimezone = convertDateToTimezone(selectedDate, userTimezone, true);
        const timestamp = Math.floor(selectedDateWithUserTimezone.valueOf() / 1000);

        this.input.closest('.ez-filters__item').querySelector('.ez-date-server').value = moment(timestamp, 'X').format('YYYY-MM-DD');

        if (parseInt(this.input.dataset.jsChanged)) {
            this.input.dataset.jsChanged = 0;
        } else {
            predefinedInput.value = 'custom_range';
        }
    };
    const initFlatpickr = (flatpickrInput) => {
        flatpickr(flatpickrInput, {
            enableTime: false,
            formatDate: (date) => formatShortDateTime(date, null),
            onChange: updateValue,
        });
    };

    const setDates = () => {
        const selectedRange = predefinedInput.value;

        dateEndInput.dataset.jsChanged = 1;
        dateStartInput.dataset.jsChanged = 1;

        predefinedDateSetter.setDates(selectedRange);
    };

    predefinedInput.addEventListener('change', setDates, false);
    dateInputs.forEach(initFlatpickr);
    setDates();
})(window, window.document, window.eZ, window.flatpickr, window.moment);
