app.controller('getFollowingsController', ['$scope', '$http', '$window', '$document', '$timeout', '$location', function($scope, $http, $window, $document, $timeout, $location){
  
  $scope.init = function (current_user_id, profile_user_id) {
    $http({
      method: 'GET',
      url: '/user/'+ current_user_id +'/followings.json',
      params: {user_id: profile_user_id}
      }).then(function successCallback(response) {
        $scope.followings = JSON.parse(response.data.followings);
      }, function errorCallback(response) {
    });
  };

  $scope.unfollow = function(id, current_user_id) {
    $scope.followers_count = $scope.followers_count - 1;
    $http({
      method: 'DELETE',
      url: '/users/'+ id +'/follows/' + current_user_id + '.json'
      }).then(function successCallback(response) {
      }, function errorCallback(response) {
    });
  }

  $scope.follow = function(id, current_user_id) {
    $scope.followers_count = $scope.followers_count + 1;
    $http({
      method: 'POST',
      url: '/users/'+ id +'/follows.json',
      params: {id: current_user_id}
      }).then(function successCallback(response) {
      }, function errorCallback(response) {
    });
  }
}]);