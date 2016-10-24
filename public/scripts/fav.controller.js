angular.module('favoriteGiphy')
       .controller('FavController', FavController);

function FavController($http) {
  var fav = this;
  fav.favorites = [];

  console.log('FavController Loaded');

  fav.favoritesGet = function () {
    $http.get('/fav')
         .then(printFavorites, errorCallback);
  };

  function printFavorites(response) {
    fav.favorites = response.data;
    console.log(fav.favorites);
    console.log(fav.favorites[0].url);
  };

  fav.makeNewComment = function (comment, id) {
    console.log(comment);
    $http.put('/fav/' + id, { comment: comment })
         .then(function (response) {
            fav.favoritesGet();
          });
  };

  fav.deleteFavorite = function (id) {
    console.log('id', id);

    $http.delete('/fav/' + id)
         .then(function (response) {
            fav.favorites = [];
            fav.favoritesGet();
          });
  };

  fav.favoritesGet();
};

function errorCallback(error) {
  console.log('error making http request', error);
};
