export default class RowTemplateGenerator {
    constructor(type, template) {
        this.type = type;
        this.template = template;
        this.methods = {
            Mostsearch: 'mostSearch',
            lastsearch: 'lastSearch',
            Nohitssearch: 'noHitsSearch',
            dashboard: 'dashboard',
            lastorders: 'lastOrders',
            bestclients: 'bestClients',
        };
    }

    mostSearch(row) {
        let rowTemplate = this.template;

        rowTemplate = rowTemplate.replace('{{ LOG_MESSAGE }}', window.eZ.helpers.text.escapeHTML(row.logMessage || row[0]));
        rowTemplate = rowTemplate.replace('{{ AMOUNT }}', row.amount || row[1]);
        rowTemplate = rowTemplate.replace('{{ HITS }}', row.hits || row[2]);

        return rowTemplate;
    }

    lastSearch(row) {
        let rowTemplate = this.template;

        rowTemplate = rowTemplate.replace('{{ TIMESTAMP }}', (row.logTimestamp || row[0]).string);
        rowTemplate = rowTemplate.replace('{{ LOG_MESSAGE }}', window.eZ.helpers.text.escapeHTML(row.logMessage || row[1]));
        rowTemplate = rowTemplate.replace('{{ RESULTS }}', row.results !== undefined ? row.results : row[2]);

        return rowTemplate;
    }

    noHitsSearch(row) {
        let rowTemplate = this.template;

        rowTemplate = rowTemplate.replace('{{ LOG_MESSAGE }}', window.eZ.helpers.text.escapeHTML(row.logMessage || row[0]));
        rowTemplate = rowTemplate.replace('{{ AMOUNT }}', row.amount || row[1]);
        rowTemplate = rowTemplate.replace('{{ HITS }}', row.hits || row[2]);

        return rowTemplate;
    }

    dashboard(row) {
        let rowTemplate = this.template;

        rowTemplate = rowTemplate.replace('{{ SKU }}', window.eZ.helpers.text.escapeHTML(row.sku || row[0]));
        rowTemplate = rowTemplate.replace('{{ COUNT_SKU }}', row.countSku || row[1]);
        rowTemplate = rowTemplate.replace('{{ NAME }}', window.eZ.helpers.text.escapeHTML(row.name || row[2]));

        return rowTemplate;
    }

    lastOrders(row) {
        let rowTemplate = this.template;

        rowTemplate = rowTemplate.replace('{{ DATE }}', row.date || row[0]);
        rowTemplate = rowTemplate.replace('{{ BUYER }}', window.eZ.helpers.text.escapeHTML(row.buyer || row[1] || ''));
        rowTemplate = rowTemplate.replace('{{ TOTAL }}', row.total || row[2]);
        rowTemplate = rowTemplate.replace('{{ CURRENCY }}', row.currency || row[3]);

        return rowTemplate;
    }

    bestClients(row) {
        let rowTemplate = this.template;

        rowTemplate = rowTemplate.replace('{{ NAME }}', window.eZ.helpers.text.escapeHTML(row.name || row[0] || ''));
        rowTemplate = rowTemplate.replace('{{ AMOUNT }}', row.amount || row[1]);
        rowTemplate = rowTemplate.replace('{{ CURRENCY }}', row.currency || row[2]);

        return rowTemplate;
    }

    getTemplate(row) {
        const methodName = this.methods[this.type];

        return this[methodName](row);
    }
}
