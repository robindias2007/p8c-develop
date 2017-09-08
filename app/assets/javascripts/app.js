var app = angular.module('app', ['bc.Flickity', 'infinite-scroll']);

app.controller('AppCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){
  $scope.init = function(boards,key){
    $scope.cat_boards = boards;
    $scope.category_boards = boards;
    $scope.location = $location.$$protocol + "://" + $location.$$host + "/";
    $scope.facebook_key = key;
  }

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  $scope.update_bookmark = function(board){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
  };

  $scope.update_like = function(board, action){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++ 
    } else {
      $scope.board.likes--
    }
  };

  $scope.imagePath = 'img/washedout.png';
  
  $scope.flickityOptions = {
    cellSelector: '.article-cell',
    prevNextButtons: true,
    pageDots: false,
    imagesLoaded: true,
    groupCells: 2
  };
  
  $scope.alert = '';
}]);

app.controller('HomeAppCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){
  $scope.init = function(boards){
    $scope.boards = boards;
    $scope.location = $location.$$absUrl;
  }

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  $scope.update_bookmark = function(board){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
  };

  $scope.update_like = function(board, action){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++ 
    } else {
      $scope.board.likes--
    }
  };

  $scope.imagePath = 'img/washedout.png';
  
  $scope.flickityOptions = {
    cellSelector: '.article-cell',
    prevNextButtons: true,
    pageDots: false,
    imagesLoaded: true,
    groupCells: 2
  };
  
  $scope.alert = '';
}]);


app.controller('PubBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){
  $scope.init = function(boards, key){
    $scope.pub_boards = boards;
    $scope.current_page = 1;
    $scope.next_page = 2;
    $scope.stop_loading = false;
    $scope.busy = false;
    $scope.location = $location.$$protocol + "://" + $location.$$host + "/";
    $scope.facebook_key = key;
  }

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  $scope.update_bookmark = function(board){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
  };

  $scope.update_like = function(board, action){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++ 
    } else {
      $scope.board.likes--
    }
  };

  $scope.nextPage = function () {
    if ($scope.busy) return;
    $scope.busy = true;
    if ($scope.stop_loading == false) {
      $http({
      method: 'GET',
      url: 'publish.json?page='+ $scope.next_page
      }).then(function successCallback(response) {
        boards = JSON.parse(response.data.boards);
        for(var i = 0; i <= (boards.length - 1) ; i++) {
          if ( !( boards[i] in $scope.pub_boards ) ) {
            $scope.pub_boards.push(boards[i-0]);
          }          
        }
        next_page = response.data.next_page;
        if (next_page == null) {
          $scope.stop_loading = true;
        } else {
          $scope.next_page = $scope.next_page + 1;
          $scope.busy = false;
        };

      }, function errorCallback(response) {
      });
    };    
  };

  $scope.flickityOptions = {
    cellSelector: '.article-cell',
    prevNextButtons: true,
    pageDots: false,
    imagesLoaded: true,
    groupCells: 2
  };

  $scope.imagePath = 'img/washedout.png';
  
  $scope.alert = '';
}]);

app.controller('SavedBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){
  $scope.init = function(boards){
    $scope.saved_boards = boards;
    $scope.current_page = 1;
    $scope.next_page = 2;
    $scope.stop_loading = false;
    $scope.busy = false;
    $scope.location = $location.$$absUrl;
  }

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  $scope.update_bookmark = function(board){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
  };

  $scope.update_like = function(board, action){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++ 
    } else {
      $scope.board.likes--
    }
  };

  $scope.nextPage = function () {
    if ($scope.busy) return;
    $scope.busy = true;
    if ($scope.stop_loading == false) {
      $http({
      method: 'GET',
      url: 'saved.json?page='+ $scope.next_page
      }).then(function successCallback(response) {
        boards = JSON.parse(response.data.boards);
        for(var i = 0; i <= (boards.length - 1) ; i++) {
          if ( !( boards[i] in $scope.saved_boards ) ) {
            $scope.saved_boards.push(boards[i-0]);
          }          
        }
        next_page = response.data.next_page;
        if (next_page == null) {
          $scope.stop_loading = true;
        } else {
          $scope.next_page = $scope.next_page + 1;
          $scope.busy = false;
        };

      }, function errorCallback(response) {
      });
    };    
  };

  $scope.imagePath = 'img/washedout.png';
  
  $scope.flickityOptions = {
    cellSelector: '.article-cell',
    prevNextButtons: true,
    pageDots: false,
    imagesLoaded: true,
    groupCells: 2
  };
  
  $scope.alert = '';
}]);

