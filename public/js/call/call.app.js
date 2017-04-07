angular.module('app').controller('callController', function ($scope, callDataService, callID) {
  $scope.callID = callID;
  callDataService.getData(callID).then(function (data, error) {
    if (error) {
      console.log('There has been an error retreving call data');
      return;
    }
    $scope.callData = data.data.tone;
    $scope.speech = data.data.speech;
  });
});
