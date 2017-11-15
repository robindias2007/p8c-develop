app.controller('EditUserCtrl', ['$scope', '$http', '$window', '$document', '$timeout', '$location', function($scope, $http, $window, $document, $timeout, $location){
  
  getCategoriesAndUserCategories = function (user) {
    $http({
      method: 'GET',
      url: 'categories.json',
      params: {user_id: user.id}
      }).then(function successCallback(response) {
        $scope.categories = JSON.parse(response.data.categories);
        $scope.user_categories = JSON.parse(response.data.user_categories);        
      }, function errorCallback(response) {
    });
  }

  $scope.init = function (user) {
    $scope.user_profile = user;
    getCategoriesAndUserCategories(user);
  }

  $scope.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
  };

  $scope.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };

  $scope.checkBoxValidation = function () {
    if ($scope.user_categories.length >= 3) {
      return false;
    };    

    return true;
  };

  $scope.UpdateCategory = function () {    
    $http({
      method: 'POST',
      url: 'update_categories.json',
      data: {categories: $scope.user_categories, user_id: $scope.user_profile.id}
    }).then(function successCallback(response) {      
      },function errorCallback(response) {
    });
  }
}]);