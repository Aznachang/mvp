var stock = document.getElementById('stock');

$.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=' + stock + '-c.json&callback=?', function (data) {
    // Create the chart
    Highcharts.stockChart('container', {
        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'Stock Price'
        },

        series: [{
            name: stock,
            data: data,
            tooltip: {
                valueDecimals: 2
            }
        }]
    });
});
