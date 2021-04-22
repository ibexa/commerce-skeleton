(function(global, doc, eZ) {
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const shopSelect = doc.querySelector('select[name="shop_id"]');
    const currencySelect = doc.querySelector('select[name="currency"]');
    const chartsObject = [];
    const showHDDUsage = (data) => {
        chartsObject.push(
            c3.generate({
                bindto: '.ez-ecommerce-cockpit-status__chart--hdd',
                data: {
                    columns: [['data', data.gauge.hdd]],
                    type: 'gauge',
                },
                color: {
                    pattern: ['#60B044', '#F6C600', '#F97600', '#FF0000'],
                    threshold: {
                        values: [30, 60, 90, 100],
                    },
                },
                size: {
                    height: 80,
                },
                expand: false,
            })
        );
    };
    const showServerLoad = (data) => {
        chartsObject.push(
            c3.generate({
                bindto: '.ez-ecommerce-cockpit-status__chart--server',
                data: {
                    columns: [['data', data.gauge.load]],
                    type: 'gauge',
                },
                color: {
                    pattern: ['#60B044', '#F6C600', '#F97600', '#FF0000'],
                    threshold: {
                        values: [30, 60, 90, 100],
                    },
                },
                size: {
                    height: 80,
                },
                expand: false,
            })
        );
    };
    const showERPStatus = (data) => {
        const statusName = data.erpStatus ? 'success' : 'error';

        doc
            .querySelector(`.ez-ecommerce-cockpit-status__erp-status--${statusName}`)
            .classList.remove('ez-ecommerce-cockpit-status__erp-status--hidden');
    };
    const showCartsStats = (data) => {
        const cartsWidget = doc.querySelector('.ez-ecommerce-cockpit-status__box--carts');

        cartsWidget.querySelector('.ez-icon').removeAttribute('hidden');
        cartsWidget.querySelector('.ez-ecommerce-cockpit-status__value').innerHTML = data.activeShoppingCarts;
    };
    const showCustomerStats = (data) => {
        const customersWidget = doc.querySelector('.ez-ecommerce-cockpit-status__box--customers');

        customersWidget.querySelector('.ez-icon').removeAttribute('hidden');
        customersWidget.querySelector('.ez-ecommerce-cockpit-status__value').innerHTML = data.totalCustomers;
    };
    const showProductStats = (data) => {
        const productsWidget = doc.querySelector('.ez-ecommerce-cockpit-status__box--products');

        productsWidget.querySelector('.ez-icon').removeAttribute('hidden');
        productsWidget.querySelector('.ez-ecommerce-cockpit-status__value').innerHTML = data.totalProducts;
    };
    const showSalesStats = (data) => {
        const salesWidget = doc.querySelector('.ez-ecommerce-cockpit-status__box--sales');
        const totalSales = Object.values(data.totalSales).find((sales) => sales.currency === currencySelect.value) || { totalSales: 0 };

        salesWidget.querySelector('.ez-icon').removeAttribute('hidden');
        salesWidget.querySelector('.ez-ecommerce-cockpit-status__value').innerHTML = totalSales.totalSales;
    };
    const showOrdersStats = (data) => {
        const ordersWidget = doc.querySelector('.ez-ecommerce-cockpit-status__box--orders');

        ordersWidget.querySelector('.ez-icon').removeAttribute('hidden');
        ordersWidget.querySelector('.ez-ecommerce-cockpit-status__value').innerHTML = data.totalOrders;
    };
    const showOverview = () => {
        if (!shopSelect.value) {
            return;
        }

        const request = new Request('/api/ezp/v2/rest/dashboard-overview', {
            method: 'POST',
            headers: {
                Accept: 'application/vnd.ez.api.dashboardData+json',
                'Content-Type': 'application/vnd.chart.Data+json',
                'X-Siteaccess': siteaccess,
                'X-CSRF-Token': token,
            },
            body: JSON.stringify({
                get_overview_data: [
                    {
                        type: 'dashboard',
                        trends: 0,
                        shopId: shopSelect.value,
                    },
                ],
            }),
            mode: 'same-origin',
            credentials: 'same-origin',
        });

        fetch(request)
            .then(eZ.helpers.request.getJsonFromResponse)
            .then((response) => {
                const { dashboardData } = response.data;

                showHDDUsage(dashboardData);
                showServerLoad(dashboardData);
                showERPStatus(dashboardData);
                showCartsStats(dashboardData);
            })
            .catch(eZ.helpers.notification.showErrorNotification);
    };
    const showStats = () => {
        if (!shopSelect.value || !currencySelect.value) {
            return;
        }

        const request = new Request(`/api/ezp/v2/rest/dashboard-summary/${shopSelect.value}/${currencySelect.value}`, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.ez.api.dashboardData+json',
                'Content-Type': 'application/vnd.ez.api.dashboardData+json',
                'X-Siteaccess': siteaccess,
                'X-CSRF-Token': token,
            },
            mode: 'same-origin',
            credentials: 'same-origin',
        });

        fetch(request)
            .then(eZ.helpers.request.getJsonFromResponse)
            .then((response) => {
                const { dashboardData } = response.data;

                showCustomerStats(dashboardData);
                showProductStats(dashboardData);
                showSalesStats(dashboardData);
                showOrdersStats(dashboardData);
            })
            .catch(eZ.helpers.notification.showErrorNotification);
    };

    shopSelect.addEventListener('change', showOverview, false);
    shopSelect.addEventListener('change', showStats, false);
    currencySelect.addEventListener('change', showStats, false);
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(event) {
        const { resizeChartsAfterShow } = event.target.dataset;

        if (resizeChartsAfterShow) {
            chartsObject.forEach((chart) => {
                chart.resize();
            });
        }
    });
})(window, window.document, window.eZ);
