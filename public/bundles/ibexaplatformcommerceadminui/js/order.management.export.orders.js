(function(global, doc) {
    const exportButton = doc.querySelector('.ez-btn--export-orders');

    exportButton.addEventListener(
        'click',
        () => {
            global.onbeforeunload = function() {
                return null;
            };
        },
        false
    );
})(window, window.document);
