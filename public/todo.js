var demoApp = angular.module('demo', []);
demoApp.controller('MainController', ['$scope', '$http', function($scope, $http) {
  // setup a view model
  var vm = {};

  $http.get('/api/todo').then(function(response) {
    console.log('$http get')
    vm.list = response.data.items;
  })

  vm.newItemDetails = '';

  vm.addItem = function() {
    var item = {
      details: vm.newItemDetails
    };
    $http.post('/api/todo', item).then(function(response) {
      vm.list.push(response.data.item);
    })

    vm.newItemDetails = '';
  };

  vm.removeItem = function(id) {
    $http.delete(`/api/todo/${id}`).then(function(response) {
      vm.list = vm.list.filter(function(item) { return item._id != id; })
      console.log('id?', response)
      // vm.list = vm.list.filter(function(item) { return item._id != response.itemId })
    })
  }

  // expose vm using scope
  console.log('$scope.vm = vm')
  $scope.vm = vm;
}])