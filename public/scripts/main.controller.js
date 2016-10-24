angular.module('favoriteGiphy')
       .controller('MainController', MainController);

// controller for the index.html page
function MainController($http, favCount) {
  var main = this;
  main.counter = favCount;
  console.log('MainController Loaded');

  main.getCount = function () {
    favCount.getCount()
            .then(successCount, errorCallback);
  };

  function successCount(response) {
    // main.counter = response.count;
  };

  main.getCount()
};

function errorCallback(error) {
  console.log('error making http request', error);
};
