(function(global, doc, eZ, ibexa) {
    const accordion = new ibexa.eshop.widgets.Accordion();
    const updateQuantity = (event) => {
        const { currentTarget } = event;
        const { relatedInputSelector } = currentTarget.dataset;
        const hiddenInputNode = doc.querySelector(relatedInputSelector);

        hiddenInputNode.value = currentTarget.value;
    };

    doc.querySelectorAll('.ezcommerce-wishlist__line-quantity-input').forEach((input) => {
        input.addEventListener('change', updateQuantity, false);
    });

    accordion.init('.ezcommerce-accordion--wishlist');
})(window, window.document, window.eZ, window.ibexa);
