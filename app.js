var myCarApp = angular.module('myCarApp', ['ngRoute', 'ngAnimate']);

//code runs before app starts
myCarApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/views/home.html',
      controller: 'CarController'
    })
    .when('/directory', {
      templateUrl: '/views/directory.html',
      controller: 'CarController'
    }).otherwise({
      redirectTo: '/'
    });
}]);

myCarApp.directive('featuredCar', [function(){
  return{
    restrict: 'E',
    scope: {
      cars: '=',
      title: '=',
    },
    templateUrl: 'views/random.html',
    transclude: true,
    replace: true,
    controller: function($scope){
      $scope.random = Math.floor(Math.random() * 4);
    }
  };
}]);

myCarApp.controller('CarController', ['$scope', '$http', function($scope, $http){

  $scope.removeCar = function(car){
    var removedCar = $scope.cars.indexOf(car);
    $scope.cars.splice(removedCar, 1);
  };

  $scope.addCar = function(){
    $scope.cars.push({
      name: $scope.newCar.name,
      rate: parseInt($scope.newCar.rate),
      description: $scope.newCar.description,
      avaliable: true
    });
    $scope.newCar.name = "";
    $scope.newCar.rate = "";
    $scope.newCar.description = "";
  };

//Bring json file
  $http.get('data/cars.json').then(function(response){
    $scope.cars = response.data;
  });

}]);
