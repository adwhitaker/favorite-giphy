angular.module('favoriteGiphy')
       .service('favCount', GetCountAmount);

// function to get the count of favorited gifs from the db
function GetCountAmount($http) {
  var counter = {
    count: 0,
  };

  this.propertyThing = counter;

  this.getCount = function () {
    return $http.get('/count')
                .then(function (response) {
                  var amount = response.data[0];
                  console.log('amount', amount);
                  counter.count = amount.count;
                  return amount;
                });
  };
};
