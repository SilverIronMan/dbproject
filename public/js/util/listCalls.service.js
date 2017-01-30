angular.module('app').service('listCalls', function ($http) {
  this.getData = function () {
    return new Promise(function (fulfill, reject) {
      $http.get("/api/listCalls").then(function (response) {
        fulfill(response);
      });
    });
  }
});



/*
angular.module('hello').service('PeopleService', function($http) {
  var service = {
    getAllPeople: function() {
      return $http.get('data/people.json', { cache: true }).then(function(resp) {
        return resp.data;
      });
    },

    getPerson: function(id) {
      function personMatchesParam(person) {
        return person.id === id;
      }

      return service.getAllPeople().then(function (people) {
        return people.find(personMatchesParam)
      });
    }
  }

  return service;
})

*/
