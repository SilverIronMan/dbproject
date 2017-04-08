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

    // There is probably a MUCH better way to do this
    $scope.callData = tones[0];
    for (let i = 1; i < tones.length; i++) {
      $scope.callData.tone_categories[0].tones[0].score += tones[i].tone_categories[0].tones[0].score;
      $scope.callData.tone_categories[0].tones[1].score += tones[i].tone_categories[0].tones[1].score;
      $scope.callData.tone_categories[0].tones[2].score += tones[i].tone_categories[0].tones[2].score;
      $scope.callData.tone_categories[0].tones[3].score += tones[i].tone_categories[0].tones[3].score;
      $scope.callData.tone_categories[0].tones[4].score += tones[i].tone_categories[0].tones[4].score;
      $scope.callData.tone_categories[1].tones[0].score += tones[i].tone_categories[1].tones[0].score;
      $scope.callData.tone_categories[1].tones[1].score += tones[i].tone_categories[1].tones[1].score;
      $scope.callData.tone_categories[1].tones[2].score += tones[i].tone_categories[1].tones[2].score;
      $scope.callData.tone_categories[2].tones[0].score += tones[i].tone_categories[2].tones[0].score;
      $scope.callData.tone_categories[2].tones[1].score += tones[i].tone_categories[2].tones[1].score;
      $scope.callData.tone_categories[2].tones[2].score += tones[i].tone_categories[2].tones[2].score;
      $scope.callData.tone_categories[2].tones[3].score += tones[i].tone_categories[2].tones[3].score;
      $scope.callData.tone_categories[2].tones[4].score += tones[i].tone_categories[2].tones[4].score;
    }

    console.log('length =', tones.length);
    $scope.callData.tone_categories[0].tones[0].score /= tones.length;
    $scope.callData.tone_categories[0].tones[1].score /= tones.length;
    $scope.callData.tone_categories[0].tones[2].score /= tones.length;
    $scope.callData.tone_categories[0].tones[3].score /= tones.length;
    $scope.callData.tone_categories[0].tones[4].score /= tones.length;
    $scope.callData.tone_categories[1].tones[0].score /= tones.length;
    $scope.callData.tone_categories[1].tones[1].score /= tones.length;
    $scope.callData.tone_categories[1].tones[2].score /= tones.length;
    $scope.callData.tone_categories[2].tones[0].score /= tones.length;
    $scope.callData.tone_categories[2].tones[1].score /= tones.length;
    $scope.callData.tone_categories[2].tones[2].score /= tones.length;
    $scope.callData.tone_categories[2].tones[3].score /= tones.length;
    $scope.callData.tone_categories[2].tones[4].score /= tones.length;

    $scope.callData.document_tone = $scope.callData;
  });
});
