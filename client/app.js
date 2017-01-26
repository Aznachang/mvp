stocks.config(function($routeProvider, $locationProvider){
  $routeProvider.when('/', {
    controller:'myStockChart',
    templateUrl: 'home.htm'
  }).otherwise({
    redirectTo: '/'
  });
});