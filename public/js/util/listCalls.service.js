angular.module('app').service('listCalls', function ($http) {
  this.getData = function (filter) {
    return new Promise(function (fulfill, reject) {
      $http({
        method: 'POST',
        url: '/api/listCalls',
        data: 'filter=' + filter,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }).then(function (response, error) {
        if (error) {
          reject(error);
        }
        fulfill(response);
      });
    });
  };
});
