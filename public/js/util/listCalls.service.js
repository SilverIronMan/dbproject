angular.module('app').service('listCalls', function ($http) {
  this.getData = function () {
    return new Promise((fulfill, reject) => {
      $http.get('/api/listCalls').then((response, error) => {
        if (error) {
          reject(error);
        }
        fulfill(response);
      });
    });
  };
});
