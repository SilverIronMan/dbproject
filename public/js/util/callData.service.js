angular.module('app').service('callDataService', function ($http) {
  this.getCallList = function (filter) {
    return $http({
      method: 'POST',
      url: '/api/listCalls',
      data: 'filter=' + filter,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  };

  this.getData = function (key) {
    return $http({
      method: 'POST',
      url: '/api/callData',
      data: 'key=' + key,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  };

  this.getMultipleCallsData = function (keys) {
    return $http({
      method: 'POST',
      url: '/api/callData',
      data: 'keys=' + keys,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  };
});
