app.controller('AppCtrl', ['$scope', '$http', '$window', '$document', 'FlickityService', '$timeout', '$location', '$mdToast', function($scope, $http, $window, $document, FlickityService, $timeout, $location, $mdToast){
  $scope.init = function(boards,key){
    $scope.cat_boards = boards;
    $scope.category_boards = boards;
    $scope.location = $location.$$protocol + "://" + $location.$$host + "/";
    $scope.facebook_key = key;
  }

  $scope.trackBoardClick = function (board, user) {
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": "any",
        "Appreciation Action": "any",
        "Other Action": "Board Title Clicked"

    });
  };

  $scope.boardAuthorClick = function (board, user) {
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": "any",
        "Appreciation Action": "any",
        "Other Action": "Author Name Clicked"

    });
  };

  $scope.trackLinkClicked = function (board, user, link) {
    link_text = "Board Link " + link +" click"
    mixpanel.track("Board Interaction", {
        "User": user.username,
        "Author Title": board.user.username,
        "Board id": board.secure_id,
        "Category": "any",
        "Link Action": link_text,
        "Appreciation Action": "any",
        "Other Action": "any"

    });
    event_name = "Link " + link + " Clicked"
    mixpanel.track(event_name, {
        "User": user.username,        
        "Board id": board.secure_id,
    });

    $http({
      method: 'POST',
      url: '/users/'+ user.id +'/link_clicked.json',
      data: {form_id: board.id, link: link}
      }).then(function successCallback(response) {
      }, function errorCallback(response) {
    });

  }

  trackLikedUnlikedClicked = function (board, action, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": action,
      "Other Action": "any"
    });
  };

  trackSaveUnsaveClicked = function (board, action, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": action,
      "Other Action": "any"
    });
  };

  $scope.trackFacebookShareClicked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Facebook",
      "Other Action": "any"
    });
  };

  $scope.trackTwitterShareClicked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Twitter",
      "Other Action": "any"
    });
  };

  trackCopyLinkCliked = function (board, user) {
    mixpanel.track("Board Interaction", {
      "User": user.username,
      "Author Title": board.user.username,
      "Board id": board.secure_id,
      "Category": "any",
      "Link Action": "any",
      "Appreciation Action": "Share - Copy Link",
      "Other Action": "any"
    });
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.redirectTo = function(link){
    $window.open(link, '_blank');
  };

  showSimpleToast = function() {
    $mdToast.show($mdToast.simple().textContent('Link Copied!').theme("success-toast").position('top right'));
  };

  $scope.copyToClipboard = function (link, board, user) {
    var copyElement = document.createElement("textarea");
    copyElement.style.position = 'fixed';
    copyElement.style.opacity = '0';
    copyElement.textContent = link;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(copyElement);
    copyElement.select();
    document.execCommand('copy');
    body.removeChild(copyElement);
    showSimpleToast();
    trackCopyLinkCliked(board, user);  
  }

  $scope.update_bookmark = function(board, user){
    $scope.board = board;
    $scope.board.bookmark = !board.bookmark;
    if ($scope.board.bookmark == true) {
      trackSaveUnsaveClicked(board, 'save', user);
    } else {
      trackSaveUnsaveClicked(board, 'unsave', user);
    };
  };

  $scope.update_like = function(board, action, user){    
    $scope.board = board;
    $scope.board.liked = !board.liked;
    if (action == 'like') {
      $scope.board.likes++
      trackLikedUnlikedClicked(board, action, user);
    } else {
      $scope.board.likes--
      trackLikedUnlikedClicked(board, action, user);
    }
  };

  $scope.imagePath = 'img/washedout.png';
  
  $scope.flickityOptions = {
    cellSelector: '.article-cell',
    prevNextButtons: true,    
    imagesLoaded: true,
    groupCells: 2
  };
  
  $scope.alert = '';
}]);