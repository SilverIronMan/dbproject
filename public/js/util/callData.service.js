angular.module('app').service('callDataService', function ($http) {
  this.getData = function (key) {
    return new Promise((fulfill, reject) => {
      $http({
        method: 'POST',
        url: '/api/callData',
        data: 'key=' + key,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }).then((response, err) => {
        if (err) {
          reject(err);
        }
        fulfill(response);
      });
    });
  };
});
