import RowTemplateGenerator from './helpers/row.template.helper.js';

(function(global, doc, eZ) {
    const token = doc.querySelector('meta[name="CSRF-Token"]').content;
    const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
    const shopSelect = doc.querySelector('select[name="shop_id"]');
    const serchTables = doc.querySelectorAll('.ez-ecommerce-cockpit-search');
    const showSearchTermsGeneric = (type, table) => {
        const rowTemplateGenerator = new RowTemplateGenerator(type, table.dataset.template);
        const request = new Request('/api/ezp/v2/rest/dashboard-searchterms', {
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
                        tab: type,
                        form: '',
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
    const showSearchTerms = () => {
        if (!shopSelect.value) {
            return;
        }

        serchTables.forEach((table) => {
            showSearchTermsGeneric(table.dataset.name, table);
        });
    };

    shopSelect.addEventListener('change', showSearchTerms, false);
})(window, window.document, window.eZ);
