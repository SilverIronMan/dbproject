angular.module('app').controller('multipleCallsController', function ($scope, callDataService, passMultipleCallsData) {
  $scope.calls = passMultipleCallsData.get();

  callDataService.getMultipleCallsData($scope.calls).then(function (data, error) {
    if (error) {
      console.log('There has been an error retreving call data');
      return;
    }
    console.log(data);
    /* $scope.callData = data.data.tone;
    $scope.speech = data.data.speech;*/
  });
});
