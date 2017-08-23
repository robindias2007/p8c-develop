var app = angular.module('app', ['bc.Flickity', 'infinite-scroll']);

app.controller('AppCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', function($scope, $http, $window, $document, FlickityService, $timeout){
  $scope.init = function(boards){
    $scope.cat_boards = boards;
    $scope.category_boards = boards;
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

app.controller('HomeAppCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', function($scope, $http, $window, $document, FlickityService, $timeout){
  $scope.init = function(boards){
    $scope.boards = boards;
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


app.controller('PubBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', function($scope, $http, $window, $document, FlickityService, $timeout){
  $scope.init = function(boards){
    $scope.pub_boards = boards;
    $scope.current_page = 1;
    $scope.next_page = 2;
    $scope.stop_loading = false;
    $scope.busy = false;
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

app.controller('SavedBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', function($scope, $http, $window, $document, FlickityService, $timeout){
  $scope.init = function(boards){
    $scope.saved_boards = boards;
    $scope.current_page = 1;
    $scope.next_page = 2;
    $scope.stop_loading = false;
    $scope.busy = false;
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

app.controller('DraftBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', function($scope, $http, $window, $document, FlickityService, $timeout){
  $scope.init = function(boards){
    $scope.draft_boards = boards;
    $scope.current_page = 1;
    $scope.next_page = 2;
    $scope.stop_loading = false;
    $scope.busy = false;
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

app.controller('LikedBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', function($scope, $http, $window, $document, FlickityService, $timeout){
  $scope.init = function(boards){
    $scope.liked_boards = boards;
    $scope.current_page = 1;
    $scope.next_page = 2;
    $scope.stop_loading = false;
    $scope.busy = false;
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