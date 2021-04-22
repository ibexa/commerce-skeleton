(function(global, doc, eZ, $) {
    const showLogButtons = doc.querySelectorAll('.ez-btn--show-erp-log');
    const showLog = (logPreviewData) => {
        const modal = doc.querySelector('.ez-modal--show-log');
        const logTextNode = modal.querySelector('.ez-erp-log__preview--log-text');
        const inputXmlNode = modal.querySelector('.ez-erp-log__preview--input-xml');
        const outputHmlNode = modal.querySelector('.ez-erp-log__preview--output-xml');

        logTextNode.innerText = JSON.stringify(logPreviewData, null, 4);
        inputXmlNode.innerText = JSON.stringify(logPreviewData.input_xml, null, 4);
        outputHmlNode.innerText = JSON.stringify(logPreviewData.output_xml, null, 4);

        logTextNode
            .closest('.ez-erp-log__item')
            .classList.toggle('ez-erp-log__item--hidden', logPreviewData.input_xml || logPreviewData.output_xml);
        inputXmlNode.closest('.ez-erp-log__item').classList.toggle('ez-erp-log__item--hidden', !logPreviewData.input_xml);
        outputHmlNode.closest('.ez-erp-log__item').classList.toggle('ez-erp-log__item--hidden', !logPreviewData.output_xml);

        $(modal).modal('show');
    };
    const fetchLogPreview = (event) => {
        const id = event.currentTarget.dataset.eventId;
        const url = Routing.generate('siso_admin_erp_ajax', { id });

        fetch(url, { mode: 'same-origin', credentials: 'same-origin' })
            .then(eZ.helpers.request.getJsonFromResponse)
            .then(showLog)
            .catch(eZ.helpers.notification.showErrorNotification);
    };

    showLogButtons.forEach((showLogButton) => showLogButton.addEventListener('click', fetchLogPreview, false));
})(window, window.document, window.eZ, window.jQuery);
