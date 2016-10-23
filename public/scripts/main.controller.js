angular.module('favoriteGiphy')
       .controller('MainController', MainController);

function MainController($http) {
  var main = this;
  main.counter;
  console.log('MainController Loaded');

  $http.get('/count').then(successCallback, errorCallback);

  function successCallback(response) {
    var amount = response.data[0];
    main.counter = amount.count;
  };

};

function errorCallback(error) {
  console.log('error making http request', error);
};
