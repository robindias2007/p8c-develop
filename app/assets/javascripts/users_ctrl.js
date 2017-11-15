app.controller('UsersCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', '$mdDialog', function($scope, $http, $window, $document, FlickityService, $timeout, $location, $mdDialog){
  $scope.init = function(user_profile, current_user, is_following, following_count, followers_count){
    $scope.is_following = is_following;
    $scope.following_count = following_count;
    $scope.followers_count = followers_count;
    $scope.location = $location.$$absUrl;
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

  $scope.unfollow = function(id, current_user_id) {
    $scope.followers_count = $scope.followers_count - 1;
    $http({
      method: 'DELETE',
      url: '/users/'+ id +'/follows/' + current_user_id + '.json'
      }).then(function successCallback(response) {
      }, function errorCallback(response) {
    });
  }

  $scope.get_followers = function (current_user_id, profile_user_id) {
    $http({
      method: 'GET',
      url: '/user/'+ current_user_id +'/followers.json',
      params: {user_id: profile_user_id}
      }).then(function successCallback(response) {
        $scope.followers = JSON.parse(response.data.followers);
      }, function errorCallback(response) {
    });
  };

  $scope.get_followings = function (current_user_id, profile_user_id) {
    $http({
      method: 'GET',
      url: '/user/'+ current_user_id +'/followings.json',
      params: {user_id: profile_user_id}
      }).then(function successCallback(response) {
        $scope.followings = JSON.parse(response.data.followings);
      }, function errorCallback(response) {
    });
  };


  $scope.showDialog1 = function() {
    $mdDialog.show({
      clickOutsideToClose: true,
      scope: $scope,        
      preserveScope: true,
      contentElement: '#myModal1',
      parent: angular.element(document.body)
    });
  };

  $scope.showDialog2 = function() {
    $mdDialog.show({
      clickOutsideToClose: true,
      scope: $scope,        
      preserveScope: true,
      contentElement: '#myModal2',
      parent: angular.element(document.body)
    });
  };

  $scope.showDialog3 = function() {
    $mdDialog.show({
      clickOutsideToClose: true,
      scope: $scope,        
      preserveScope: true,
      contentElement: '#myModal3',
      parent: angular.element(document.body)
    });
  };

  $scope.showDialog4 = function() {
    $mdDialog.show({
      clickOutsideToClose: true,
      scope: $scope,        
      preserveScope: true,
      contentElement: '#myModal4',
      parent: angular.element(document.body)
    });
  };
}]);