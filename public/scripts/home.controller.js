angular.module('favoriteGiphy')
.controller('HomeController', HomeController);

function HomeController(giphy) {
  var home = this;
  console.log('HomeController loaded');

  home.pic = '';
  home.gifs = [];

  home.searchItem = function (query) {
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
          });
  };

};
