angular.module('favoriteGiphy')
       .service('favCount', GetCountAmount);

// function to get the count of favorited gifs from the db
function GetCountAmount($http) {
  this.getCount = function () {
    return $http.get('/count')
                .then(function (response) {
                  return response.data[0];
                });
  };
};
