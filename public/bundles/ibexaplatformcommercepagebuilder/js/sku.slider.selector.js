(function(global, doc, eZ) {
    const skuSliderSelectors = doc.querySelectorAll('.ez-sku-slider-selector');
    const enterKeyCode = 13;
    const updateInputValue = (itemsContainer) => {
        const items = [...itemsContainer.querySelectorAll('.ez-sku-slider-selector__selected-item')];
        const value = items.map((item) => {
            return {
                sku: item.dataset.sku,
                name: item.querySelector('.ez-sku-slider-selector__selected-item-name').innerHTML,
                note: '',
                image: item.dataset.image,
            };
        });

        itemsContainer.closest('.ez-data-source').querySelector('.ez-data-source__input').value = JSON.stringify(value);
    };
    const attachEventsToSelectedItem = (itemsContainer, item) =>
        item.querySelector('.ez-btn--trash').addEventListener('click', removeItem.bind(this, itemsContainer), false);
    const addDraggableItem = (itemsContainer, draggable, item) => {
        const fragment = doc.createDocumentFragment();
        const template = itemsContainer.dataset.template;
        const container = doc.createElement('div');
        const renderedItem = template
            .replace('{{ name }}', eZ.helpers.text.escapeHTML(item.name))
            .replace('{{ sku }}', eZ.helpers.text.escapeHTML(item.sku))
            .replace('{{ image }}', eZ.helpers.text.escapeHTML(item.image));

        container.insertAdjacentHTML('beforeend', renderedItem);

        const listItem = container.querySelector('.ez-sku-slider-selector__selected-item');

        fragment.append(listItem);

        itemsContainer.append(fragment);

        itemsContainer.classList.remove('ez-sku-slider-selector__selected-items--hidden');

        updateInputValue(itemsContainer);
        draggable.reinit();
        eZ.helpers.tooltips.parse(itemsContainer);
    };
    const removeItem = (itemsContainer, event) => {
        event.preventDefault();

        event.currentTarget.closest('.ez-sku-slider-selector__selected-item').remove();
        updateInputValue(itemsContainer);

        if (!itemsContainer.querySelector('.ez-sku-slider-selector__selected-item')) {
            itemsContainer.classList.add('ez-sku-slider-selector__selected-items--hidden');
        }
    };
    const handleKeyDown = (skuSliderSelector, itemsContainer, draggable, event) => {
        const keyCode = event.charCode || event.keyCode || 0;

        if (keyCode === enterKeyCode) {
            event.preventDefault();

            search(skuSliderSelector, itemsContainer, draggable);
        }
    };
    const search = (skuSliderSelector, itemsContainer, draggable) => {
        const inputValue = skuSliderSelector.querySelector('.ez-sku-slider-selector__search-input').value;
        const request = new Request(Routing.generate('siso_auto_suggest', { search_terms: inputValue }), {
            mode: 'same-origin',
            credentials: 'same-origin',
        });

        fetch(request)
            .then(eZ.helpers.request.getJsonFromResponse)
            .then((response) => {
                addSearchResultsItems(skuSliderSelector, itemsContainer, draggable, response.suggestions);
                skuSliderSelector
                    .querySelector('.ez-sku-slider-selector__search-results')
                    .classList.remove('ez-sku-slider-selector__search-results--hidden');
            })
            .catch(eZ.helpers.notification.showErrorNotification);
    };
    const addSearchResultsItems = (skuSliderSelector, itemsContainer, draggable, items) => {
        const fragment = doc.createDocumentFragment();
        const searchResultsContainer = skuSliderSelector.querySelector('.ez-sku-slider-selector__search-results');
        const template = searchResultsContainer.dataset.template;
        const appendItem = (item, notAddable) => {
            const container = doc.createElement('div');
            const renderedItem = template.replace('{{ name }}', eZ.helpers.text.escapeHTML(item.value));

            container.insertAdjacentHTML('beforeend', renderedItem);

            const addButton = container.querySelector('.ez-btn--add');

            if (notAddable) {
                addButton.remove();
            } else {
                addButton.addEventListener(
                    'click',
                    () => {
                        addDraggableItem(itemsContainer, draggable, { name: item.value, sku: item.data.sku, image: item.data.image });
                    },
                    false
                );
            }

            fragment.append(container.querySelector('.ez-sku-slider-selector__search-item'));
        };

        items.forEach((item) => appendItem(item));

        if (items.length === 0) {
            const value = Translator.trans(
                /*@Desc("Could not find product.")*/ 'sku_slider_selector.cannot_find.error',
                {},
                'block_config_ui'
            );

            appendItem({ value }, true);
        }

        searchResultsContainer.innerHTML = '';
        searchResultsContainer.append(fragment);
    };

    class skuSliderSelectorDraggable extends global.eZ.core.Draggable {
        attachEventHandlersToItem(item) {
            super.attachEventHandlersToItem(item);

            attachEventsToSelectedItem(this.itemsContainer, item);
        }

        onDrop() {
            super.onDrop();

            updateInputValue(this.itemsContainer);
        }
    }

    skuSliderSelectors.forEach((skuSliderSelector) => {
        const itemsContainer = skuSliderSelector.querySelector('.ez-sku-slider-selector__selected-items');
        const searchButton = skuSliderSelector.querySelector('.ez-btn--search');
        const searchInput = skuSliderSelector.querySelector('.ez-sku-slider-selector__search-input');
        const draggable = new skuSliderSelectorDraggable({
            itemsContainer,
            selectorItem: '.ez-sku-slider-selector__selected-item',
            selectorPlaceholder: '.ez-sku-slider-selector__selected-item--placeholder',
        });
        const inputValue = skuSliderSelector.closest('.ez-data-source').querySelector('.ez-data-source__input').value;
        const selectedItems = inputValue ? JSON.parse(inputValue) : [];

        searchButton.addEventListener('click', search.bind(this, skuSliderSelector, itemsContainer, draggable), false);
        searchInput.addEventListener('keydown', handleKeyDown.bind(this, skuSliderSelector, itemsContainer, draggable), false);

        draggable.init();

        selectedItems.forEach(addDraggableItem.bind(this, itemsContainer, draggable));
    });
})(window, window.document, window.eZ);