app.controller('DraftBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){
  $scope.init = function(boards){
    $scope.draft_boards = boards;
    $scope.current_page = 1;
    $scope.next_page = 2;
    $scope.stop_loading = false;
    $scope.busy = false;
    $scope.location = $location.$$absUrl;
  }

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  $scope.update_bookmark = function(board){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
  };

  $scope.update_like = function(board, action){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++ 
    } else {
      $scope.board.likes--
    }
  };

  $scope.nextPage = function () {
    if ($scope.busy) return;
    $scope.busy = true;
    if ($scope.stop_loading == false) {
      $http({
      method: 'GET',
      url: 'drafts.json?page='+ $scope.next_page
      }).then(function successCallback(response) {
        boards = JSON.parse(response.data.boards);
        for(var i = 0; i <= (boards.length - 1) ; i++) {
          if ( !( boards[i] in $scope.draft_boards ) ) {
            $scope.draft_boards.push(boards[i-0]);
          }          
        }
        next_page = response.data.next_page;
        if (next_page == null) {
          $scope.stop_loading = true;
        } else {
          $scope.next_page = $scope.next_page + 1;
          $scope.busy = false;
        };

      }, function errorCallback(response) {
      });
    };    
  };

  $scope.imagePath = 'img/washedout.png';
  
  $scope.flickityOptions = {
    cellSelector: '.article-cell',
    prevNextButtons: true,
    pageDots: false,
    imagesLoaded: true,
    groupCells: 2
  };
  
  $scope.alert = '';
}]);

app.controller('LikedBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){
  $scope.init = function(boards, key){
    $scope.liked_boards = boards;
    $scope.current_page = 1;
    $scope.next_page = 2;
    $scope.stop_loading = false;
    $scope.busy = false;
    $scope.location = $location.$$protocol + "://" + $location.$$host + "/";
    $scope.facebook_key = key;
  }

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  $scope.update_bookmark = function(board){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
  };

  $scope.update_like = function(board, action){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++ 
    } else {
      $scope.board.likes--
    }
  };

  $scope.nextPage = function () {
    if ($scope.busy) return;
    $scope.busy = true;
    if ($scope.stop_loading == false) {
      $http({
      method: 'GET',
      url: 'liked.json?page='+ $scope.next_page
      }).then(function successCallback(response) {
        boards = JSON.parse(response.data.boards);
        for(var i = 0; i <= (boards.length - 1) ; i++) {
          if ( !( boards[i] in $scope.liked_boards ) ) {
            $scope.liked_boards.push(boards[i-0]);
          }          
        }
        next_page = response.data.next_page;
        if (next_page == null) {
          $scope.stop_loading = true;
        } else {
          $scope.next_page = $scope.next_page + 1;
          $scope.busy = false;
        };

      }, function errorCallback(response) {
      });
    };    
  };

  $scope.imagePath = 'img/washedout.png';
  
  $scope.flickityOptions = {
    cellSelector: '.article-cell',
    prevNextButtons: true,
    pageDots: false,
    imagesLoaded: true,
    groupCells: 2
  };
  
  $scope.alert = '';
}]);

app.controller('UsersCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){
  $scope.init = function(user_profile, current_user, is_following, following_count, followers_count){
    $scope.is_following = is_following;
    $scope.following_count = following_count;
    $scope.followers_count = followers_count;
    $scope.location = $location.$$absUrl;
  }

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

app.controller('ShowBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', function($scope, $http, $window, $document, FlickityService, $timeout, $location){
  $scope.init = function(boards, key){
    $scope.pub_boards = boards;
    $scope.current_page = 1;
    $scope.next_page = 2;
    $scope.stop_loading = false;
    $scope.busy = false;
    $scope.location = $location.$$protocol + "://" + $location.$$host + "/";
    $scope.facebook_key = key;
  }

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  $scope.update_bookmark = function(board){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
  };

  $scope.update_like = function(board, action){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++ 
    } else {
      $scope.board.likes--
    }
  };

  $scope.flickityOptions = {
    cellSelector: '.article-cell',
    prevNextButtons: true,
    pageDots: false,
    imagesLoaded: true,
    groupCells: 2
  };

  $scope.imagePath = 'img/washedout.png';
  
  $scope.alert = '';
}]);