angular.module('favoriteGiphy')
       .controller('FavController', FavController);

function FavController($http) {
  var fav = this;
  fav.favorites = [];

  console.log('FavController Loaded');

  $http.get('/favorites')
       .then(printFavorites, errorCallback);

  function printFavorites(response) {
    fav.favorites = response.data;
    console.log(fav.favorites);
    console.log(fav.favorites[0].url);
  };

};

function errorCallback(error) {
  console.log('error making http request', error);
};
