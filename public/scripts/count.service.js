angular.module('favoriteGiphy')
       .service('favCount', GetCountAmount);

function GetCountAmount($http) {
  this.getCount = function () {
    return $http.get('/count')
                .then(function (response) {
                  return response.data[0];
                });
  };
};
