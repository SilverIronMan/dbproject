angular.module('app').directive('filterCalls', function (callDataService, passMultipleCallsData) {
  return {
    restrict: 'A',
    link: function (scope, element) {
      const getCallsSubmit = function () {
        const filter = element[0].querySelector('#filterCallsBy').value;
        callDataService.getCallList(filter).then(function (data, error) {
          if (error) {
            console.log('Error in getting call list');
            return;
          }
          const incoming = element[0].querySelector('#filterCallsSelectorIncoming').checked;
          const outgoing = element[0].querySelector('#filterCallsSelectorOutgoing').checked;
          if (!(incoming || outgoing)) {
            scope.callData = data.data.Contents;
          } else {
            scope.callData = [];
            if (outgoing) {
              for (let i = 0; i < data.data.Contents.length; ++i) {
                // This is specific to Affiliated Creditors System
                if (data.data.Contents[i].Key.substr(33, 7).match(/~....~[^\*]/)) {
                  scope.callData.push(data.data.Contents[i]);
                }
              }
            }
            if (incoming) {
              for (let i = 0; i < data.data.Contents.length; ++i) {
                // This is specific to Affiliated Creditors System
                if (data.data.Contents[i].Key.substr(44, 6).match(/~....~/)) {
                  scope.callData.push(data.data.Contents[i]);
                }
              }
            }
          }
        });
        // Add the multiple call submit button
        scope.displayMultipleSubmitButton = true;
      };

      element[0].querySelector('#submitFilter').addEventListener('click', getCallsSubmit);
      element[0].querySelector('#filterCallsBy').addEventListener('keypress', function (event) {
        const key = event.which || event.keyCode;
        if (key === 13) { // 13 is enter
          getCallsSubmit();
        }
      });

      scope.multipleKeys = [];
      scope.checkBoxChange = function (elem) {
        const position = scope.multipleKeys.indexOf(elem.data.Key);
        if (position < 0) {
          scope.multipleKeys.push(elem.data.Key);
        } else {
          scope.multipleKeys.splice(position, 1);
        }
      };

      element[0].querySelector('#multiSubmit').addEventListener('click', function () {
        console.log('submit!', scope.multipleKeys);
        passMultipleCallsData.set(scope.multipleKeys);
      });
    },
  };
});
