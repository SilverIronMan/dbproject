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
          if (element[0].nextElementSibling.checked) {
            scope.callData = [];
            for (let i = 0; i < data.data.Contents.length; ++i) {
              if (data.data.Contents[i].Key.substr(33, 7).match(/~....~[^\*]/)
                || data.data.Contents[i].Key.substr(44, 6).match(/~....~/)) {
                scope.callData.push(data.data.Contents[i]);
              }
            }
          } else {
            scope.callData = data.data.Contents;
          }

          scope.$apply();
          console.log(data.data.Contents);
        });
      });
    },
  };
});
