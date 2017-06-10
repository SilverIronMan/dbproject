angular.module('app').controller('multipleCallsController', function ($scope, callDataService, passMultipleCallsData) {
  $scope.calls = passMultipleCallsData.get();

  callDataService.getMultipleCallsData($scope.calls).then(function (data, error) {
    if (error) {
      console.log('There has been an error retreving call data', error);
      return;
    }
    data = data.data;

    const tones = [];
    data.forEach((obj) => {
      tones.push(obj.tone.document_tone);
    });

    $scope.callData = tones[0];

    for (let i = 1; i < tones.length; i++) {
      for(let j = 0; j < tones[i].tone_categories.length; j++) {
        for(let k = 0; k < tones[i].tone_categories[j].length; k++){
          $scope.callData.tone_categories[j].tones[k].score += tones[i].tone_categories[j].tones[k].score;
        }
      }
    }

    for(let j = 0; j < tones[i].tone_categories.length; j++) {
      for(let k = 0; k < tones[i].tone_categories[j].length; k++){
        $scope.callData.tone_categories[j].tones[k].score /= tones.length;
      }
    }

    $scope.callData.document_tone = $scope.callData;
  });
});
