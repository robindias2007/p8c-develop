app.controller('MixpanelCtrl', ['$scope', '$http', '$window', '$document', '$timeout', '$location', function($scope, $http, $window, $document, $timeout, $location){
  
  getTrendingData = function () {
    $http({
      method: 'GET',
      url: 'get_trending_board_data.json',
      params: {}
      }).then(function successCallback(response) {
        $scope.boards_data = response.data;
        $scope.loading_data = false;
      }, function errorCallback(response) {
    });
  }

  $scope.init = function () {
    $scope.loading_data = true;
    getTrendingData();
  };

  $scope.updateScore = function () {
    $scope.loading_data = true;
    $http({
      method: 'POST',
      url: '/update_form_score.json',
      data: {forms: $scope.boards_data}
      }).then(function successCallback(response) {
        $scope.boards_data = response.data;
        $scope.loading_data = false;
      }, function errorCallback(response) {
    });
  };

}]);