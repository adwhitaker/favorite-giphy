angular.module('favoriteGiphy')
       .controller('HomeController', HomeController);

function HomeController(giphy) {
  var home = this;
  console.log('HomeController loaded');
}
