angular.module('app').factory('passMultipleCallsData', function () {
  let calls = {};
  function set(data) {
    calls = data;
  }

  function get() {
    return calls;
  }

  return {
    set,
    get,
  };
});
