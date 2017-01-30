angular.module('app').controller('homeController', function ($scope, listCalls) {
  listCalls.getData().then(function(data, error) {
    if (error) {
      console.log('Error in getting call list');
      return;
    }
    $scope.callData = data.data.Contents;
    $scope.$apply();
    console.log(data.data.Contents);
  });
});
