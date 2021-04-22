(function(global, doc) {
    const chart = doc.querySelector('#ez-performance-chart');

    if (!chart) {
        return;
    }

    const { dateTime, columns } = chart.dataset;

    c3.generate({
        bindto: '#ez-performance-chart',
        data: {
            columns: columns,
            type: 'area-spline',
            labels: false,
        },
        point: {
            show: false,
        },
        zoom: {
            enabled: true,
        },
        subchart: {
            show: true,
        },
        axis: {
            x: {
                type: 'category',
                categories: dateTime,
                tick: {
                    count: 5,
                },
            },
            y: {
                label: 'ms',
            },
        },
        padding: {
            right: 80,
        },
    });
})(window, window.document);
