angular.module('app').directive('filterCallsInput', function () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      const today = new Date();
      let date = today.getFullYear() + '/';

      if (today.getMonth() + 1 < 10) {
        date += '0';
      }
      date += (today.getMonth() + 1) + '/';

      if (today.getDate() < 10) {
        date += '0';
      }
      date += today.getDate();

      element[0].value = date;
    },
  };
});
