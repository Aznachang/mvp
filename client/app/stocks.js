var stocks = angular.module('stocks', ['ngRoute']);
//SERVER
stocks.controller('myStockChart', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {
  //initialize - define scope variables
  $scope.stockSym = 'yhoo';
  $scope.stocks = [];
 // $scope.stocks = [];

  console.log('stocksController fired...');

  //Show All Stocks
  $scope.showFavStocks = function() {
    console.log('Show Followed Btn - Favorite Stocks');

    $http({
      method: 'GET',
      url: '/api/stocksfollows'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response.data); //sends back data from '/api/stocksfollows'
        var stocksFollow = response.data;

        var seriesOptions = [],
            seriesCounter = 0,
            names = [];
        for (var i = 0; i < stocksFollow.length; i++) {
          names.push(stocksFollow[i].symbol);
        }
        console.log(names);
    /**
     * Create the chart when all data is loaded
     * @returns {undefined}
     */
      var createChart = function () {
        Highcharts.stockChart('container', {

          rangeSelector: {
              selected: 4
          },

          yAxis: {
              labels: {
                  formatter: function () {
                      return (this.value > 0 ? ' + ' : '') + this.value + '%';
                  }
              },
              plotLines: [{
                  value: 0,
                  width: 2,
                  color: 'silver'
              }]
          },

          plotOptions: {
              series: {
                  compare: 'percent',
                  showInNavigator: true
              }
          },

          tooltip: {
              pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
              valueDecimals: 2,
              split: true
          },

          series: seriesOptions
        });
      }

      $.each(names, function (i, name) {
        $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?',    function (data) {

            seriesOptions[i] = {
                name: name,
                data: data
            };

            // As we're loading the data asynchronously, we don't know what order it will arrive. So
            // we keep a counter and create the chart when all the data is loaded.
            seriesCounter += 1;

            if (seriesCounter === names.length) {
                createChart();
            }
        });
      });

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('could not receive followed stocks!');
      });
  };

  //Store Follow Stock to Database
  $scope.storeFavStock = function() {
    console.log('Follow Btn - Follow Stock');

    var data = $.param({
      symbol: $scope.stockSym
    });

    var config = {
      headers : {
        'Content-Type': 'application/json'
      }
    }

    $http.post('/api/stocksfollows', data, config)
      .success(function (data, status, headers, config) {
        // $scope.PostDataResponse = data;
      })
      .error(function (data, status, header, config) {
        console.log('Could Not Follow: ' + $scope.stockSym + '!');
      });
    // $http({
    //   method: 'POST',
    //   url: '/api/stocksfollows',
    // }).then(function successCallback(response) {
    //     // this callback will be called asynchronously
    //     // when the response is available

    //     //window.location.href='#/stocks';
    //   }, function errorCallback(response) {
    //     // called asynchronously if an error occurs
    //     // or server returns response with an error status.
    //      console.log('could not store stock!');
    //   });
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
                   text: stockName + ' (' + $scope.stockSym.toUpperCase() + ')' + ': ' + stockClose + ' ' + changeValue
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