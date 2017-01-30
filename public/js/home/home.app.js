angular.module('app').controller('homeController', ($scope, listCalls) => {
  listCalls.getData().then((data, error) => {
    if (error) {
      console.log('Error in getting call list');
      return;
    }
    $scope.callData = data.data.Contents;
    $scope.$apply();
    console.log(data.data.Contents);
  });
});
