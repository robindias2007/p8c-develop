var app = angular.module('app', ['bc.Flickity']);

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
    initialIndex: 0,
    prevNextButtons: true,
    freeScroll: true,
    contain: true,
    setGallerySize: true,
    pageDots: false,
    imagesLoaded: true
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
    initialIndex: 0,
    prevNextButtons: true,
    freeScroll: true,
    contain: true,
    setGallerySize: true,
    pageDots: false,
    imagesLoaded: true
  };
  
  $scope.alert = '';
}]);


app.controller('PubBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', function($scope, $http, $window, $document, FlickityService, $timeout){
  $scope.init = function(boards){
    $scope.pub_boards = boards;
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
  
  $scope.alert = '';
}]);

app.controller('SavedBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', function($scope, $http, $window, $document, FlickityService, $timeout){
  $scope.init = function(boards){
    $scope.saved_boards = boards;
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
    initialIndex: 0,
    prevNextButtons: true,
    freeScroll: true,
    contain: true,
    setGallerySize: true,
    pageDots: false,
    imagesLoaded: true
  };
  
  $scope.alert = '';
}]);

app.controller('DraftBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', function($scope, $http, $window, $document, FlickityService, $timeout){
  $scope.init = function(boards){
    $scope.draft_boards = boards;
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
    initialIndex: 0,
    prevNextButtons: true,
    freeScroll: true,
    contain: true,
    setGallerySize: true,
    pageDots: false,
    imagesLoaded: true
  };
  
  $scope.alert = '';
}]);

app.controller('LikedBoardCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', function($scope, $http, $window, $document, FlickityService, $timeout){
  $scope.init = function(boards){
    $scope.liked_boards = boards;
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
    initialIndex: 0,
    prevNextButtons: true,
    freeScroll: true,
    contain: true,
    setGallerySize: true,
    pageDots: false,
    imagesLoaded: true
  };
  
  $scope.alert = '';
}]);