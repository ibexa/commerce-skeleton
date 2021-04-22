(function(global, doc, ibexa) {
    const accordion = new ibexa.eshop.widgets.Accordion();
    const addLine = () => {
        const linesContainer = doc.querySelector('.ezcommerce-basket__lines');
        const lines = linesContainer.querySelectorAll('.ezcommerce-basket__line');
        const { emptyRowTemplate } = linesContainer.dataset;
        const emptyRowTemplateRendered = emptyRowTemplate.replaceAll('{{ name }}', lines.length);

        linesContainer.insertAdjacentHTML('beforeend', emptyRowTemplateRendered);
    };
    const addLines = () => {
        const numberOfLines = parseInt(doc.querySelector('.ezcommerce-quickorder__rows-number-select').value, 10);

        for (let i = 0; i < numberOfLines; i++) {
            addLine();
        }
    };
    const removeLastLine = () => {
        const lastLine = doc.querySelector('.ezcommerce-basket__lines .ezcommerce-basket__line:last-child');

        if (lastLine) {
            lastLine.remove();
        }
    };
    const attachEventListeners = () => {
        doc.querySelector('.ezcommerce-basket__button--add-line').addEventListener('click', addLine, false);
        doc.querySelector('.ezcommerce-basket__button--remove-line').addEventListener('click', removeLastLine, false);
        doc.querySelector('.ezcommerce-basket__button--add-lines').addEventListener('click', addLines, false);
        doc.querySelector('.ezcommerce-quickorder__csv-file-upload-input').addEventListener('change', addLinesFromCSVFile, false);
        doc.querySelectorAll('.ezcommerce-basket__button--quantity').forEach((button) => {
            button.addEventListener('click', changeQuantity, false);
        });
    };
    const addLinesFromCSVFile = (event) => {
        const fileInput = event.currentTarget;
        const formData = new FormData();

        formData.append('files[]', fileInput.files[0]);

        const request = new Request('/quickorder/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
            mode: 'same-origin',
            credentials: 'same-origin',
        });

        fetch(request).then((response) => response.json()).then((data) => {
            doc.querySelector('.ezcommerce-quickorder').innerHTML = data.content;
            attachEventListeners();

            doc.body.dispatchEvent(
                new CustomEvent('ibexa-reinit-accordion', {
                    detail: {
                        selectors: ['.ezcommerce-quickorder .ezcommerce-accordion__navigation-label'],
                    },
                })
            );
        });
    };
    const changeQuantity = (event) => {
        const button = event.target;
        const { actionType } = button.dataset;
        const packingUnit = Number(button.dataset.packingunit);
        const quantityInput = button
            .closest('.ezcommerce-basket__line-content-item--quantity')
            .querySelector('.ezcommerce-quickorder__form-quantity-input');
        let quantityValue = Number(quantityInput.value);

        if (actionType === 'increment') {
            quantityValue = Math.floor(quantityValue / packingUnit) * packingUnit;
            quantityValue = quantityValue + packingUnit;
        } else {
            let ceil = Math.ceil(quantityValue / packingUnit);

            quantityValue = ceil * packingUnit;
            quantityValue = Math.max(0, quantityValue - packingUnit);
        }

        quantityInput.setAttribute('value', quantityValue);
    };

    attachEventListeners();
    accordion.init('.ezcommerce-accordion--quickorder');
})(window, window.document, window.ibexa);
