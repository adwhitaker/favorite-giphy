angular.module('favoriteGiphy')
       .controller('FavController', FavController);

function FavController() {
  var fav = this;
  console.log('FavController Loaded');
}
