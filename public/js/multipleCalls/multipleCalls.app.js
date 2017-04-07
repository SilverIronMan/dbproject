angular.module('app').controller('multipleCallsController', function ($scope, callDataService, passMultipleCallsData) {
  $scope.calls = passMultipleCallsData.get();

  /*
  callDataService.getData().then(function (data, error) {
    if (error) {
      console.log('There has been an error retreving call data');
      return;
    }
    $scope.callData = data.data.tone;
    $scope.speech = data.data.speech;
    $scope.$apply();
  });*/
});
