angular.module('favoriteGiphy')
       .controller('FavController', FavController);

// favorites page controller
function FavController($http, favCount) {
  var fav = this;
  fav.favorites = [];

  // counter = {
  //   count: fav.favorites.length,
  // };

  console.log('FavController Loaded');

  // function to get the current list of favorited gifs from the databse
  fav.favoritesGet = function () {
    $http.get('/fav')
         .then(printFavorites, errorCallback);
  };

  function printFavorites(response) {
    fav.favorites = response.data;
    console.log(fav.favorites);
    console.log(fav.favorites[0].url);
  };

  // function to update comment in the db
  fav.makeNewComment = function (comment, id) {
    console.log(comment);
    $http.put('/fav/' + id, { comment: comment })
         .then(function (response) {
            fav.favoritesGet();
          });
  };

  // function to delete favorited gif in db
  fav.deleteFavorite = function (id) {
    console.log('id', id);

    $http.delete('/fav/' + id)
         .then(function (response) {
            fav.favorites = [];
            fav.favoritesGet();
            favCount.getCount();
          });
  };

  // initial page load get gifs from db
  fav.favoritesGet();
};

function errorCallback(error) {
  console.log('error making http request', error);
};
