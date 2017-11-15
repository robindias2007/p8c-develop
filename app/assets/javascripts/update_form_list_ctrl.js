app.controller('UpdateFormListCtrl', ['$scope', '$http', '$window', '$document', '$timeout', '$location', function($scope, $http, $window, $document, $timeout, $location){
  
  $scope.init = function (list) {
    //$scope.loading_data = true;
    //getTrendingData();
    $scope.loading_data = false;
    $scope.list = list;
  };

  $scope.updateList = function () {
    $scope.loading_data = true;
    $http({
      method: 'POST',
      url: '/update_form_list.json',
      data: {forms: $scope.boards_data}
      }).then(function successCallback(response) {
        $scope.list = response.data;
        $scope.loading_data = false;
      }, function errorCallback(response) {
    });
  };

}]);