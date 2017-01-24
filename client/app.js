stocks.config(function($routeProvider){
  $routeProvider.when('/', {
    controller:'myStockChart',
    templateUrl: 'client/index.html'
  })
  // .when('/stocksFollow', {
  //   controller:'myStockChart',
  //   templateUrl: 'index.html'
  // })
  // .when('/stockFollow/add',{
  //   controller:'myStockChart',
  //   templateUrl: 'index.html'
  // })
  // .otherwise({
  //   redirectTo: '/'
  // });
});