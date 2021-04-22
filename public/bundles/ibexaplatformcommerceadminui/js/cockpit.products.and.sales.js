import RowTemplateGenerator from './helpers/row.template.helper.js';

(function(global, doc, eZ) {
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const shopSelect = doc.querySelector('select[name="shop_id"]');
    const currencySelect = doc.querySelector('select[name="currency"]');
    const productsAndSalesTables = doc.querySelectorAll('.ez-ecommerce-cockpit-products-and-sales');
    const showProductsAndSalesGeneric = (type, table) => {
        const rowTemplateGenerator = new RowTemplateGenerator(type, table.dataset.template);
        const request = new Request('/api/ezp/v2/rest/dashboard-bestseller', {
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
                        panel: 'tabs',
                        type,
                        trends: 0,
                        shopId: shopSelect.value,
                        currency: currencySelect.value,
                        userId: 'all',
                    },
                ],
            }),
            mode: 'same-origin',
            credentials: 'same-origin',
        });

        rowTemplateGenerator.set;

        fetch(request)
            .then(eZ.helpers.request.getJsonFromResponse)
            .then((response) => {
                if (response.data.dashboardData.content) {
                    const body = table.querySelector('tbody');

                    body.textContent = '';

                    Object.values(response.data.dashboardData.content.dataTable).forEach((row) => {
                        const range = doc.createRange();
                        const rowTemplate = rowTemplateGenerator.getTemplate(row);

                        range.selectNodeContents(document.createElement(`tbody`));

                        const rowWidget = range.createContextualFragment(rowTemplate);

                        body.append(rowWidget);
                    });
                }
            })
            .catch(eZ.helpers.notification.showErrorNotification);
    };
    const showProductsAndSales = () => {
        if (!shopSelect.value || !currencySelect.value) {
            return;
        }

        productsAndSalesTables.forEach((table) => {
            showProductsAndSalesGeneric(table.dataset.name, table);
        });
    };

    shopSelect.addEventListener('change', showProductsAndSales, false);
    currencySelect.addEventListener('change', showProductsAndSales, false);
})(window, window.document, window.eZ);
