(function(global, doc, eZ, $, c3) {
    const { convertDateToTimezone } = eZ.helpers.timezone;
    const userTimezone = eZ.adminUiConfig.timezone;
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const shopSelect = doc.querySelector('select[name="shop_id"]');
    const currencySelect = doc.querySelector('select[name="currency"]');
    const dateStartInput = doc.querySelector('.ez-date-select--start');
    const dateEndInput = doc.querySelector('.ez-date-select--end');
    const charts = doc.querySelectorAll('.ez-ecommerce-cockpit-charts');
    const chartsObject = [];
    const showChartsGeneric = (type, chart) => {
        const startDateWithUserTimezone = convertDateToTimezone(
            dateStartInput.closest('.ez-filters__item').querySelector('.ez-date-server').value,
            userTimezone,
            true
        );
        const startDateTimestamp = Math.floor(startDateWithUserTimezone.valueOf() / 1000);
        const startDate = moment(startDateTimestamp, 'X').format('DD-MM-YYYY');
        const endDateWithUserTimezone = convertDateToTimezone(
            dateEndInput.closest('.ez-filters__item').querySelector('.ez-date-server').value,
            userTimezone,
            true
        );
        const endDateTimestamp = Math.floor(endDateWithUserTimezone.valueOf() / 1000);
        const endDate = moment(endDateTimestamp, 'X').format('DD-MM-YYYY');
        const request = new Request('/api/ezp/v2/rest/dashboard-charts', {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.ez.api.dashboardData+json',
                'Content-Type': 'application/vnd.chart.Data+json',
                'X-Siteaccess': siteaccess,
                'X-CSRF-Token': token,
            },
            body: JSON.stringify({
                get_tab_data: [
                    {
                        range: [startDate, endDate],
                        wrapper: '#main-chart',
                        module: type,
                        title: type,
                        type: 'dashboard',
                        trends: 0,
                        shopId: shopSelect.value,
                        currency: currencySelect.value,
                        userId: 'all',
                        partyId: 'all',
                    },
                ],
            }),
            mode: 'same-origin',
            credentials: 'same-origin',
        });

        fetch(request)
            .then(eZ.helpers.request.getJsonFromResponse)
            .then((response) => {
                if (response.data.dashboardData.columns) {
                    const bindTo = `.${[...chart.classList].join('.')} .ez-ecommerce-cockpit-charts__chart`;

                    chartsObject.push(
                        c3.generate({
                            bindto: bindTo,
                            data: {
                                x: 'Date', // the same name should be returned as the first column in the response
                                columns: [
                                    Object.values(response.data.dashboardData.columns[0]),
                                    Object.values(response.data.dashboardData.columns[1]),
                                ],
                                type: 'area',
                            },
                            axis: {
                                x: {
                                    type: 'timeseries',
                                    tick: {
                                        count: 30,
                                        format: '%Y-%m-%d',
                                    },
                                },
                            },
                        })
                    );
                }
            })
            .catch(eZ.helpers.notification.showErrorNotification);
    };
    const showCharts = () => {
        if (parseInt(dateStartInput.dataset.omitNextRequest)) {
            dateStartInput.dataset.omitNextRequest = 0;

            return;
        }

        if (!shopSelect.value || !currencySelect.value || !dateStartInput.value || !dateEndInput.value) {
            return;
        }

        charts.forEach((chart) => {
            showChartsGeneric(chart.dataset.name, chart);
        });
    };

    shopSelect.addEventListener('change', showCharts, false);
    currencySelect.addEventListener('change', showCharts, false);
    dateStartInput.addEventListener('change', showCharts, false);
    dateEndInput.addEventListener('change', showCharts, false);
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(event) {
        const { resizeChartsAfterShow } = event.target.dataset;

        if (resizeChartsAfterShow) {
            chartsObject.forEach((chart) => {
                chart.resize();
            });
        }
    });
})(window, window.document, window.eZ, window.jQuery, window.c3);
