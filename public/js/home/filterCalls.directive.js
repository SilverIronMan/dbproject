angular.module('app').directive('filterCalls', function (listCalls) {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.click(function () {
        const filter = element[0].previousElementSibling.value;
        listCalls.getData(filter).then(function (data, error) {
          if (error) {
            console.log('Error in getting call list');
            return;
          }
          scope.callData = data.data.Contents;
          scope.$apply();
          console.log(data.data.Contents);
        });
      });
    },
  };
});
