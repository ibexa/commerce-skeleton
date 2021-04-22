export default class PredefinedDateSetter {
    constructor(startInput, endInput) {
        this.start = startInput;
        this.end = endInput;
        this.methods = {
            this_week: 'thisWeek',
            this_month: 'thisMonth',
            last_7: 'last7',
            last_14: 'last14',
            last_30: 'last30',
        };
    }

    thisWeek(now) {
        this.end._flatpickr.setDate(now.endOf('week').unix() * 1000, true);
        this.start._flatpickr.setDate(now.startOf('week').unix() * 1000, true);
    }

    thisMonth(now) {
        this.end._flatpickr.setDate(now.endOf('month').unix() * 1000, true);
        this.start._flatpickr.setDate(now.startOf('month').unix() * 1000, true);
    }

    last7(now) {
        this.end._flatpickr.setDate(now.unix() * 1000, true);
        this.start._flatpickr.setDate(now.subtract(7, 'days').unix() * 1000, true);
    }

    last14(now) {
        this.end._flatpickr.setDate(now.unix() * 1000, true);
        this.start._flatpickr.setDate(now.subtract(14, 'days').unix() * 1000, true);
    }

    last30(now) {
        this.end._flatpickr.setDate(now.unix() * 1000, true);
        this.start._flatpickr.setDate(now.subtract(30, 'days').unix() * 1000, true);
    }

    setDates(id) {
        const methodName = this.methods[id];

        if (methodName) {
            const now = moment().startOf('day');

            this.start.dataset.omitNextRequest = 1;

            this[methodName](now);
        }
    }
}
