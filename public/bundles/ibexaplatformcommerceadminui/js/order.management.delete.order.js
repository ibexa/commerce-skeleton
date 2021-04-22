(function(global, doc, eZ) {
    const deleteButtons = doc.querySelectorAll('.ez-btn--trash');
    const deleteOrder = (event) => {
        const token = doc.querySelector('meta[name="CSRF-Token"]').content;
        const siteaccess = doc.querySelector('meta[name="SiteAccess"]').content;
        const request = new Request(`/api/ezp/v2/rest/lostorders/remove-lostorder/${event.currentTarget.dataset.id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.ez.api.LostOrdersData+json',
                'Content-Type': 'application/vnd.ez.api.LostOrdersData+json',
                'X-Siteaccess': siteaccess,
                'X-CSRF-Token': token,
            },
            mode: 'same-origin',
            credentials: 'same-origin',
        });

        fetch(request)
            .then(eZ.helpers.request.getJsonFromResponse)
            .then((response) => {
                const data = response.data.messages;
                const showNotification = data.status
                    ? eZ.helpers.notification.showSuccessNotification
                    : eZ.helpers.notification.showErrorNotification;

                Object.values(data.messages).forEach(showNotification);
            })
            .catch(eZ.helpers.notification.showErrorNotification);
    };

    deleteButtons.forEach((button) => button.addEventListener('click', deleteOrder, false));
})(window, window.document, window.eZ);
