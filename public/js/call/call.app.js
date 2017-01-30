angular.module('app').controller('callController', ($scope, callDataService, callID) => {
  $scope.callID = callID;
  callDataService.getData(callID).then((data, error) => {
    if (error) {
      console.log('There has been an error retreving call data');
      return;
    }
    $scope.callData = data.data;
    $scope.$apply();
    console.log(data);
  });
});
