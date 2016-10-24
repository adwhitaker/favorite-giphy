angular.module('favoriteGiphy')
.controller('HomeController', HomeController);

function HomeController(giphy, $http) {
  var home = this;
  console.log('HomeController loaded');

  home.pic = '';
  home.gifs = [];
  home.class = 'hidden';

  home.searchItem = function (query) {
    home.class = 'hidden';
    giphy.searchItem(encodeURI(query))
         .then(function (gifs) {
            home.gifs = gifs;
          });
  };

  home.randomSearch = function () {
    home.gifs = [];
    giphy.randomSearch()
         .then(function (gif) {
            home.pic = gif.image_url;
            home.class = '';
          });
  };

  home.postFavGif = function (url, comment) {
    console.log(url, comment);
    var sentObject = { url: url, comment: comment };

    $http({
      method: 'Post',
      data: sentObject,
      url: '/home',
    }).then(function (response) {
        console.log(response);
      }, errorCallback);

  };
};

function errorCallback(error) {
  console.log('error making http request', error);
};
