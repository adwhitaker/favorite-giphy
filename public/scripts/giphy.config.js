angular.module('favoriteGiphy')
       .config(linkPages);

function linkPages($routeProvider, $locationProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeController as home'
  }).when('/favorites', {
    templateUrl: 'views/favorites.html',
    controller: 'FavController as fav'
  });

  $locationProvider.html5Mode(true);
}
