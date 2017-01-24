var stocks = angular.module('stocks', ['ngRoute']);
//SERVER
stocks.controller('myStockChart', ['$scope', function($scope) {
  //initialize - define scope variables
  $scope.stockSym = 'yhoo';
  console.log('stocks Controller fired...');

  $scope.storeFavStock = function() {

  };

  //send input 'stock' field-data to SERVER
  $scope.getStock = function() {
    //$scope.stockSym = stock;
    console.log('getStock was fired....');
    //$scope.stock = stock-sym;

    // /** YAHOO FINANCE API **/
    var base_url = 'http://query.yahooapis.com/v1/public/yql?q=';
    var yql_query = 'select%20*%20from%20yahoo.finance.quotes%20where%20symbol%3D%22';
    var yql_query_str = base_url + yql_query;

    //Full Query JSON String
    var stock_symbol = $scope.stockSym;
    var yql_query_stock = yql_query_str + stock_symbol;
    var query_str_final = yql_query_stock + '%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';

    $.getJSON(query_str_final, function (data) {

        var quoteObject = data.query.results.quote;    //base quoteline - can now call for w/e data
        var stockQuote = quoteObject.symbol;
        var changeValue = quoteObject.Change;
        var stockName = quoteObject.Name;
        var stockClose = quoteObject.PreviousClose;

            /** HighCharts - Spit Out the Chart **/
        $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=' + $scope.stockSym + '-c.json&callback=?', function (data) {
          // Create the chart
          Highcharts.stockChart('container', {
              rangeSelector: {
                  selected: 1
              },

              title: {
                  //text: $scope.stockSym.toUpperCase()
                   text: stockName + ' (' + $scope.stockSym.toUpperCase() + ')' + ': ' + stockClose + changeValue
              },

              series: [{
                  name: $scope.stockSym,
                  data: data,
                  tooltip: {
                      valueDecimals: 2
                  }
              }]
          });
        });
    });

    console.log(query_str_final);
  };
}]);